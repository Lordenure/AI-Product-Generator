"use client";

import { useEffect, useState } from "react";

import { getAuthConfig, type AuthMode, type AuthProviderId } from "@/content/auth";
import type { Locale } from "@/lib/i18n";

import { AuthProviderIcon } from "./AuthProviderIcon";
import styles from "./AuthModal.module.css";

type AuthModalProps = {
  isOpen: boolean;
  locale: Locale;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
  errorMessage: string | null;
  isSubmitting: boolean;
  onEmailAuth: (input: {
    locale: Locale;
    mode: AuthMode;
    name: string;
    email: string;
    password: string;
  }) => void;
};

export function AuthModal({
  isOpen,
  locale,
  mode,
  onClose,
  onModeChange,
  errorMessage,
  isSubmitting,
  onEmailAuth
}: AuthModalProps) {
  const auth = getAuthConfig(locale);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setName("");
    setEmail("");
    setPassword("");
  }, [isOpen, locale, mode]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const providerOptions = auth.providers.filter(
    (provider): provider is (typeof auth.providers)[number] & { id: Exclude<AuthProviderId, "email"> } =>
      provider.id !== "email"
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onEmailAuth({
      locale,
      mode,
      name,
      email,
      password
    });
  }

  return (
    <div className={styles.backdrop} onMouseDown={(event) => (event.target === event.currentTarget ? onClose() : null)}>
      <section className={styles.sheet} role="dialog" aria-modal="true" aria-labelledby="auth-title">
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.mark} aria-hidden="true" />
            <h2 id="auth-title" className={styles.title}>
              {auth.title[mode]}
            </h2>
          </div>

          <button type="button" className={styles.close} aria-label={auth.closeLabel} onClick={onClose}>
            <span className={styles.closeLine} aria-hidden="true" />
          </button>
        </div>

        <div className={styles.providers}>
          {providerOptions.map((provider) => (
            <button
              key={provider.id}
              type="button"
              className={styles.providerButton}
              data-tone={provider.tone}
              aria-label={provider.actionLabel}
              title={provider.actionLabel}
              disabled
            >
              <span className={styles.providerIconWrap} aria-hidden="true">
                <AuthProviderIcon providerId={provider.id} className={styles.providerIcon} />
              </span>
              <span className={styles.providerLabel}>{provider.shortLabel}</span>
              <span className={styles.providerStatus}>{auth.providerSoonLabel}</span>
            </button>
          ))}
        </div>

        <p className={`${styles.message} ${styles.messageNote}`.trim()}>{auth.emailOnlyNote}</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fields}>
            {mode === "create-account" ? (
              <label className={styles.field}>
                <span className={styles.label}>{auth.nameLabel}</span>
                <input
                  className={styles.input}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={auth.namePlaceholder}
                  autoComplete="name"
                />
              </label>
            ) : null}

            <label className={styles.field}>
              <span className={styles.label}>{auth.emailLabel}</span>
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={auth.emailPlaceholder}
                autoComplete="email"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>{auth.passwordLabel}</span>
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={auth.passwordPlaceholder}
                autoComplete={mode === "sign-in" ? "current-password" : "new-password"}
              />
            </label>
          </div>

          {errorMessage ? <p className={`${styles.message} ${styles.messageError}`.trim()}>{errorMessage}</p> : null}

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? auth.submitPending[mode] : auth.submit[mode]}
          </button>
        </form>

        <div className={styles.modeSwitch} role="group" aria-label={auth.title[mode]}>
          <button
            type="button"
            className={`${styles.modeButton} ${mode === "sign-in" ? styles.modeButtonActive : ""}`.trim()}
            onClick={() => onModeChange("sign-in")}
            aria-pressed={mode === "sign-in"}
          >
            {auth.title["sign-in"]}
          </button>
          <button
            type="button"
            className={`${styles.modeButton} ${mode === "create-account" ? styles.modeButtonActive : ""}`.trim()}
            onClick={() => onModeChange("create-account")}
            aria-pressed={mode === "create-account"}
          >
            {auth.title["create-account"]}
          </button>
        </div>
      </section>
    </div>
  );
}
