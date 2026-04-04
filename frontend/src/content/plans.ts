import type { Locale } from "@/lib/i18n";

export type PlanId = "free" | "plus" | "pro";

export type PlanCard = {
  id: PlanId;
  name: string;
  price: string;
  line: string;
  credits: string;
  storage: string;
  model: string;
};

type PlanDefinition = {
  id: PlanId;
  name: string;
  price: string;
  monthlyCredits: number;
  storageLimit: number;
  copy: Record<
    Locale,
    {
      line: string;
      credits: string;
      storage: string;
      model: string;
    }
  >;
};

export const defaultPlanId: PlanId = "free";

const planDefinitions: PlanDefinition[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    monthlyCredits: 100,
    storageLimit: 13,
    copy: {
      en: {
        line: "An easy place to start.",
        credits: "100 credits / month",
        storage: "Keep up to 13 packs at once.",
        model: "basic AI model"
      },
      ru: {
        line: "Лёгкий старт без спешки.",
        credits: "100 кредитов в месяц",
        storage: "До 13 паков одновременно",
        model: "базовая AI модель"
      }
    }
  },
  {
    id: "plus",
    name: "Plus",
    price: "$20",
    monthlyCredits: 900,
    storageLimit: 100,
    copy: {
      en: {
        line: "More room to create and save.",
        credits: "900 credits / month",
        storage: "Keep up to 100 packs.",
        model: "smarter AI model"
      },
      ru: {
        line: "Больше места, чтобы создавать и сохранять.",
        credits: "900 кредитов в месяц",
        storage: "До 100 паков",
        model: "более умная AI модель"
      }
    }
  },
  {
    id: "pro",
    name: "Pro",
    price: "$50",
    monthlyCredits: 2700,
    storageLimit: 350,
    copy: {
      en: {
        line: "The biggest plan for your best work.",
        credits: "2700 credits / month",
        storage: "Keep up to 350 packs.",
        model: "maximum AI model"
      },
      ru: {
        line: "Самый большой план для лучшей работы.",
        credits: "2700 кредитов в месяц",
        storage: "До 350 паков",
        model: "максимальная AI модель"
      }
    }
  }
];

export function getPlanById(planId: PlanId): PlanDefinition {
  return planDefinitions.find((plan) => plan.id === planId) ?? planDefinitions[0];
}

export function getPlanCards(locale: Locale): PlanCard[] {
  return planDefinitions.map((plan) => ({
    id: plan.id,
    name: plan.name,
    price: plan.price,
    line: plan.copy[locale].line,
    credits: plan.copy[locale].credits,
    storage: plan.copy[locale].storage,
    model: plan.copy[locale].model
  }));
}

export function getPlanStorageLimit(planId: PlanId): number {
  return getPlanById(planId).storageLimit;
}

export function getPlanCredits(planId: PlanId): number {
  return getPlanById(planId).monthlyCredits;
}
