"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from "react";

import { getCopy } from "@/content/copy";
import { getPlanCredits, getPlanStorageLimit, type PlanId, defaultPlanId } from "@/content/plans";
import {
  getPackLibrary,
  type PackRecord,
  type PackSection,
  type PackStatus,
  type PackVisibility
} from "@/content/packs";
import type { Locale } from "@/lib/i18n";

type CreatedPack = {
  id: string;
  productName: string;
  description: string;
  benefits: string;
  languageId: string;
  platformId: string;
  authorName: string;
  createdAt: number;
  artTone: PackRecord["artTone"];
  status: PackStatus;
  visibility: PackVisibility;
};

type CreatePackInput = {
  productName: string;
  description: string;
  benefits: string;
  languageId: string;
  platformId: string;
  authorName: string;
  visibility: PackVisibility;
};

type CreatePackResult =
  | { ok: true; id: string }
  | { ok: false; reason: "storage_full" | "missing_name" };

type StudioStateContextValue = {
  planId: PlanId;
  setPlan: (planId: PlanId) => void;
  hiddenBasePackIds: string[];
  createdPacks: CreatedPack[];
  createPack: (input: CreatePackInput) => CreatePackResult;
  deletePack: (id: string) => void;
};

type LocalizedStudioState = {
  planId: PlanId;
  setPlan: (planId: PlanId) => void;
  creditBalance: number;
  storageLimit: number;
  storedCount: number;
  isStorageFull: boolean;
  packs: PackRecord[];
  getPack: (id: string) => PackRecord | undefined;
  createPack: (input: CreatePackInput) => CreatePackResult;
  deletePack: (id: string) => void;
};

const StudioStateContext = createContext<StudioStateContextValue | null>(null);
const basePackIds = new Set(getPackLibrary("en").map((pack) => pack.id));
const artTones: Array<PackRecord["artTone"]> = ["sun", "mint", "sky", "rose"];

export function StudioStateProvider({ children }: { children: ReactNode }) {
  const [planId, setPlanId] = useState<PlanId>(defaultPlanId);
  const [hiddenBasePackIds, setHiddenBasePackIds] = useState<string[]>(() => Array.from(basePackIds));
  const [createdPacks, setCreatedPacks] = useState<CreatedPack[]>([]);

  const createPack = useCallback(
    (input: CreatePackInput): CreatePackResult => {
      const productName = input.productName.trim();

      if (!productName) {
        return { ok: false, reason: "missing_name" };
      }

      const baseCount = basePackIds.size - hiddenBasePackIds.length;
      const storedCount = baseCount + createdPacks.length;

      if (storedCount >= getPlanStorageLimit(planId)) {
        return { ok: false, reason: "storage_full" };
      }

      const createdAt = Date.now();
      const newPack: CreatedPack = {
        id: `${toSlug(productName)}-${createdAt.toString(36)}`,
        productName,
        description: input.description.trim(),
        benefits: input.benefits.trim(),
        languageId: input.languageId,
        platformId: input.platformId,
        authorName: input.authorName.trim() || (input.visibility === "public" ? "TradeAI" : ""),
        createdAt,
        artTone: artTones[createdPacks.length % artTones.length],
        status: "ready",
        visibility: input.visibility
      };

      setCreatedPacks((current) => [newPack, ...current]);

      return { ok: true, id: newPack.id };
    },
    [createdPacks.length, hiddenBasePackIds.length, planId]
  );

  const deletePack = useCallback((id: string) => {
    if (basePackIds.has(id)) {
      setHiddenBasePackIds((current) => (current.includes(id) ? current : [...current, id]));
      return;
    }

    setCreatedPacks((current) => current.filter((pack) => pack.id !== id));
  }, []);

  const value = useMemo<StudioStateContextValue>(
    () => ({
      planId,
      setPlan: setPlanId,
      hiddenBasePackIds,
      createdPacks,
      createPack,
      deletePack
    }),
    [createPack, createdPacks, deletePack, hiddenBasePackIds, planId]
  );

  return <StudioStateContext.Provider value={value}>{children}</StudioStateContext.Provider>;
}

export function useStudioState(locale: Locale): LocalizedStudioState {
  const context = useContext(StudioStateContext);

  if (!context) {
    throw new Error("useStudioState must be used within StudioStateProvider.");
  }

  const storageLimit = getPlanStorageLimit(context.planId);
  const storedCount = basePackIds.size - context.hiddenBasePackIds.length + context.createdPacks.length;
  const packs = useMemo(() => {
    const basePacks = getPackLibrary(locale)
      .filter((pack) => !context.hiddenBasePackIds.includes(pack.id))
      .map((pack) => ({
        ...pack,
        updatedLabel: formatPackTime(locale, pack.createdAt)
      }));
    const createdPacks = context.createdPacks.map((pack) => localizeCreatedPack(locale, pack));

    return [...createdPacks, ...basePacks];
  }, [context.createdPacks, context.hiddenBasePackIds, locale]);

  const packMap = useMemo(() => new Map(packs.map((pack) => [pack.id, pack])), [packs]);

  return {
    planId: context.planId,
    setPlan: context.setPlan,
    creditBalance: getPlanCredits(context.planId),
    storageLimit,
    storedCount,
    isStorageFull: storedCount >= storageLimit,
    packs,
    getPack: (id: string) => packMap.get(id),
    createPack: context.createPack,
    deletePack: context.deletePack
  };
}

