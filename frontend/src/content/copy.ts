import type { Locale } from "@/lib/i18n";

export type StudioOption = {
  id: string;
  label: string;
  previewLabel: string;
};

export type PreviewSection = {
  title: string;
  sample: string;
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
  creditsTitle: string;
  creditsLeftLabel: string;
  packsLeftLabel: string;
  fullPackCostLabel: string;
  fullPackCostValue: string;
  creditNote: string;
  previewTitle: string;
  previewText: string;
  previewStatusIdle: string;
  previewStatusLoading: string;
  previewStatusReady: string;
  previewContext: string;
  previewMeta: string;
  sampleProductFallback: string;
  languages: StudioOption[];
  platforms: StudioOption[];
  previewSections: PreviewSection[];
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
      brandLine: "Ready pack in one step",
      home: "Home",
      studio: "Studio",
      openStudio: "Open studio",
      backHome: "Back home",
      language: "Language",
      footerLine: "One product in. A full pack out.",
      footerNote: "Made for fast starts, not heavy setup."
    },
    home: {
      badge: "One product. Ready pack.",
      title: "Drop in one product and get everything you need to sell it.",
      subtitle:
        "TradeAI turns one product into ready texts, replies, FAQs, ads, and banner directions in one calm step.",
      cta: "Try the studio",
      heroStats: ["10 ready parts", "1 calm step", "12 credits"],
      visualInputLabel: "Your product",
      visualInputValue: "GlowCup - insulated bottle with a tea infuser",
      visualOutputLabel: "Full pack",
      visualOutputNote: "Ready to shape, edit, and use",
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
      flowTitle: "Simple in, rich out",
      flowText:
        "You add one product. TradeAI lays out the full pack so it already feels ready instead of half-done.",
      flowSteps: [
        {
          title: "Add the product",
          text: "Name it and drop in the key details."
        },
        {
          title: "Pick the target",
          text: "Choose the language and where the pack will be used."
        },
        {
          title: "Get the whole pack",
          text: "Everything arrives together, not as tiny separate pieces."
        }
      ],
      includedTitle: "What shows up in the pack",
      includedText:
        "Clear product text, versions for different selling places, helpful replies, and quick ad ideas without the busywork.",
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
      creditsTitle: "One action, one credit cost",
      creditsLeftLabel: "Credits left",
      packsLeftLabel: "Packs left",
      creditsText:
        "A full pack costs 12 credits. That one action gives you the whole set, not tiny charges for each part.",
      creditsBadge: "12 credits / full pack",
      creditsMeta: "84 credits left means 7 full packs ready to go.",
      creditsMini: "Use one credit action, get the whole pack."
    },
    studio: {
      badge: "Calm creation space",
      title: "Turn one product into a ready content pack.",
      subtitle:
        "Keep it light: add the product, choose the language, choose where it will be used, and create everything in one click.",
      inputLabel: "Add your product",
      inputPlaceholder:
        "Luma Pet Brush\nGentle silicone brush for cats and dogs.\nHelps lift loose fur and is easy to wash.",
      targetLanguageLabel: "Pack language",
      platformLabel: "Where will you use it?",
      helperNote:
        "One full pack includes title, benefits, description, SEO, translations, FAQ, replies, ads, and banner ideas.",
      createButton: "Create full pack",
      createLoading: "Creating pack...",
      createReady: "Pack ready",
      createHint: "One click creates the whole set.",
      creditsTitle: "Credits",
      creditsLeftLabel: "Credits left",
      packsLeftLabel: "Packs left",
      fullPackCostLabel: "Full pack cost",
      fullPackCostValue: "12 credits",
      creditNote: "No separate charges for each piece.",
      previewTitle: "Preview the full pack",
      previewText: "This is the shape of the result you get in one action.",
      previewStatusIdle: "Preview",
      previewStatusLoading: "Warming up",
      previewStatusReady: "Ready",
      previewContext: "Made for {platform} in {language}",
      previewMeta: "10 ready parts in one pack",
      sampleProductFallback: "Your product",
      languages: [
        { id: "en", label: "English", previewLabel: "English" },
        { id: "ru", label: "Russian", previewLabel: "Russian" },
        { id: "de", label: "German", previewLabel: "German" },
        { id: "es", label: "Spanish", previewLabel: "Spanish" }
      ],
      platforms: [
        { id: "site", label: "Website", previewLabel: "Website" },
        { id: "amazon", label: "Amazon", previewLabel: "Amazon" },
        { id: "wildberries", label: "Wildberries", previewLabel: "Wildberries" },
        { id: "ozon", label: "Ozon", previewLabel: "Ozon" },
        { id: "instagram", label: "Instagram", previewLabel: "Instagram" }
      ],
      previewSections: [
        {
          title: "Title",
          sample: "GlowCup Tea Bottle | Warm sips without the spill"
        },
        {
          title: "Benefits",
          sample: "Keeps tea hot, strains loose leaves, and feels easy to carry."
        },
        {
          title: "Description",
          sample: "A slim insulated bottle with a built-in infuser for tea, fruit, and quick everyday refills."
        },
        {
          title: "SEO version",
          sample: "Tea infuser bottle, insulated tea tumbler, leak-safe tea flask."
        },
        {
          title: "Platform version",
          sample: "Tuned for skimming, fast comparison, and a quick buy decision."
        },
        {
          title: "Review reply",
          sample: "Thank you. We are so glad the bottle made your morning tea easier."
        },
        {
          title: "FAQ",
          sample: "Can I use fruit or coffee too? Yes, the filter lifts out for quick rinsing."
        },
        {
          title: "Ads",
          sample: "Steep, sip, and go. Your tea bottle for calm mornings."
        },
        {
          title: "Banner idea",
          sample: "Soft sunrise light, warm steam, and a close-up of the infuser drop."
        }
      ]
    }
  },
  ru: {
    common: {
      brandLine: "Готовый пак за один шаг",
      home: "Главная",
      studio: "Студия",
      openStudio: "Открыть студию",
      backHome: "На главную",
      language: "Язык",
      footerLine: "Один товар внутри. Полный пак на выходе.",
      footerNote: "Для быстрого старта, без тяжёлой настройки."
    },
    home: {
      badge: "Один товар. Готовый пак.",
      title: "Добавьте один товар и сразу получите всё, что нужно для продажи.",
      subtitle:
        "TradeAI превращает один товар в готовые тексты, ответы, FAQ, объявления и идеи для баннеров за один спокойный шаг.",
      cta: "Попробовать студию",
      heroStats: ["10 готовых частей", "1 спокойный шаг", "12 кредитов"],
      visualInputLabel: "Ваш товар",
      visualInputValue: "GlowCup - термобутылка с заварником для чая",
      visualOutputLabel: "Полный пак",
      visualOutputNote: "Уже приятно редактировать и использовать",
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
      flowTitle: "Просто на входе, богато на выходе",
      flowText:
        "Вы добавляете один товар. TradeAI сразу раскладывает результат как готовый набор, а не как сырой черновик.",
      flowSteps: [
        {
          title: "Добавьте товар",
          text: "Название и пара важных деталей уже достаточно."
        },
        {
          title: "Выберите цель",
          text: "Укажите язык и место, где этот пак будет жить."
        },
        {
          title: "Получите весь пак",
          text: "Всё приходит сразу, а не кусочками по отдельности."
        }
      ],
      includedTitle: "Что входит в пак",
      includedText:
        "Понятные тексты, версии под разные площадки, ответы покупателям и быстрые идеи для рекламы без лишней рутины.",
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
      creditsTitle: "Одно действие, одна цена",
      creditsLeftLabel: "Кредитов осталось",
      packsLeftLabel: "Полных паков",
      creditsText:
        "Полный пак стоит 12 кредитов. За это одно действие вы получаете весь набор, а не мелкие списания за каждую часть.",
      creditsBadge: "12 кредитов / полный пак",
      creditsMeta: "84 кредита хватит на 7 полных паков.",
      creditsMini: "Один кредитный шаг, и весь пак уже здесь."
    },
    studio: {
      badge: "Спокойное место для создания",
      title: "Превратите один товар в готовый контент-пак.",
      subtitle:
        "Всё просто: добавьте товар, выберите язык, выберите площадку и соберите всё одним кликом.",
      inputLabel: "Добавьте свой товар",
      inputPlaceholder:
        "Luma Pet Brush\nМягкая силиконовая щётка для кошек и собак.\nПомогает убрать лишнюю шерсть и легко моется.",
      targetLanguageLabel: "Язык пака",
      platformLabel: "Где будете использовать?",
      helperNote:
        "Один полный пак включает заголовок, преимущества, описание, SEO, переводы, FAQ, ответы, объявления и идеи для баннеров.",
      createButton: "Создать полный пак",
      createLoading: "Собираем пак...",
      createReady: "Пак готов",
      createHint: "Один клик собирает весь набор.",
      creditsTitle: "Кредиты",
      creditsLeftLabel: "Осталось",
      packsLeftLabel: "Полных паков",
      fullPackCostLabel: "Полный пак стоит",
      fullPackCostValue: "12 кредитов",
      creditNote: "Без отдельных списаний за каждую часть.",
      previewTitle: "Предпросмотр полного пака",
      previewText: "Вот форма результата, который вы получаете за одно действие.",
      previewStatusIdle: "Предпросмотр",
      previewStatusLoading: "Собираем",
      previewStatusReady: "Готово",
      previewContext: "Сделано для {platform} на {language}",
      previewMeta: "10 готовых частей в одном паке",
      sampleProductFallback: "Ваш товар",
      languages: [
        { id: "en", label: "Английский", previewLabel: "английском" },
        { id: "ru", label: "Русский", previewLabel: "русском" },
        { id: "de", label: "Немецкий", previewLabel: "немецком" },
        { id: "es", label: "Испанский", previewLabel: "испанском" }
      ],
      platforms: [
        { id: "site", label: "Сайт", previewLabel: "сайта" },
        { id: "amazon", label: "Amazon", previewLabel: "Amazon" },
        { id: "wildberries", label: "Wildberries", previewLabel: "Wildberries" },
        { id: "ozon", label: "Ozon", previewLabel: "Ozon" },
        { id: "instagram", label: "Instagram", previewLabel: "Instagram" }
      ],
      previewSections: [
        {
          title: "Заголовок",
          sample: "GlowCup Tea Bottle | Тёплый чай без проливов"
        },
        {
          title: "Преимущества",
          sample: "Держит тепло, заваривает листовой чай и удобно лежит в руке."
        },
        {
          title: "Описание",
          sample: "Тонкая термобутылка со встроенным заварником для чая, фруктов и спокойных ежедневных поездок."
        },
        {
          title: "SEO",
          sample: "бутылка для чая с заварником, термобутылка для чая, герметичный чайный термос"
        },
        {
          title: "Версия для площадки",
          sample: "Подстроена под быстрое чтение, сравнение и лёгкое решение о покупке."
        },
        {
          title: "Ответ на отзыв",
          sample: "Спасибо. Очень рады, что бутылка сделала ваше утреннее чаепитие удобнее."
        },
        {
          title: "FAQ",
          sample: "Можно ли заваривать фрукты или кофе? Да, фильтр легко вынимается и быстро моется."
        },
        {
          title: "Объявления",
          sample: "Заварите, сделайте глоток и идите дальше. Бутылка для спокойных утр."
        },
        {
          title: "Идея для баннера",
          sample: "Мягкий свет рассвета, тёплый пар и крупный план опускающегося фильтра."
        }
      ]
    }
  }
};

export function getCopy(locale: Locale): SiteCopy {
  return siteCopy[locale];
}
