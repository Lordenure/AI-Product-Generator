import type { Locale } from "@/lib/i18n";

export type AuthMode = "sign-in" | "create-account";
export type AuthProviderId = "google" | "apple" | "facebook" | "yandex" | "vk" | "sber" | "email";

export type AuthProviderOption = {
  id: AuthProviderId;
  actionLabel: string;
  shortLabel: string;
  tone: "google" | "apple" | "facebook" | "yandex" | "vk" | "sber" | "email";
};

type AuthLocaleConfig = {
  title: Record<AuthMode, string>;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  submit: Record<AuthMode, string>;
  submitPending: Record<AuthMode, string>;
  gateTitle: string;
  gateText: string;
  gateSignIn: string;
  gateCreate: string;
  closeLabel: string;
  emailOnlyNote: string;
  providerSoonLabel: string;
  invalidCredentialsError: string;
  emailTakenError: string;
  genericError: string;
  backendUnavailableError: string;
  defaultProfileName: string;
  providers: AuthProviderOption[];
};

const authContent: Record<Locale, AuthLocaleConfig> = {
  en: {
    title: {
      "sign-in": "Sign in",
      "create-account": "Create account"
    },
    nameLabel: "Name",
    namePlaceholder: "Lordenure",
    emailLabel: "Email",
    emailPlaceholder: "name@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "Password",
    submit: {
      "sign-in": "Sign in",
      "create-account": "Create account"
    },
    submitPending: {
      "sign-in": "Signing in...",
      "create-account": "Creating account..."
    },
    gateTitle: "Sign in to open your studio",
    gateText: "Packs, privacy, and credits stay in your account.",
    gateSignIn: "Sign in",
    gateCreate: "Create account",
    closeLabel: "Close",
    emailOnlyNote: "Email auth is live. Social sign-in is coming soon.",
    providerSoonLabel: "Soon",
    invalidCredentialsError: "Use the email and password from a real TradeAI account.",
    emailTakenError: "An account with this email already exists.",
    genericError: "Sign-in could not be completed. Please try again.",
    backendUnavailableError: "TradeAI could not reach the auth server. Check that the backend is running.",
    defaultProfileName: "Lordenure",
    providers: [
      {
        id: "google",
        actionLabel: "Continue with Google",
        shortLabel: "Google",
        tone: "google"
      },
      {
        id: "apple",
        actionLabel: "Continue with Apple",
        shortLabel: "Apple",
        tone: "apple"
      },
      {
        id: "facebook",
        actionLabel: "Continue with Facebook",
        shortLabel: "Facebook",
        tone: "facebook"
      },
      {
        id: "email",
        actionLabel: "Continue with email",
        shortLabel: "Email",
        tone: "email"
      }
    ]
  },
  ru: {
    title: {
      "sign-in": "Войти",
      "create-account": "Создать аккаунт"
    },
    nameLabel: "Имя",
    namePlaceholder: "Ника Воронова",
    emailLabel: "Почта",
    emailPlaceholder: "name@example.com",
    passwordLabel: "Пароль",
    passwordPlaceholder: "Пароль",
    submit: {
      "sign-in": "Войти",
      "create-account": "Создать аккаунт"
    },
    submitPending: {
      "sign-in": "Входим...",
      "create-account": "Создаём аккаунт..."
    },
    gateTitle: "Войдите, чтобы открыть студию",
    gateText: "Паки, видимость и кредиты хранятся в аккаунте.",
    gateSignIn: "Войти",
    gateCreate: "Создать аккаунт",
    closeLabel: "Закрыть",
    emailOnlyNote: "Вход по почте уже работает. Социальные входы появятся позже.",
    providerSoonLabel: "Скоро",
    invalidCredentialsError: "Используйте почту и пароль от настоящего аккаунта TradeAI.",
    emailTakenError: "Аккаунт с такой почтой уже существует.",
    genericError: "Не удалось завершить вход. Попробуйте ещё раз.",
    backendUnavailableError: "TradeAI не смог подключиться к серверу авторизации. Проверьте, что backend запущен.",
    defaultProfileName: "Lordenure",
    providers: [
      {
        id: "yandex",
        actionLabel: "Продолжить с Yandex ID",
        shortLabel: "Yandex ID",
        tone: "yandex"
      },
      {
        id: "vk",
        actionLabel: "Продолжить с VK ID",
        shortLabel: "VK ID",
        tone: "vk"
      },
      {
        id: "sber",
        actionLabel: "Продолжить с Sber ID",
        shortLabel: "Sber ID",
        tone: "sber"
      },
      {
        id: "email",
        actionLabel: "Продолжить с почтой",
        shortLabel: "Почта",
        tone: "email"
      }
    ]
  }
};

export function getAuthConfig(locale: Locale): AuthLocaleConfig {
  return authContent[locale];
}
