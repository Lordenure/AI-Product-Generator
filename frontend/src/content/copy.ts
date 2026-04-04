import type { Locale } from "@/lib/i18n";

export type StudioOption = {
  id: string;
  label: string;
};

type CommonCopy = {
  brandLine: string;
  home: string;
  studio: string;
  openStudio: string;
  backHome: string;
  language: string;
  footerLine: string;
  footerNote: string;
};

type HomePlanCopy = {
  name: string;
  price: string;
  audience: string;
  credits: string;
  note: string;
};

type HomeCopy = {
  badge: string;
  title: string;
  subtitle: string;
  cta: string;
  heroStats: string[];
  visualInputLabel: string;
  visualInputValue: string;
  visualOutputLabel: string;
  visualOutputNote: string;
  outputs: string[];
  flowTitle: string;
  flowText: string;
  flowSteps: Array<{ title: string; text: string }>;
  includedTitle: string;
  includedText: string;
  includedList: string[];
  plansTitle: string;
  plansText: string;
  plans: HomePlanCopy[];
};

type StudioCopy = {
  sidebarHomeLabel: string;
  sidebarCreateLabel: string;
  sidebarPacksLabel: string;
  sidebarUpgradeLabel: string;
  sidebarProfileRole: string;
  sidebarProfileName: string;
  sidebarLanguageLabel: string;
  createEyebrow: string;
  createTitle: string;
  createText: string;
  productNameLabel: string;
  productNamePlaceholder: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  benefitsLabel: string;
  benefitsPlaceholder: string;
  benefitsHint: string;
  targetLanguageLabel: string;
  platformLabel: string;
  createButton: string;
  createLoading: string;
  createReady: string;
  createHint: string;
  createLoadingNote: string;
  createReadyNote: string;
  packsTitle: string;
  packsText: string;
  openPack: string;
  detailBack: string;
  detailLabel: string;
  detailText: string;
  creditsTitle: string;
  creditsLeftLabel: string;
  packsLeftLabel: string;
  fullPackCostValue: string;
  languages: StudioOption[];
  platforms: StudioOption[];
};

export type SiteCopy = {
  common: CommonCopy;
  home: HomeCopy;
  studio: StudioCopy;
};

export const creditBalance = 84;
export const fullPackCost = 12;

