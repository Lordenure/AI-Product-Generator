import type { Locale } from "@/lib/i18n";

export type PlanId = "free" | "plus" | "pro";

export type PlanCard = {
  id: PlanId;
  name: string;
  price: string;
  line: string;
  featured?: boolean;
  features: string[];
};

type PlanDefinition = {
  id: PlanId;
  name: string;
  price: string;
  monthlyCredits: number;
  storageLimit: number;
  featured?: boolean;
  copy: Record<
    Locale,
    {
      line: string;
      features: string[];
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
        features: [
          "100 credits / month",
          "Up to 13 packs stored at the same time",
          "basic AI model"
        ]
      },
      ru: {
        line: "Лёгкий старт без спешки.",
        features: [
          "100 кредитов в месяц",
          "До 13 паков одновременно",
          "базовая AI модель"
        ]
      }
    }
  },
  {
    id: "plus",
    name: "Plus",
    price: "$20",
    monthlyCredits: 900,
    storageLimit: 100,
    featured: true,
    copy: {
      en: {
        line: "More room to create and save.",
        features: [
          "900 credits / month",
          "Up to 100 packs stored",
          "smarter AI model",
          "Multiple images for one product"
        ]
      },
      ru: {
        line: "Больше места, чтобы создавать и сохранять.",
        features: [
          "900 кредитов в месяц",
          "До 100 паков",
          "более умная AI модель",
          "Несколько изображений для одного товара"
        ]
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
        features: [
          "2700 credits / month",
          "Up to 350 packs stored",
          "maximum AI model",
          "Multiple images for one product"
        ]
      },
      ru: {
        line: "Самый большой план для лучшей работы.",
        features: [
          "2700 кредитов в месяц",
          "До 350 паков",
          "максимальная AI модель",
          "Несколько изображений для одного товара"
        ]
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
    featured: plan.featured,
    features: plan.copy[locale].features
  }));
}

export function getPlanStorageLimit(planId: PlanId): number {
  return getPlanById(planId).storageLimit;
}

export function getPlanCredits(planId: PlanId): number {
  return getPlanById(planId).monthlyCredits;
}
