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
  gateTitle: string;
  gateText: string;
  gateSignIn: string;
  gateCreate: string;
  closeLabel: string;
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
    gateTitle: "Sign in to open your studio",
    gateText: "Packs, privacy, and credits stay in your account.",
    gateSignIn: "Sign in",
    gateCreate: "Create account",
    closeLabel: "Close",
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
    gateTitle: "Войдите, чтобы открыть студию",
    gateText: "Паки, видимость и кредиты хранятся в аккаунте.",
    gateSignIn: "Войти",
    gateCreate: "Создать аккаунт",
    closeLabel: "Закрыть",
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