function localizeCreatedPack(locale: Locale, pack: CreatedPack): PackRecord {
  const copy = getCopy(locale);
  const languageLabel = copy.studio.languages.find((option) => option.id === pack.languageId)?.label ?? pack.languageId;
  const targetLabel = copy.studio.platforms.find((option) => option.id === pack.platformId)?.label ?? pack.platformId;

  return {
    id: pack.id,
    productName: pack.productName,
    summary:
      pack.description ||
      (locale === "ru"
        ? `Полный пак уже собран для ${pack.productName}.`
        : `A full pack is ready for ${pack.productName}.`),
    artTone: pack.artTone,
    status: pack.status,
    statusLabel: getStatusLabel(locale, pack.status),
    visibility: pack.visibility,
    visibilityLabel: getVisibilityLabel(locale, pack.visibility),
    authorName: pack.authorName,
    createdAt: pack.createdAt,
    languageLabel,
    targetLabel,
    updatedLabel: formatPackTime(locale, pack.createdAt),
    tags: locale === "ru" ? ["SEO", "FAQ", "Объявления"] : ["SEO", "FAQ", "Ads"],
    sections: buildSections(locale, pack, languageLabel, targetLabel)
  };
}

function buildSections(
  locale: Locale,
  pack: CreatedPack,
  languageLabel: string,
  targetLabel: string
): PackSection[] {
  const description =
    pack.description ||
    (locale === "ru"
      ? `Подготовленный текст для ${pack.productName}, чтобы можно было быстро начать.`
      : `Ready copy for ${pack.productName} so you can start right away.`);
  const benefits =
    pack.benefits ||
    (locale === "ru"
      ? `Короткие и понятные преимущества вокруг ${pack.productName}.`
      : `Clear, easy benefits around ${pack.productName}.`);

  if (locale === "ru") {
    return [
      { title: "Заголовок", body: pack.productName },
      { title: "Преимущества", body: benefits },
      { title: "Описание", body: description },
      { title: "SEO", body: `${pack.productName}. ${description}` },
      { title: "Переводы", body: `Основной язык: ${languageLabel}. Остальное уже готово для следующего шага.` },
      { title: "Версии для площадок", body: `Подготовлены версии для ${targetLabel} с короткими и длинными форматами.` },
      { title: "Ответы на отзывы", body: `Есть дружелюбные ответы на частые вопросы по ${pack.productName}.` },
      { title: "FAQ", body: "Есть короткие ответы про использование, уход и важные детали." },
      { title: "Объявления", body: `Собраны короткие рекламные тексты по мотиву ${pack.productName}.` },
      { title: "Идеи для баннеров", body: "Есть простые идеи для визуалов и баннерных сцен." }
    ];
  }

  return [
    { title: "Title", body: pack.productName },
    { title: "Benefits", body: benefits },
    { title: "Description", body: description },
    { title: "SEO", body: `${pack.productName}. ${description}` },
    { title: "Translations", body: `Main language: ${languageLabel}. The rest is ready for the next pass.` },
    { title: "Platform versions", body: `Prepared for ${targetLabel} with short and long versions.` },
    { title: "Review replies", body: `Friendly replies are ready for the common ${pack.productName} questions.` },
    { title: "FAQ", body: "Quick answers are ready for use, care, and the main details." },
    { title: "Ads", body: `Short ad lines are already built around ${pack.productName}.` },
    { title: "Banner ideas", body: "Simple banner directions are ready for the product mood." }
  ];
}

function getStatusLabel(locale: Locale, status: PackStatus): string {
  const labels = {
    en: {
      ready: "Ready",
      updated: "Updated",
      draft: "Draft"
    },
    ru: {
      ready: "Готов",
      updated: "Обновлён",
      draft: "Черновик"
    }
  } as const;

  return labels[locale][status];
}

function formatPackTime(locale: Locale, createdAt: number): string {
  const elapsedMs = Math.max(0, Date.now() - createdAt);
  const minutes = Math.floor(elapsedMs / 60000);

  if (minutes < 1) {
    return locale === "ru" ? "Только что" : "Just now";
  }

  if (minutes < 60) {
    return locale === "ru" ? formatRussianRelative(minutes, "minute") : formatEnglishRelative(minutes, "minute");
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return locale === "ru" ? formatRussianRelative(hours, "hour") : formatEnglishRelative(hours, "hour");
  }

  if (hours < 48) {
    return locale === "ru" ? "1 день назад" : "1 day ago";
  }

  return formatAbsoluteDateTime(locale, createdAt);
}

function getVisibilityLabel(locale: Locale, visibility: PackVisibility): string {
  const labels = {
    en: {
      private: "Private",
      public: "Public"
    },
    ru: {
      private: "Приватный",
      public: "Публичный"
    }
  } as const;

  return labels[locale][visibility];
}

function formatAbsoluteDateTime(locale: Locale, createdAt: number): string {
  const date = new Date(createdAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return locale === "ru"
    ? `${day}.${month}.${year} ${hours}:${minutes}`
    : `${year}-${month}-${day} ${hours}:${minutes}`;
}

function formatEnglishRelative(value: number, unit: "minute" | "hour"): string {
  const suffix = value === 1 ? unit : `${unit}s`;
  return `${value} ${suffix} ago`;
}

function formatRussianRelative(value: number, unit: "minute" | "hour"): string {
  const forms =
    unit === "minute"
      ? (["минуту", "минуты", "минут"] as const)
      : (["час", "часа", "часов"] as const);

  return `${value} ${getRussianPlural(value, forms)} назад`;
}

function getRussianPlural(
  value: number,
  forms: readonly [string, string, string]
) {
  const abs = Math.abs(value) % 100;
  const last = abs % 10;

  if (abs > 10 && abs < 20) {
    return forms[2];
  }

  if (last === 1) {
    return forms[0];
  }

  if (last >= 2 && last <= 4) {
    return forms[1];
  }

  return forms[2];
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "pack";
}
