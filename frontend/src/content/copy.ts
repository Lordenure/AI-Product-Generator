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
  plansTitle: string;
  plansText: string;
};

type StudioCopy = {
  sidebarHomeLabel: string;
  sidebarCreateLabel: string;
  sidebarPacksLabel: string;
  sidebarUpgradeLabel: string;
  sidebarProfileRole: string;
  sidebarProfileName: string;
  createEyebrow: string;
  createTitle: string;
  createFirstTitle: string;
  productNameLabel: string;
  productNamePlaceholder: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  benefitsLabel: string;
  benefitsPlaceholder: string;
  benefitsHint: string;
  targetLanguageLabel: string;
  platformLabel: string;
  visibilityLabel: string;
  visibilityPrivate: string;
  visibilityPublic: string;
  createButton: string;
  createFirstButton: string;
  createLoading: string;
  createReady: string;
  createLoadingNote: string;
  createReadyNote: string;
  createNameError: string;
  createLimitError: string;
  packsPageTitle: string;
  packsTabLibrary: string;
  packsTabCommunity: string;
  packsTitle: string;
  packsText: string;
  packsEmptyTitle: string;
  packsEmpty: string;
  packsLibraryEmptyTitle: string;
  packsLibraryEmptyText: string;
  packsLibraryEmptyAction: string;
  packsCommunityEmptyTitle: string;
  packsCommunityEmptyText: string;
  openPack: string;
  deleteLabel: string;
  deleteTitle: string;
  deleteText: string;
  deleteCancel: string;
  deleteConfirm: string;
  detailBack: string;
  detailLabel: string;
  detailText: string;
  detailGalleryTitle: string;
  detailGalleryText: string;
  detailPrimaryTitle: string;
  detailSecondaryTitle: string;
  copyLabel: string;
  copyAllLabel: string;
  copiedLabel: string;
  galleryPreviousLabel: string;
  galleryNextLabel: string;
  creditsTitle: string;
  creditsLeftLabel: string;
  packsLeftLabel: string;
  fullPackCostValue: string;
  plansModalTitle: string;
  planCurrentLabel: string;
  planCurrentAction: string;
  planChooseAction: string;
  accountMenuPlanLabel: string;
  accountMenuProfile: string;
  accountMenuAccount: string;
  accountMenuLogout: string;
  accountSettingsTitle: string;
  accountNameLabel: string;
  accountAvatarLabel: string;
  accountImageChooseLabel: string;
  accountImageChangeLabel: string;
  accountImageRemoveLabel: string;
  accountCoverLabel: string;
  accountCoverChooseLabel: string;
  accountCoverChangeLabel: string;
  accountCoverRemoveLabel: string;
  accountSaveLabel: string;
  accountCancelLabel: string;
  logoutTitle: string;
  logoutText: string;
  logoutCancel: string;
  logoutConfirm: string;
  profilePacksTitle: string;
  profileEmptyTitle: string;
  profileEmptyText: string;
  profileSettingsLabel: string;
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
      plansText: "Start simple, then step up when you want more room to create."
    },
    studio: {
      sidebarHomeLabel: "Home",
      sidebarCreateLabel: "Create",
      sidebarPacksLabel: "Packs",
      sidebarUpgradeLabel: "Upgrade",
      sidebarProfileRole: "Creator",
      sidebarProfileName: "Lordenure",
      createEyebrow: "Create",
      createTitle: "New full pack",
      createFirstTitle: "Start with one product",
      productNameLabel: "Product name",
      productNamePlaceholder: "Example: GlowCup",
      descriptionLabel: "Short description",
      descriptionPlaceholder: "Example: Insulated bottle with a tea infuser and a leak-safe lid.",
      benefitsLabel: "Key benefits",
      benefitsPlaceholder: "Example: Keeps tea hot, easy to carry, easy to clean",
      benefitsHint: "Optional",
      targetLanguageLabel: "Language",
      platformLabel: "Use on",
      visibilityLabel: "Visibility",
      visibilityPrivate: "Private",
      visibilityPublic: "Public",
      createButton: "✨ Create full pack",
      createFirstButton: "✨ Create first pack",
      createLoading: "Creating pack...",
      createReady: "Pack ready",
      createLoadingNote: "Making the full pack.",
      createReadyNote: "Opening pack.",
      createNameError: "Add a product name first.",
      createLimitError: "Your pack list is full. Delete one or upgrade.",
      packsPageTitle: "Packs",
      packsTabLibrary: "Library",
      packsTabCommunity: "Community",
      packsTitle: "Latest packs",
      packsText: "Open any pack.",
      packsEmptyTitle: "No packs yet",
      packsEmpty: "Your first one lands here.",
      packsLibraryEmptyTitle: "No packs yet",
      packsLibraryEmptyText: "Create your first pack.",
      packsLibraryEmptyAction: "Open create",
      packsCommunityEmptyTitle: "Nothing public yet",
      packsCommunityEmptyText: "Public packs will appear here.",
      openPack: "Open pack",
      deleteLabel: "Delete",
      deleteTitle: "Delete this pack?",
      deleteText: "This will remove it from your studio.",
      deleteCancel: "Cancel",
      deleteConfirm: "Delete",
      detailBack: "Back to packs",
      detailLabel: "Generated pack",
      detailText: "Ready to use, copy, and adapt.",
      detailGalleryTitle: "Image gallery",
      detailGalleryText: "A few polished visuals for this product pack.",
      detailPrimaryTitle: "Main copy",
      detailSecondaryTitle: "More outputs",
      copyLabel: "Copy",
      copyAllLabel: "Copy all",
      copiedLabel: "Copied",
      galleryPreviousLabel: "Previous image",
      galleryNextLabel: "Next image",
      creditsTitle: "Credits",
      creditsLeftLabel: "credits",
      packsLeftLabel: "packs left",
      fullPackCostValue: "12 per pack",
      plansModalTitle: "Plans",
      planCurrentLabel: "Current",
      planCurrentAction: "Current plan",
      planChooseAction: "Choose",
      accountMenuPlanLabel: "Plan",
      accountMenuProfile: "Profile",
      accountMenuAccount: "Account",
      accountMenuLogout: "Log out",
      accountSettingsTitle: "Account",
      accountNameLabel: "Nickname",
      accountAvatarLabel: "Avatar",
      accountImageChooseLabel: "Choose image",
      accountImageChangeLabel: "Change image",
      accountImageRemoveLabel: "Remove",
      accountCoverLabel: "Cover",
      accountCoverChooseLabel: "Choose cover",
      accountCoverChangeLabel: "Change cover",
      accountCoverRemoveLabel: "Remove",
      accountSaveLabel: "Save",
      accountCancelLabel: "Cancel",
      logoutTitle: "Log out?",
      logoutText: "You’ll leave the studio for now.",
      logoutCancel: "Cancel",
      logoutConfirm: "Log out",
      profilePacksTitle: "Public packs",
      profileEmptyTitle: "No public packs yet",
      profileEmptyText: "Public packs will appear here.",
      profileSettingsLabel: "Edit profile",
      languages: [
        { id: "en", label: "English" },
        { id: "ru", label: "Russian" },
        { id: "de", label: "German" },
        { id: "es", label: "Spanish" }
      ],
      platforms: [
        { id: "site", label: "Website" },
        { id: "amazon", label: "Amazon" },
        { id: "shopify", label: "Shopify" },
        { id: "instagram", label: "Instagram" },
        { id: "tiktok", label: "TikTok" }
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
      plansText: "Начните просто, а потом переходите выше, когда захочется больше свободы для создания."
    },
    studio: {
      sidebarHomeLabel: "Главная",
      sidebarCreateLabel: "Создать",
      sidebarPacksLabel: "Паки",
      sidebarUpgradeLabel: "Улучшить",
      sidebarProfileRole: "Создатель",
      sidebarProfileName: "Lordenure",
      createEyebrow: "Создать",
      createTitle: "Новый полный пак",
      createFirstTitle: "Начните создавать",
      productNameLabel: "Название товара",
      productNamePlaceholder: "Пример: GlowCup",
      descriptionLabel: "Короткое описание",
      descriptionPlaceholder: "Пример: Термобутылка с заварником для чая и крышкой без протекания.",
      benefitsLabel: "Ключевые преимущества",
      benefitsPlaceholder: "Пример: Держит тепло, удобно брать с собой, легко мыть",
      benefitsHint: "Необязательно",
      targetLanguageLabel: "Язык",
      platformLabel: "Где использовать",
      visibilityLabel: "Видимость",
      visibilityPrivate: "Приватный",
      visibilityPublic: "Публичный",
      createButton: "✨ Создать",
      createFirstButton: "✨ Создать",
      createLoading: "Собираем пак...",
      createReady: "Пак готов",
      createLoadingNote: "Собираем полный пак.",
      createReadyNote: "Открываем пак.",
      createNameError: "Сначала добавьте название товара.",
      createLimitError: "Список паков заполнен. Удалите один или улучшите план.",
      packsPageTitle: "Паки",
      packsTabLibrary: "Библиотека",
      packsTabCommunity: "Сообщество",
      packsTitle: "Последние паки",
      packsText: "Откройте любой пак.",
      packsEmptyTitle: "Паков пока нет",
      packsEmpty: "Первый появится здесь.",
      packsLibraryEmptyTitle: "Паков пока нет",
      packsLibraryEmptyText: "Соберите первый пак.",
      packsLibraryEmptyAction: "Открыть создание",
      packsCommunityEmptyTitle: "Публичных паков пока нет",
      packsCommunityEmptyText: "Они появятся здесь позже.",
      openPack: "Открыть пак",
      deleteLabel: "Удалить",
      deleteTitle: "Удалить этот пак?",
      deleteText: "Он исчезнет из вашей студии.",
      deleteCancel: "Отмена",
      deleteConfirm: "Удалить",
      detailBack: "Назад к пакам",
      detailLabel: "Собранный пак",
      detailText: "Готово к использованию, копированию и доработке.",
      detailGalleryTitle: "Галерея изображений",
      detailGalleryText: "Несколько аккуратных визуалов для этого пака.",
      detailPrimaryTitle: "Основной текст",
      detailSecondaryTitle: "Ещё материалы",
      copyLabel: "Копировать",
      copyAllLabel: "Копировать всё",
      copiedLabel: "Скопировано",
      galleryPreviousLabel: "Предыдущее изображение",
      galleryNextLabel: "Следующее изображение",
      creditsTitle: "Кредиты",
      creditsLeftLabel: "кредитов",
      packsLeftLabel: "паков осталось",
      fullPackCostValue: "12 за пак",
      plansModalTitle: "Тарифы",
      planCurrentLabel: "Текущий",
      planCurrentAction: "Текущий план",
      planChooseAction: "Выбрать",
      accountMenuPlanLabel: "Тариф",
      accountMenuProfile: "Профиль",
      accountMenuAccount: "Аккаунт",
      accountMenuLogout: "Выйти",
      accountSettingsTitle: "Аккаунт",
      accountNameLabel: "Никнейм",
      accountAvatarLabel: "Аватар",
      accountImageChooseLabel: "Выбрать фото",
      accountImageChangeLabel: "Сменить фото",
      accountImageRemoveLabel: "Убрать",
      accountCoverLabel: "Обложка",
      accountCoverChooseLabel: "Выбрать обложку",
      accountCoverChangeLabel: "Сменить обложку",
      accountCoverRemoveLabel: "Убрать",
      accountSaveLabel: "Сохранить",
      accountCancelLabel: "Отмена",
      logoutTitle: "Выйти?",
      logoutText: "Студия закроется для этого аккаунта.",
      logoutCancel: "Отмена",
      logoutConfirm: "Выйти",
      profilePacksTitle: "Публичные паки",
      profileEmptyTitle: "Публичных паков пока нет",
      profileEmptyText: "Они появятся здесь.",
      profileSettingsLabel: "Настроить профиль",
      languages: [
        { id: "en", label: "Английский" },
        { id: "ru", label: "Русский" },
        { id: "de", label: "Немецкий" },
        { id: "es", label: "Испанский" }
      ],
      platforms: [
        { id: "site", label: "Сайт" },
        { id: "wildberries", label: "Wildberries" },
        { id: "ozon", label: "Ozon" },
        { id: "telegram", label: "Telegram" },
        { id: "vk", label: "VK" }
      ]
    }
  }
};

export function getCopy(locale: Locale): SiteCopy {
  return siteCopy[locale];
}