export const siteCopy: Record<Locale, SiteCopy> = {
  en: {
    common: {
      brandLine: "One product. Full pack.",
      home: "Home",
      studio: "Studio",
      openStudio: "Try studio",
      backHome: "Home",
      language: "Language",
      footerLine: "One product in. A full pack out.",
      footerNote: "Made to feel easy from the first try."
    },
    home: {
      badge: "One product in. Full pack out.",
      title: "Add one product. Get the whole pack.",
      subtitle:
        "Titles, benefits, replies, FAQ, ads, and more land together in one easy go.",
      cta: "Try it now",
      heroStats: ["10 ready parts", "1 click", "12 credits"],
      visualInputLabel: "Your product",
      visualInputValue: "GlowCup - insulated bottle with a tea infuser",
      visualOutputLabel: "Full pack",
      visualOutputNote: "Everything lands together",
      outputs: [
        "Title",
        "Benefits",
        "Description",
        "SEO",
        "Translations",
        "Platform versions",
        "Review replies",
        "FAQ",
        "Ads",
        "Banner ideas"
      ],
      flowTitle: "Just three easy steps",
      flowText: "Add the product, pick the target, and get the full pack.",
      flowSteps: [
        {
          title: "Add the product",
          text: "A name and a few details are enough."
        },
        {
          title: "Pick the target",
          text: "Choose the language and where it should go."
        },
        {
          title: "Get the whole pack",
          text: "It all lands together in one go."
        }
      ],
      includedTitle: "Inside the pack",
      includedText: "The pieces you usually need, ready together.",
      includedList: [
        "Product title",
        "Short benefits",
        "Full description",
        "SEO version",
        "Translations",
        "Versions for different platforms",
        "Review replies",
        "FAQ",
        "Ad texts",
        "Banner ideas"
      ],
      plansTitle: "Plans",
      plansText: "Start free, then move up when you want more packs ready to go.",
      plans: [
        {
          name: "Free",
          price: "$0",
          audience: "For a first try",
          credits: "24 credits / 2 packs",
          note: "A simple start with a small library."
        },
        {
          name: "Plus",
          price: "$24/mo",
          audience: "For regular launches",
          credits: "180 credits / 15 packs",
          note: "More languages and more saved packs."
        },
        {
          name: "Pro",
          price: "$59/mo",
          audience: "For daily use",
          credits: "480 credits / 40 packs",
          note: "Priority speed and the full library kept ready."
        }
      ]
    },
    studio: {
      sidebarHomeLabel: "Home",
      sidebarCreateLabel: "Create",
      sidebarPacksLabel: "Packs",
      sidebarUpgradeLabel: "Upgrade",
      sidebarProfileRole: "Creator",
      sidebarProfileName: "Lordenure",
      sidebarLanguageLabel: "Language",
      createEyebrow: "Create",
      createTitle: "New full pack",
      createText: "Add a product and click once.",
      productNameLabel: "Product name",
      productNamePlaceholder: "Example: GlowCup",
      descriptionLabel: "Short description",
      descriptionPlaceholder: "Example: Insulated bottle with a tea infuser and a leak-safe lid.",
      benefitsLabel: "Key benefits",
      benefitsPlaceholder: "Example: Keeps tea hot, easy to carry, easy to clean",
      benefitsHint: "Optional",
      targetLanguageLabel: "Language",
      platformLabel: "Use on",
      createButton: "Create full pack",
      createLoading: "Creating pack...",
      createReady: "Pack ready",
      createHint: "One click for the full pack.",
      createLoadingNote: "Making the full pack.",
      createReadyNote: "Pack ready to open.",
      packsTitle: "Latest packs",
      packsText: "Open any pack.",
      openPack: "Open pack",
      detailBack: "Back to studio",
      detailLabel: "Full pack",
      detailText: "Everything for this product is ready here.",
      creditsTitle: "Credits",
      creditsLeftLabel: "credits",
      packsLeftLabel: "packs left",
      fullPackCostValue: "12 per pack",
      languages: [
        { id: "en", label: "English" },
        { id: "ru", label: "Russian" },
        { id: "de", label: "German" },
        { id: "es", label: "Spanish" }
      ],
      platforms: [
        { id: "site", label: "Website" },
        { id: "amazon", label: "Amazon" },
        { id: "wildberries", label: "Wildberries" },
        { id: "ozon", label: "Ozon" },
        { id: "instagram", label: "Instagram" }
      ]
    }
  },
  ru: {
    common: {
      brandLine: "Один товар. Полный пак.",
      home: "Главная",
      studio: "Студия",
      openStudio: "Попробовать",
      backHome: "Главная",
      language: "Язык",
      footerLine: "Один товар внутри. Полный пак на выходе.",
      footerNote: "Сделано так, чтобы было легко с первой попытки."
    },
    home: {
      badge: "Один товар внутрь. Полный пак на выходе.",
      title: "Добавьте один товар. Остальное уже соберётся.",
      subtitle:
        "Заголовок, преимущества, ответы, FAQ, объявления и ещё немного полезного приходят сразу.",
      cta: "Попробовать",
      heroStats: ["10 готовых частей", "1 клик", "12 кредитов"],
      visualInputLabel: "Ваш товар",
      visualInputValue: "GlowCup - термобутылка с заварником для чая",
      visualOutputLabel: "Полный пак",
      visualOutputNote: "Всё приходит сразу",
      outputs: [
        "Заголовок",
        "Преимущества",
        "Описание",
        "SEO",
        "Переводы",
        "Версии для площадок",
        "Ответы на отзывы",
        "FAQ",
        "Объявления",
        "Идеи для баннеров"
      ],
      flowTitle: "Всего три шага",
      flowText: "Добавьте товар, выберите цель и получите весь пак.",
      flowSteps: [
        {
          title: "Добавьте товар",
          text: "Названия и пары деталей уже хватит."
        },
        {
          title: "Выберите цель",
          text: "Язык и площадка задаются в пару кликов."
        },
        {
          title: "Получите весь пак",
          text: "Ничего не дробится на мелкие части."
        }
      ],
      includedTitle: "Что внутри",
      includedText: "Все нужные части уже собраны рядом.",
      includedList: [
        "Заголовок товара",
        "Короткие преимущества",
        "Полное описание",
        "SEO-версия",
        "Переводы",
        "Версии для разных площадок",
        "Ответы на отзывы",
        "FAQ",
        "Рекламные тексты",
        "Идеи для баннеров"
      ],
      plansTitle: "Тарифы",
      plansText: "Можно начать бесплатно, а потом взять больше паков, когда они нужны чаще.",
      plans: [
        {
          name: "Free",
          price: "$0",
          audience: "Для первого знакомства",
          credits: "24 кредита / 2 пака",
          note: "Простой старт и маленькая библиотека."
        },
        {
          name: "Plus",
          price: "$24 / мес",
          audience: "Для регулярных запусков",
          credits: "180 кредитов / 15 паков",
          note: "Больше языков и больше сохранённых паков."
        },
        {
          name: "Pro",
          price: "$59 / мес",
          audience: "Для ежедневной работы",
          credits: "480 кредитов / 40 паков",
          note: "Приоритетная скорость и вся библиотека под рукой."
        }
      ]
    },
    studio: {
      sidebarHomeLabel: "Главная",
      sidebarCreateLabel: "Создать",
      sidebarPacksLabel: "Паки",
      sidebarUpgradeLabel: "Улучшить",
      sidebarProfileRole: "Создатель",
      sidebarProfileName: "Lordenure",
      sidebarLanguageLabel: "Язык",
      createEyebrow: "Создать",
      createTitle: "Новый полный пак",
      createText: "Добавьте товар и нажмите один раз.",
      productNameLabel: "Название товара",
      productNamePlaceholder: "Пример: GlowCup",
      descriptionLabel: "Короткое описание",
      descriptionPlaceholder: "Пример: Термобутылка с заварником для чая и крышкой без протекания.",
      benefitsLabel: "Ключевые преимущества",
      benefitsPlaceholder: "Пример: Держит тепло, удобно брать с собой, легко мыть",
      benefitsHint: "Необязательно",
      targetLanguageLabel: "Язык",
      platformLabel: "Где использовать",
      createButton: "Собрать полный пак",
      createLoading: "Собираем пак...",
      createReady: "Пак готов",
      createHint: "Один клик на весь пак.",
      createLoadingNote: "Собираем полный пак.",
      createReadyNote: "Пак можно открыть.",
      packsTitle: "Последние паки",
      packsText: "Откройте любой пак.",
      openPack: "Открыть пак",
      detailBack: "Назад в студию",
      detailLabel: "Полный пак",
      detailText: "Все материалы по этому товару уже собраны здесь.",
      creditsTitle: "Кредиты",
      creditsLeftLabel: "кредитов",
      packsLeftLabel: "паков осталось",
      fullPackCostValue: "12 за пак",
      languages: [
        { id: "en", label: "Английский" },
        { id: "ru", label: "Русский" },
        { id: "de", label: "Немецкий" },
        { id: "es", label: "Испанский" }
      ],
      platforms: [
        { id: "site", label: "Сайт" },
        { id: "amazon", label: "Amazon" },
        { id: "wildberries", label: "Wildberries" },
        { id: "ozon", label: "Ozon" },
        { id: "instagram", label: "Instagram" }
      ]
    }
  }
};

export function getCopy(locale: Locale): SiteCopy {
  return siteCopy[locale];
}
