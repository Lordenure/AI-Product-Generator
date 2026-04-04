"use client";

import { useEffect, useRef, useState } from "react";

import { getCopy } from "@/content/copy";
import type { Locale } from "@/lib/i18n";

import { StudioAppShell } from "./StudioAppShell";
import { useStudioState } from "./StudioStateProvider";
import styles from "./StudioScreen.module.css";

type StudioScreenProps = {
  locale: Locale;
};

type StudioStatus = "idle" | "loading" | "ready" | "name-error" | "limit-error";

export function StudioScreen({ locale }: StudioScreenProps) {
  const copy = getCopy(locale);
  const { createPack, isStorageFull } = useStudioState(locale);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [benefits, setBenefits] = useState("");
  const [language, setLanguage] = useState(copy.studio.languages[0]?.id ?? "en");
  const [platform, setPlatform] = useState(copy.studio.platforms[0]?.id ?? "site");
  const [status, setStatus] = useState<StudioStatus>("idle");
  const timeoutRef = useRef<number | null>(null);
  const statusNote =
    status === "loading"
      ? copy.studio.createLoadingNote
      : status === "ready"
        ? copy.studio.createReadyNote
        : status === "name-error"
          ? copy.studio.createNameError
          : status === "limit-error"
            ? copy.studio.createLimitError
        : copy.studio.createHint;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isStorageFull && status === "limit-error") {
      setStatus("idle");
    }
  }, [isStorageFull, status]);

  function resetReadyState() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setStatus("idle");
  }

  function handleCreatePack() {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    if (!productName.trim()) {
      setStatus("name-error");
      return;
    }

    if (isStorageFull) {
      setStatus("limit-error");
      return;
    }

    setStatus("loading");
    timeoutRef.current = window.setTimeout(() => {
      const result = createPack({
        productName,
        description,
        benefits,
        languageId: language,
        platformId: platform
      });

      if (!result.ok) {
        setStatus(result.reason === "missing_name" ? "name-error" : "limit-error");
        return;
      }

      setStatus("ready");
    }, 900);
  }

  return (
    <StudioAppShell locale={locale} activeNav="create">
      <section className={styles.panel}>
        <div className={styles.panelIntro}>
          <span className={styles.kicker}>{copy.studio.createEyebrow}</span>
          <h1 className={styles.title}>{copy.studio.createTitle}</h1>
          <p className={styles.text}>{copy.studio.createText}</p>
        </div>

        <div className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="product-name" className={styles.label}>
              {copy.studio.productNameLabel}
            </label>
            <input
              id="product-name"
              name="productName"
              type="text"
              value={productName}
              onChange={(event) => {
                resetReadyState();
                setProductName(event.target.value);
              }}
              placeholder={copy.studio.productNamePlaceholder}
              className={styles.input}
            />
          </div>

          <div className={styles.fieldGrid}>
            <div className={styles.field}>
              <label htmlFor="product-description" className={styles.label}>
                {copy.studio.descriptionLabel}
              </label>
              <textarea
                id="product-description"
                name="description"
                value={description}
                onChange={(event) => {
                  resetReadyState();
                  setDescription(event.target.value);
                }}
                placeholder={copy.studio.descriptionPlaceholder}
                className={`${styles.textarea} ${styles.textareaTall}`.trim()}
              />
            </div>

            <div className={styles.field}>
              <div className={styles.labelRow}>
                <label htmlFor="product-benefits" className={styles.label}>
                  {copy.studio.benefitsLabel}
                </label>
                <span className={styles.optionalNote}>{copy.studio.benefitsHint}</span>
              </div>
              <textarea
                id="product-benefits"
                name="benefits"
                value={benefits}
                onChange={(event) => {
                  resetReadyState();
                  setBenefits(event.target.value);
                }}
                placeholder={copy.studio.benefitsPlaceholder}
                className={`${styles.textarea} ${styles.textareaShort}`.trim()}
              />
            </div>
          </div>

          <div className={styles.controls}>
            <div className={styles.field}>
              <label htmlFor="target-language" className={styles.label}>
                {copy.studio.targetLanguageLabel}
              </label>
              <select
                id="target-language"
                name="targetLanguage"
                value={language}
                onChange={(event) => {
                  resetReadyState();
                  setLanguage(event.target.value);
                }}
                className={styles.select}
              >
                {copy.studio.languages.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="target-platform" className={styles.label}>
                {copy.studio.platformLabel}
              </label>
              <select
                id="target-platform"
                name="targetPlatform"
                value={platform}
                onChange={(event) => {
                  resetReadyState();
                  setPlatform(event.target.value);
                }}
                className={styles.select}
              >
                {copy.studio.platforms.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.actionArea}>
            <button
              type="button"
              disabled={status === "loading"}
              className={`${styles.createButton} ${
                status === "loading" ? styles.createButtonLoading : status === "ready" ? styles.createButtonReady : ""
              }`.trim()}
              onClick={handleCreatePack}
            >
              {status === "loading"
                ? copy.studio.createLoading
                : status === "ready"
                  ? copy.studio.createReady
                  : copy.studio.createButton}
            </button>

            <p
              className={`${styles.createNote} ${
                status === "loading"
                  ? styles.createNoteLoading
                  : status === "ready"
                    ? styles.createNoteReady
                    : status === "name-error" || status === "limit-error"
                      ? styles.createNoteError
                      : ""
              }`.trim()}
            >
              {statusNote}
            </p>
          </div>
        </div>
      </section>
    </StudioAppShell>
  );
}
