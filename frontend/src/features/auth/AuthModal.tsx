"use client";

import { useEffect, useState } from "react";

import { getAuthConfig, type AuthMode, type AuthProviderId } from "@/content/auth";
import type { Locale } from "@/lib/i18n";

import styles from "./AuthModal.module.css";

type AuthModalProps = {
  isOpen: boolean;
  locale: Locale;
  mode: AuthMode;
  onClose: () => void;
  onModeChange: (mode: AuthMode) => void;
  onProviderAuth: (providerId: Exclude<AuthProviderId, "email">, locale: Locale) => void;
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
  onProviderAuth,
  onEmailAuth
}: AuthModalProps) {
  const auth = getAuthConfig(locale);
  const [useEmail, setUseEmail] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setUseEmail(false);
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

        {!useEmail ? (
          <div className={styles.providers}>
            {providerOptions.map((provider) => (
              <button
                key={provider.id}
                type="button"
                className={styles.providerButton}
                data-tone={provider.tone}
                onClick={() => onProviderAuth(provider.id, locale)}
              >
                <span className={styles.providerMark} aria-hidden="true" />
                <span>{provider.actionLabel}</span>
              </button>
            ))}

            <button type="button" className={styles.ghostButton} onClick={() => setUseEmail(true)}>
              {auth.continueWithEmail}
            </button>
          </div>
        ) : (
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

            <button type="submit" className={styles.submitButton}>
              {auth.submit[mode]}
            </button>

            <button type="button" className={styles.ghostButton} onClick={() => setUseEmail(false)}>
              {auth.otherOptions}
            </button>
          </form>
        )}

        <div className={styles.switchRow}>
          <span>{auth.switchPrompt[mode]}</span>
          <button
            type="button"
            className={styles.switchButton}
            onClick={() => onModeChange(mode === "sign-in" ? "create-account" : "sign-in")}
          >
            {auth.switchAction[mode]}
          </button>
        </div>
      </section>
    </div>
  );
}
