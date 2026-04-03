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
  creditsTitle: string;
  creditsLeftLabel: string;
  packsLeftLabel: string;
  creditsText: string;
  creditsBadge: string;
  creditsMeta: string;
  creditsMini: string;
};

type StudioCopy = {
  badge: string;
  title: string;
  subtitle: string;
  inputLabel: string;
  inputPlaceholder: string;
  targetLanguageLabel: string;
  platformLabel: string;
  helperNote: string;
  createButton: string;
  createLoading: string;
  createReady: string;
  createHint: string;
  createLoadingNote: string;
  createReadyNote: string;
  packListTitle: string;
  packList: string[];
  creditsTitle: string;
  creditsLeftLabel: string;
  packsLeftLabel: string;
  fullPackCostLabel: string;
  fullPackCostValue: string;
  creditCompactNote: string;
  creditMini: string;
  creditMeta: string;
  creditNote: string;
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
      flowText: "Drop in the product, pick the target, and let the full pack arrive all at once.",
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
      includedText: "The useful pieces you usually need anyway, already laid out for you.",
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
      creditsTitle: "One click. One full pack.",
      creditsLeftLabel: "Credits left",
      packsLeftLabel: "Packs left",
      creditsText: "12 credits gives you the whole pack in one go.",
      creditsBadge: "12 credits",
      creditsMeta: "84 credits are waiting right now.",
      creditsMini: "No tiny extra charges."
    },
    studio: {
      badge: "Easy little studio",
      title: "Drop in one product and make the full pack.",
      subtitle: "No heavy setup. Add the product and hit create.",
      inputLabel: "Your product",
      inputPlaceholder:
        "Luma Pet Brush\nGentle silicone brush for cats and dogs.\nHelps lift loose fur and is easy to wash.",
      targetLanguageLabel: "Language",
      platformLabel: "Where will it live?",
      helperNote: "The full pack lands together: title, description, replies, FAQ, ads, and more.",
      createButton: "Make full pack",
      createLoading: "Making pack...",
      createReady: "Pack ready",
      createHint: "One click and the whole set comes together.",
      createLoadingNote: "Lining up the whole pack for you.",
      createReadyNote: "Nice. The full pack is ready to shape and use.",
      packListTitle: "Inside the pack",
      packList: ["Title", "Benefits", "Description", "SEO", "Translations", "Shop versions", "Replies", "FAQ", "Ads", "Banner ideas"],
      creditsTitle: "Credits",
      creditsLeftLabel: "Credits",
      packsLeftLabel: "Full packs",
      fullPackCostLabel: "Per pack",
      fullPackCostValue: "12 credits",
      creditCompactNote: "Ready to spend on the next pack.",
      creditMini: "One launch gives you the whole set.",
      creditMeta: "Enough for {packs} full packs.",
      creditNote: "No tiny add-ons or separate little charges.",
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
      flowText: "Добавьте товар, выберите цель и получите весь пак сразу.",
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
      includedText: "Полезные части, которые обычно всё равно нужны, уже лежат рядом.",
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
      creditsTitle: "Один клик. Один полный пак.",
      creditsLeftLabel: "Кредитов осталось",
      packsLeftLabel: "Полных паков",
      creditsText: "12 кредитов и весь набор уже у вас.",
      creditsBadge: "12 кредитов",
      creditsMeta: "84 кредита уже ждут.",
      creditsMini: "Без мелких списаний."
    },
    studio: {
      badge: "Тихая студия для старта",
      title: "Добавьте товар и соберите полный пак.",
      subtitle: "Без тяжёлой настройки. Просто вставьте товар и нажмите создать.",
      inputLabel: "Ваш товар",
      inputPlaceholder:
        "Luma Pet Brush\nМягкая силиконовая щётка для кошек и собак.\nПомогает убрать лишнюю шерсть и легко моется.",
      targetLanguageLabel: "Язык",
      platformLabel: "Где он будет жить?",
      helperNote: "Полный пак приходит сразу: заголовок, описание, ответы, FAQ, объявления и ещё немного полезного.",
      createButton: "Собрать полный пак",
      createLoading: "Собираем пак...",
      createReady: "Пак готов",
      createHint: "Один клик, и всё собирается вместе.",
      createLoadingNote: "Собираем весь пак для вас.",
      createReadyNote: "Готово. Пак уже приятно брать и использовать.",
      packListTitle: "Что внутри",
      packList: [
        "Заголовок",
        "Преимущества",
        "Описание",
        "SEO",
        "Переводы",
        "Версии для площадок",
        "Ответы",
        "FAQ",
        "Объявления",
        "Баннеры"
      ],
      creditsTitle: "Кредиты",
      creditsLeftLabel: "Кредитов",
      packsLeftLabel: "Полных паков",
      fullPackCostLabel: "За один пак",
      fullPackCostValue: "12 кредитов",
      creditCompactNote: "Готово к следующему полному паку.",
      creditMini: "Один запуск даёт весь набор сразу.",
      creditMeta: "Хватит на {packs} полных паков.",
      creditNote: "Без мелких доплат и дробных списаний.",
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
