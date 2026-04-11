import type { Locale } from "@/lib/i18n";

export type PackStatus = "draft" | "ready" | "updated";
export type PackVisibility = "private" | "public";

export type PackSection = {
  title: string;
  body: string;
};

export type PackRecord = {
  id: string;
  productName: string;
  summary: string;
  artTone: "sun" | "mint" | "sky" | "rose";
  status: PackStatus;
  statusLabel: string;
  visibility: PackVisibility;
  visibilityLabel: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  languageLabel: string;
  targetLabel: string;
  updatedLabel: string;
  tags: string[];
  sections: PackSection[];
};

function toTimestamp(value: string) {
  return new Date(value).getTime();
}

const packLibrary: Record<Locale, PackRecord[]> = {
  en: [
    {
      id: "glowcup",
      productName: "GlowCup",
      summary: "Insulated bottle with a tea infuser and a leak-safe lid.",
      artTone: "sun",
      status: "updated",
      statusLabel: "Updated",
      visibility: "public",
      visibilityLabel: "Public",
      authorId: "mila-rowan",
      authorName: "Mila Rowan",
      createdAt: toTimestamp("2026-04-11T18:45:00"),
      languageLabel: "English",
      targetLabel: "Website",
      updatedLabel: "",
      tags: ["SEO", "FAQ", "Ads"],
      sections: [
        { title: "Title", body: "GlowCup Tea Bottle" },
        { title: "Benefits", body: "Keeps tea warm, travels easily, and stays simple to clean." },
        { title: "Description", body: "A neat insulated bottle with a built-in tea infuser for easy everyday brewing." },
        { title: "SEO", body: "Insulated tea bottle with infuser, leak-safe lid, and easy-clean finish." },
        { title: "Translations", body: "Ready in English, Russian, German, and Spanish." },
        { title: "Platform versions", body: "Short site copy, marketplace text, and social-ready variants are included." },
        { title: "Review replies", body: "Friendly replies for delivery, fit, heat retention, and cleaning questions." },
        { title: "FAQ", body: "Covers material, infuser size, wash care, and hot drink use." },
        { title: "Ads", body: "Short ad lines focused on calm tea rituals and easy travel use." },
        { title: "Banner ideas", body: "Soft product scenes for desk, commute, and weekend carry." }
      ]
    },
    {
      id: "luma-pet-brush",
      productName: "Luma Pet Brush",
      summary: "Soft silicone brush that lifts loose fur without pulling.",
      artTone: "mint",
      status: "ready",
      statusLabel: "Ready",
      visibility: "public",
      visibilityLabel: "Public",
      authorId: "theo-march",
      authorName: "Theo March",
      createdAt: toTimestamp("2026-04-11T12:20:00"),
      languageLabel: "Russian",
      targetLabel: "Shopify",
      updatedLabel: "",
      tags: ["Replies", "Description", "Banner"],
      sections: [
        { title: "Title", body: "Luma Pet Brush for Cats and Dogs" },
        { title: "Benefits", body: "Gentle touch, easy wash care, and less loose fur around the home." },
        { title: "Description", body: "A light silicone brush made for calm grooming and quick cleanup after use." },
        { title: "SEO", body: "Silicone pet brush for shedding care, soft grooming, and easy wash cleaning." },
        { title: "Translations", body: "Prepared for Russian-first listings with matching English backup copy." },
        { title: "Platform versions", body: "Includes marketplace title lengths and compact feature bullets." },
        { title: "Review replies", body: "Warm replies for size, softness, fur pickup, and pet comfort." },
        { title: "FAQ", body: "Answers around coat types, washing, brush feel, and daily use." },
        { title: "Ads", body: "Short ads focused on less fur on clothes and stress-free brushing." },
        { title: "Banner ideas", body: "Close-up pet grooming shots with soft pastel backdrops." }
      ]
    },
    {
      id: "mistloop",
      productName: "MistLoop Diffuser",
      summary: "Quiet aroma diffuser with a soft bedside light.",
      artTone: "sky",
      status: "draft",
      statusLabel: "Draft",
      visibility: "public",
      visibilityLabel: "Public",
      authorId: "ada-soren",
      authorName: "Ada Soren",
      createdAt: toTimestamp("2026-04-10T22:40:00"),
      languageLabel: "English",
      targetLabel: "Amazon",
      updatedLabel: "",
      tags: ["Title", "Benefits", "FAQ"],
      sections: [
        { title: "Title", body: "MistLoop Quiet Aroma Diffuser" },
        { title: "Benefits", body: "Calm sound level, soft ambient light, and easy bedtime use." },
        { title: "Description", body: "A diffuser made for quiet rooms, light routines, and simple evening setup." },
        { title: "SEO", body: "Quiet aroma diffuser with bedside light and easy refill design." },
        { title: "Translations", body: "English base copy is ready for the next language pass." },
        { title: "Platform versions", body: "Amazon-ready bullets and shorter mobile listing text are included." },
        { title: "Review replies", body: "Reply starters cover noise, mist strength, and cleaning questions." },
        { title: "FAQ", body: "Includes water capacity, auto shutoff, oil use, and light mode notes." },
        { title: "Ads", body: "Calm mood ads built around slow evenings and quiet sleep spaces." },
        { title: "Banner ideas", body: "Bedroom shelf, nightstand glow, and soft linen product scenes." }
      ]
    },
    {
      id: "softnest-wrap",
      productName: "SoftNest Baby Wrap",
      summary: "Stretchy baby wrap for close carry and easy adjustment.",
      artTone: "rose",
      status: "ready",
      statusLabel: "Ready",
      visibility: "public",
      visibilityLabel: "Public",
      authorId: "lina-north",
      authorName: "Lina North",
      createdAt: toTimestamp("2026-04-09T16:10:00"),
      languageLabel: "German",
      targetLabel: "Website",
      updatedLabel: "",
      tags: ["Translations", "FAQ", "Ads"],
      sections: [
        { title: "Title", body: "SoftNest Baby Wrap" },
        { title: "Benefits", body: "Close comfort, soft stretch, and simple tying guidance for new parents." },
        { title: "Description", body: "A gentle baby wrap designed to keep carrying close, calm, and easy to learn." },
        { title: "SEO", body: "Stretch baby wrap for newborn carry, soft fabric, and easy adjustment." },
        { title: "Translations", body: "German store copy is ready alongside the original English version." },
        { title: "Platform versions", body: "Website hero copy, care notes, and shorter promo text are included." },
        { title: "Review replies", body: "Replies cover fit, age range, wash care, and first-use comfort." },
        { title: "FAQ", body: "Answers for fabric, size range, tying tips, and daily wear." },
        { title: "Ads", body: "Warm ads focused on closeness, comfort, and lighter daily routines." },
        { title: "Banner ideas", body: "Soft home scenes with natural light and calm parent-baby moments." }
      ]
    },
    {
      id: "nori-lamp",
      productName: "Nori Lamp",
      summary: "Small table lamp with a soft dimmer and warm evening glow.",
      artTone: "sky",
      status: "updated",
      statusLabel: "Updated",
      visibility: "public",
      visibilityLabel: "Public",
      authorId: "keira-vale",
      authorName: "Keira Vale",
      createdAt: toTimestamp("2026-04-07T19:25:00"),
      languageLabel: "Spanish",
      targetLabel: "Instagram",
      updatedLabel: "",
      tags: ["Ads", "SEO", "Replies"],
      sections: [
        { title: "Title", body: "Nori Lamp with Warm Dimming Glow" },
        { title: "Benefits", body: "Soft light, calm bedside feel, and simple dimming for slower evenings." },
        { title: "Description", body: "A neat little lamp made for desks, shelves, and quiet nighttime light." },
        { title: "SEO", body: "Warm dimmable table lamp for bedside shelves and cozy evening light." },
        { title: "Translations", body: "Spanish and English versions are both ready." },
        { title: "Platform versions", body: "Includes short social hooks and longer store-ready text." },
        { title: "Review replies", body: "Covers brightness, switch feel, cable length, and room size." },
        { title: "FAQ", body: "Answers around bulb type, dimmer use, materials, and cleaning." },
        { title: "Ads", body: "Short mood-first lines about calmer evenings and softer light." },
        { title: "Banner ideas", body: "Nightstand scenes, soft bookshelves, and warm evening corners." }
      ]
    },
    {
      id: "pebble-lunch-kit",
      productName: "Pebble Lunch Kit",
      summary: "Compact lunch set with stackable boxes and a leak-safe sauce pot.",
      artTone: "mint",
      status: "ready",
      statusLabel: "Ready",
      visibility: "public",
      visibilityLabel: "Public",
      authorId: "noah-hale",
      authorName: "Noah Hale",
      createdAt: toTimestamp("2026-04-05T13:15:00"),
      languageLabel: "English",
      targetLabel: "Shopify",
      updatedLabel: "",
      tags: ["Description", "FAQ", "Banner"],
      sections: [
        { title: "Title", body: "Pebble Lunch Kit" },
        { title: "Benefits", body: "Compact stacking, clean carrying, and easy lunch prep for daily routines." },
        { title: "Description", body: "A tidy lunch kit with stackable containers and a sealed sauce pot for daily carry." },
        { title: "SEO", body: "Stackable lunch box set with leak-safe sauce pot and easy daily carry." },
        { title: "Translations", body: "English base copy is ready for the next localization pass." },
        { title: "Platform versions", body: "Prepared for marketplace titles, bullets, and shorter mobile text." },
        { title: "Review replies", body: "Includes replies around size, lids, washing, and sauce storage." },
        { title: "FAQ", body: "Answers cover capacity, microwave use, dishwasher care, and seal fit." },
        { title: "Ads", body: "Short ads around tidy lunches, simple prep, and bag-friendly carry." },
        { title: "Banner ideas", body: "Desk lunch scenes, picnic carry shots, and bright kitchen tabletops." }
      ]
    }
  ],
  ru: [
    {
      id: "glowcup",
      productName: "GlowCup",
      summary: "Термобутылка с заварником для чая и крышкой без протекания.",
      artTone: "sun",
      status: "updated",
      statusLabel: "Обновлён",
      visibility: "public",
      visibilityLabel: "Публичный",
      authorId: "mila-rowan",
      authorName: "Мила Роуэн",
      createdAt: toTimestamp("2026-04-11T18:45:00"),
      languageLabel: "Английский",
      targetLabel: "Сайт",
      updatedLabel: "",
      tags: ["SEO", "FAQ", "Объявления"],
      sections: [
        { title: "Заголовок", body: "GlowCup для чая" },
        { title: "Преимущества", body: "Держит тепло, удобно брать с собой и легко мыть после дня в дороге." },
        { title: "Описание", body: "Аккуратная термобутылка с встроенным заварником для спокойных чаепитий в любом месте." },
        { title: "SEO", body: "Термобутылка с заварником, крышкой без протекания и удобным уходом." },
        { title: "Переводы", body: "Уже подготовлены английская, русская, немецкая и испанская версии." },
        { title: "Версии для площадок", body: "Есть текст для сайта, маркетплейсов и коротких социальных форматов." },
        { title: "Ответы на отзывы", body: "Подготовлены тёплые ответы про объём, уход, герметичность и температуру." },
        { title: "FAQ", body: "Есть ответы про материалы, заварник, мытьё и использование с горячими напитками." },
        { title: "Объявления", body: "Короткие рекламные тексты вокруг ритуала чая и спокойных поездок." },
        { title: "Идеи для баннеров", body: "Мягкие сцены для рабочего стола, прогулки и спокойного утра." }
      ]
    },
    {
      id: "luma-pet-brush",
      productName: "Luma Pet Brush",
      summary: "Мягкая силиконовая щётка, которая собирает лишнюю шерсть без резких движений.",
      artTone: "mint",
      status: "ready",
      statusLabel: "Готов",
      visibility: "public",
      visibilityLabel: "Публичный",
      authorId: "theo-march",
      authorName: "Артём Лебедев",
      createdAt: toTimestamp("2026-04-11T12:20:00"),
      languageLabel: "Русский",
      targetLabel: "Wildberries",
      updatedLabel: "",
      tags: ["Ответы", "Описание", "Баннер"],
      sections: [
        { title: "Заголовок", body: "Luma Pet Brush для кошек и собак" },
        { title: "Преимущества", body: "Мягкое касание, простой уход и меньше шерсти на одежде и мебели." },
        { title: "Описание", body: "Лёгкая силиконовая щётка для спокойного ухода за шерстью дома." },
        { title: "SEO", body: "Силиконовая щётка для питомцев, мягкий груминг и лёгкое мытьё." },
        { title: "Переводы", body: "Подготовлена русская карточка с поддержкой английской версии." },
        { title: "Версии для площадок", body: "Есть короткий заголовок, буллеты и текст под маркетплейс." },
        { title: "Ответы на отзывы", body: "Подготовлены ответы про размер, мягкость, вычёсывание и удобство." },
        { title: "FAQ", body: "Собраны ответы про тип шерсти, уход за щёткой и частоту использования." },
        { title: "Объявления", body: "Есть короткие объявления про спокойный груминг и меньше шерсти вокруг." },
        { title: "Идеи для баннеров", body: "Крупные планы ухода за питомцем в мягких домашних сценах." }
      ]
    },
    {
      id: "mistloop",
      productName: "MistLoop Diffuser",
      summary: "Тихий аромадиффузор с мягкой подсветкой для спальни.",
      artTone: "sky",
      status: "draft",
      statusLabel: "Черновик",
      visibility: "public",
      visibilityLabel: "Публичный",
      authorId: "ada-soren",
      authorName: "Ника Воронова",
      createdAt: toTimestamp("2026-04-10T22:40:00"),
      languageLabel: "Английский",
      targetLabel: "Ozon",
      updatedLabel: "",
      tags: ["Заголовок", "Преимущества", "FAQ"],
      sections: [
        { title: "Заголовок", body: "MistLoop Quiet Diffuser" },
        { title: "Преимущества", body: "Тихая работа, мягкий свет и простой вечерний ритуал." },
        { title: "Описание", body: "Диффузор для спокойных комнат, мягкого света и лёгкого ежедневного ухода." },
        { title: "SEO", body: "Тихий аромадиффузор с подсветкой и простой системой долива воды." },
        { title: "Переводы", body: "Английская база готова для следующего перевода." },
        { title: "Версии для площадок", body: "Есть короткие буллеты под Ozon и компактные мобильные версии." },
        { title: "Ответы на отзывы", body: "Заготовлены ответы про шум, силу пара и уход." },
        { title: "FAQ", body: "Есть ответы про объём воды, автоотключение, масла и режимы света." },
        { title: "Объявления", body: "Короткие тексты вокруг спокойного вечера и мягкого сна." },
        { title: "Идеи для баннеров", body: "Ночной столик, мягкое свечение и спокойные текстильные сцены." }
      ]
    },
    {
      id: "softnest-wrap",
      productName: "SoftNest Baby Wrap",
      summary: "Эластичный слинг для близкого ношения и мягкой ежедневной посадки.",
      artTone: "rose",
      status: "ready",
      statusLabel: "Готов",
      visibility: "public",
      visibilityLabel: "Публичный",
      authorId: "lina-north",
      authorName: "Ева Север",
      createdAt: toTimestamp("2026-04-09T16:10:00"),
      languageLabel: "Немецкий",
      targetLabel: "Сайт",
      updatedLabel: "",
      tags: ["Переводы", "FAQ", "Объявления"],
      sections: [
        { title: "Заголовок", body: "SoftNest Baby Wrap" },
        { title: "Преимущества", body: "Близкое ношение, мягкая ткань и понятная посадка для новых родителей." },
        { title: "Описание", body: "Мягкий слинг, который делает ежедневное ношение спокойнее и легче." },
        { title: "SEO", body: "Эластичный слинг для новорождённых, мягкая ткань и удобная регулировка." },
        { title: "Переводы", body: "Немецкая версия уже готова вместе с английской базой." },
        { title: "Версии для площадок", body: "Есть текст для сайта, короткие промо и блок с уходом." },
        { title: "Ответы на отзывы", body: "Подготовлены ответы про размер, возраст, уход и удобство посадки." },
        { title: "FAQ", body: "Собраны ответы про ткань, диапазон размеров и ежедневное использование." },
        { title: "Объявления", body: "Тёплые рекламные тексты про близость, комфорт и мягкий ритм дня." },
        { title: "Идеи для баннеров", body: "Домашний свет, спокойные сцены и мягкие родительские моменты." }
      ]
    },
    {
      id: "nori-lamp",
      productName: "Nori Lamp",
      summary: "Небольшая лампа с мягким диммером и тёплым вечерним светом.",
      artTone: "sky",
      status: "updated",
      statusLabel: "Обновлён",
      visibility: "public",
      visibilityLabel: "Публичный",
      authorId: "keira-vale",
      authorName: "Лев Миронов",
      createdAt: toTimestamp("2026-04-07T19:25:00"),
      languageLabel: "Испанский",
      targetLabel: "VK",
      updatedLabel: "",
      tags: ["Объявления", "SEO", "Ответы"],
      sections: [
        { title: "Заголовок", body: "Nori Lamp с мягкой регулировкой света" },
        { title: "Преимущества", body: "Тёплое свечение, спокойный ритм вечера и простая регулировка яркости." },
        { title: "Описание", body: "Небольшая лампа для полки, стола и мягкого света перед сном." },
        { title: "SEO", body: "Настольная лампа с тёплым светом, диммером и спокойной вечерней атмосферой." },
        { title: "Переводы", body: "Готовы испанская и английская версии." },
        { title: "Версии для площадок", body: "Есть короткие социальные версии и длинный текст для карточки." },
        { title: "Ответы на отзывы", body: "Подготовлены ответы про яркость, кабель, переключатель и размер комнаты." },
        { title: "FAQ", body: "Есть ответы про лампу, материалы, уход и работу диммера." },
        { title: "Объявления", body: "Короткие тексты про мягкий свет и спокойный вечер." },
        { title: "Идеи для баннеров", body: "Тумбочка, книжная полка и тёплые вечерние углы комнаты." }
      ]
    },
    {
      id: "pebble-lunch-kit",
      productName: "Pebble Lunch Kit",
      summary: "Компактный ланч-набор со стопкой контейнеров и баночкой для соуса.",
      artTone: "mint",
      status: "ready",
      statusLabel: "Готов",
      visibility: "public",
      visibilityLabel: "Публичный",
      authorId: "noah-hale",
      authorName: "Яна Белова",
      createdAt: toTimestamp("2026-04-05T13:15:00"),
      languageLabel: "Английский",
      targetLabel: "Telegram",
      updatedLabel: "",
      tags: ["Описание", "FAQ", "Баннер"],
      sections: [
        { title: "Заголовок", body: "Pebble Lunch Kit" },
        { title: "Преимущества", body: "Компактная стопка, чистая переноска и понятный ежедневный формат." },
        { title: "Описание", body: "Аккуратный ланч-набор с контейнерами и герметичной баночкой для соуса." },
        { title: "SEO", body: "Ланч-бокс с контейнерами, баночкой для соуса и удобной ежедневной переноской." },
        { title: "Переводы", body: "Английская база уже готова для следующего перевода." },
        { title: "Версии для площадок", body: "Есть маркетплейс-заголовок, буллеты и короткие мобильные версии." },
        { title: "Ответы на отзывы", body: "Подготовлены ответы про объём, крышки, мытьё и хранение соуса." },
        { title: "FAQ", body: "Есть ответы про вместимость, микроволновку, посудомойку и герметичность." },
        { title: "Объявления", body: "Короткие тексты про аккуратный обед и удобный формат на каждый день." },
        { title: "Идеи для баннеров", body: "Рабочий стол, кухня и яркие сцены дневного перекуса." }
      ]
    }
  ]
};

export function getPackLibrary(locale: Locale): PackRecord[] {
  return packLibrary[locale];
}

export function getPackById(locale: Locale, id: string): PackRecord | undefined {
  return packLibrary[locale].find((pack) => pack.id === id);
}
