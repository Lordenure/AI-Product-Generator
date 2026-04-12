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

import { getAuthConfig, type AuthMode } from "@/content/auth";
import { getCopy } from "@/content/copy";
import { getDefaultAvatarTone, type AvatarTone } from "@/features/account/avatar";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

import { AuthModal } from "./AuthModal";
import {
  AuthApiError,
  getCurrentUser,
  loginAuth,
  logoutAuth,
  refreshAuth,
  registerAuth,
  resolveApiUrl,
  updateCurrentUserProfile,
  type AuthApiResponse,
  type AuthApiUser
} from "./authApi";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  secondaryLabel: string;
  providerId: "email";
  contour: Locale;
  avatarTone: AvatarTone;
  avatarImage: string | null;
  coverImage: string | null;
};

type StoredAuthSession = {
  userId: string;
  accessToken: string;
  refreshToken: string;
  contour: Locale;
};

type OpenAuthOptions = {
  locale: Locale;
  redirectTo?: string;
  mode?: AuthMode;
};

type UpdateProfileInput = {
  name: string;
  avatarFile: File | null;
  removeAvatar: boolean;
  coverFile: File | null;
  removeCover: boolean;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isReady: boolean;
  openAuth: (options: OpenAuthOptions) => void;
  closeAuth: () => void;
  setMode: (mode: AuthMode) => void;
  updateProfile: (input: UpdateProfileInput) => Promise<void>;
  signOut: () => Promise<void>;
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
  const [session, setSession] = useState<StoredAuthSession | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    locale: "en",
    mode: "sign-in",
    redirectTo: null
  });

  useEffect(() => {
    let isActive = true;

    async function restoreSession() {
      const storedSession = readStoredSession();

      if (!storedSession) {
        if (isActive) {
          setIsReady(true);
        }

        return;
      }

      const restoredAuth = await restoreAuthSession(storedSession);

      if (!isActive) {
        return;
      }

      if (!restoredAuth) {
        persistSession(null);
        setSession(null);
        setUser(null);
        setIsReady(true);
        return;
      }

      persistSession(restoredAuth.session);
      setSession(restoredAuth.session);
      setUser(restoredAuth.user);
      setIsReady(true);
    }

    void restoreSession();

    return () => {
      isActive = false;
    };
  }, []);

  const closeAuth = useCallback(() => {
    setAuthError(null);
    setModalState((current) => ({ ...current, isOpen: false }));
  }, []);

  const openAuth = useCallback(({ locale, redirectTo, mode = "sign-in" }: OpenAuthOptions) => {
    setAuthError(null);
    setModalState({
      isOpen: true,
      locale,
      mode,
      redirectTo: redirectTo ?? getLocalizedPath(locale, "/studio")
    });
  }, []);

  const setMode = useCallback((mode: AuthMode) => {
    setAuthError(null);
    setModalState((current) => ({ ...current, mode }));
  }, []);

  const finishAuth = useCallback(
    (response: AuthApiResponse, locale: Locale) => {
      const redirectTo = modalState.redirectTo ?? getLocalizedPath(locale, "/studio");
      const nextSession = createStoredSession(response, locale);
      const nextUser = toAuthUser(response.user, nextSession);

      persistSession(nextSession);
      setSession(nextSession);
      setUser(nextUser);
      setAuthError(null);
      setModalState((current) => ({ ...current, isOpen: false }));
      router.push(redirectTo);
    },
    [modalState.redirectTo, router]
  );

  const handleEmailAuth = useCallback(
    async ({
      locale,
      mode,
      name,
      email,
      password
    }: {
      locale: Locale;
      mode: AuthMode;
      name: string;
      email: string;
      password: string;
    }) => {
      if (isSubmitting) {
        return;
      }

      setIsSubmitting(true);
      setAuthError(null);

      try {
        const response =
          mode === "create-account"
            ? await registerAuth({
                email: email.trim(),
                password,
                displayName: name.trim()
              })
            : await loginAuth({
                email: email.trim(),
                password
              });

        finishAuth(response, locale);
      } catch (error) {
        setAuthError(resolveAuthErrorMessage(error, locale, mode));
      } finally {
        setIsSubmitting(false);
      }
    },
    [finishAuth, isSubmitting]
  );

  const updateProfile = useCallback(
    async (input: UpdateProfileInput) => {
      if (!session) {
        throw new Error(getCopy("en").studio.accountSaveErrorLabel);
      }

      try {
        const updatedUser = await updateCurrentUserProfile({
          accessToken: session.accessToken,
          displayName: input.name.trim(),
          avatarFile: input.avatarFile,
          removeAvatar: input.removeAvatar,
          coverFile: input.coverFile,
          removeCover: input.removeCover
        });

        const nextSession = {
          ...session,
          userId: updatedUser.id
        };

        persistSession(nextSession);
        setSession(nextSession);
        setUser(toAuthUser(updatedUser, nextSession));
      } catch (error) {
        throw new Error(resolveProfileErrorMessage(error, user?.contour ?? session.contour));
      }
    },
    [session, user?.contour]
  );

  const signOut = useCallback(async () => {
    const refreshToken = session?.refreshToken ?? null;

    persistSession(null);
    setSession(null);
    setUser(null);
    setAuthError(null);

    if (!refreshToken) {
      return;
    }

    try {
      await logoutAuth({ refreshToken });
    } catch {
    }
  }, [session?.refreshToken]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isReady,
      openAuth,
      closeAuth,
      setMode,
      updateProfile,
      signOut
    }),
    [closeAuth, isReady, openAuth, setMode, signOut, updateProfile, user]
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
        errorMessage={authError}
        isSubmitting={isSubmitting}
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

