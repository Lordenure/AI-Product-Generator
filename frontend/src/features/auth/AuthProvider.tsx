"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { useRouter } from "next/navigation";

import { getAuthConfig, type AuthMode, type AuthProviderId } from "@/content/auth";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

import { AuthModal } from "./AuthModal";

type AuthUser = {
  id: string;
  name: string;
  secondaryLabel: string;
  providerId: AuthProviderId;
  contour: Locale;
};

type OpenAuthOptions = {
  locale: Locale;
  redirectTo?: string;
  mode?: AuthMode;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isReady: boolean;
  openAuth: (options: OpenAuthOptions) => void;
  closeAuth: () => void;
  setMode: (mode: AuthMode) => void;
  signOut: () => void;
};

type ModalState = {
  isOpen: boolean;
  locale: Locale;
  mode: AuthMode;
  redirectTo: string | null;
};

const STORAGE_KEY = "tradeai.auth.session";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    locale: "en",
    mode: "sign-in",
    redirectTo: null
  });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);

      if (raw) {
        setUser(JSON.parse(raw) as AuthUser);
      }
    } catch {
      setUser(null);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!user) {
      window.localStorage.removeItem(STORAGE_KEY);
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [isReady, user]);

  const closeAuth = useCallback(() => {
    setModalState((current) => ({ ...current, isOpen: false }));
  }, []);

  const openAuth = useCallback(({ locale, redirectTo, mode = "sign-in" }: OpenAuthOptions) => {
    setModalState({
      isOpen: true,
      locale,
      mode,
      redirectTo: redirectTo ?? getLocalizedPath(locale, "/studio")
    });
  }, []);

  const setMode = useCallback((mode: AuthMode) => {
    setModalState((current) => ({ ...current, mode }));
  }, []);

  const finishAuth = useCallback(
    (nextUser: AuthUser, locale: Locale) => {
      const redirectTo = modalState.redirectTo ?? getLocalizedPath(locale, "/studio");

      setUser(nextUser);
      setModalState((current) => ({ ...current, isOpen: false }));
      router.push(redirectTo);
    },
    [modalState.redirectTo, router]
  );

  const handleProviderAuth = useCallback(
    (providerId: Exclude<AuthProviderId, "email">, locale: Locale) => {
      const auth = getAuthConfig(locale);
      const provider = auth.providers.find((option) => option.id === providerId);

      finishAuth(
        {
          id: `${providerId}-${locale}`,
          name: auth.defaultProfileName,
          secondaryLabel: provider?.shortLabel ?? "Account",
          providerId,
          contour: locale
        },
        locale
      );
    },
    [finishAuth]
  );

  const handleEmailAuth = useCallback(
    ({
      locale,
      mode,
      name,
      email
    }: {
      locale: Locale;
      mode: AuthMode;
      name: string;
      email: string;
      password: string;
    }) => {
      const normalizedEmail = email.trim() || "hello@tradeai.app";
      const nextName =
        mode === "create-account" && name.trim() ? name.trim() : getNameFromEmail(normalizedEmail, locale);

      finishAuth(
        {
          id: toSessionId(normalizedEmail),
          name: nextName,
          secondaryLabel: normalizedEmail,
          providerId: "email",
          contour: locale
        },
        locale
      );
    },
    [finishAuth]
  );

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isReady,
      openAuth,
      closeAuth,
      setMode,
      signOut
    }),
    [closeAuth, isReady, openAuth, setMode, signOut, user]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal
        isOpen={modalState.isOpen}
        locale={modalState.locale}
        mode={modalState.mode}
        onClose={closeAuth}
        onModeChange={setMode}
        onProviderAuth={handleProviderAuth}
        onEmailAuth={handleEmailAuth}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}

function getNameFromEmail(email: string, locale: Locale) {
  const source = email.split("@")[0]?.trim() ?? "";

  if (!source) {
    return locale === "ru" ? "Новый аккаунт" : "New account";
  }

  const parts = source
    .split(/[._-]+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return locale === "ru" ? "Новый аккаунт" : "New account";
  }

  return parts.map((part) => part[0].toUpperCase() + part.slice(1)).join(" ");
}

function toSessionId(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