async function restoreAuthSession(
  storedSession: StoredAuthSession
): Promise<{ session: StoredAuthSession; user: AuthUser } | null> {
  try {
    const currentUser = await getCurrentUser(storedSession.accessToken);

    return {
      session: storedSession,
      user: toAuthUser(currentUser, storedSession)
    };
  } catch (error) {
    if (!(error instanceof AuthApiError) || error.status !== 401) {
      return null;
    }
  }

  try {
    const refreshedAuth = await refreshAuth({ refreshToken: storedSession.refreshToken });
    const nextSession = createStoredSession(refreshedAuth, storedSession.contour);

    return {
      session: nextSession,
      user: toAuthUser(refreshedAuth.user, nextSession)
    };
  } catch {
    return null;
  }
}

function createStoredSession(response: AuthApiResponse, contour: Locale): StoredAuthSession {
  return {
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
    userId: response.user.id,
    contour
  };
}

function toAuthUser(user: AuthApiUser, session: StoredAuthSession): AuthUser {
  return {
    id: user.id,
    email: user.email,
    name: user.displayName,
    secondaryLabel: user.email,
    providerId: "email",
    contour: session.contour,
    avatarTone: getDefaultAvatarTone(user.id),
    avatarImage: resolveApiUrl(user.avatarUrl),
    coverImage: resolveApiUrl(user.coverImageUrl)
  };
}

function readStoredSession(): StoredAuthSession | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<StoredAuthSession>;

    if (!isStoredAuthSession(parsed)) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return {
      userId: parsed.userId,
      accessToken: parsed.accessToken,
      refreshToken: parsed.refreshToken,
      contour: parsed.contour === "ru" ? "ru" : "en"
    };
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

function persistSession(session: StoredAuthSession | null) {
  if (!session) {
    window.localStorage.removeItem(STORAGE_KEY);
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function resolveAuthErrorMessage(error: unknown, locale: Locale, mode: AuthMode) {
  const auth = getAuthConfig(locale);

  if (error instanceof AuthApiError) {
    if (error.validationErrors.length > 0) {
      return error.validationErrors[0];
    }

    if (error.status === 401) {
      return auth.invalidCredentialsError;
    }

    if (error.status === 409 && mode === "create-account") {
      return auth.emailTakenError;
    }

    return error.detail ?? auth.genericError;
  }

  if (error instanceof Error && error.message === "Network request failed.") {
    return auth.backendUnavailableError;
  }

  return auth.genericError;
}

function resolveProfileErrorMessage(error: unknown, locale: Locale) {
  const copy = getCopy(locale).studio;

  if (error instanceof AuthApiError) {
    if (error.validationErrors.length > 0) {
      return error.validationErrors[0];
    }

    return error.detail ?? copy.accountSaveErrorLabel;
  }

  if (error instanceof Error && error.message === "Network request failed.") {
    return copy.accountSaveUnavailableLabel;
  }

  return copy.accountSaveErrorLabel;
}

function isStoredAuthSession(value: Partial<StoredAuthSession> | null | undefined): value is StoredAuthSession {
  return typeof value?.userId === "string" && value.userId.length > 0 &&
    typeof value.accessToken === "string" && value.accessToken.length > 0 &&
    typeof value.refreshToken === "string" && value.refreshToken.length > 0;
}
