"use client";

import { startTransition, useDeferredValue, useEffect, useRef, useState } from "react";

import { creditBalance, fullPackCost, getCopy } from "@/content/copy";
import { SiteFrame } from "@/components/SiteFrame";
import type { Locale } from "@/lib/i18n";

import styles from "./StudioScreen.module.css";

type StudioScreenProps = {
  locale: Locale;
};

type StudioStatus = "idle" | "loading" | "ready";

export function StudioScreen({ locale }: StudioScreenProps) {
  const copy = getCopy(locale);
  const [productText, setProductText] = useState(copy.studio.inputPlaceholder);
  const [language, setLanguage] = useState(copy.studio.languages[0]?.id ?? "en");
  const [platform, setPlatform] = useState(copy.studio.platforms[0]?.id ?? "site");
  const [status, setStatus] = useState<StudioStatus>("idle");
  const timeoutRef = useRef<number | null>(null);
  const deferredProductText = useDeferredValue(productText);
  const previewTitle = getPreviewName(deferredProductText, copy.studio.sampleProductFallback);
  const selectedLanguage = copy.studio.languages.find((option) => option.id === language) ?? copy.studio.languages[0];
  const selectedPlatform = copy.studio.platforms.find((option) => option.id === platform) ?? copy.studio.platforms[0];
  const packsLeft = Math.floor(creditBalance / fullPackCost);
  const previewContext = copy.studio.previewContext
    .replace("{platform}", selectedPlatform.previewLabel)
    .replace("{language}", selectedLanguage.previewLabel);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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

    setStatus("loading");
    timeoutRef.current = window.setTimeout(() => {
      startTransition(() => {
        setStatus("ready");
      });
    }, 900);
  }

  function getStatusLabel() {
    if (status === "loading") {
      return copy.studio.previewStatusLoading;
    }

    if (status === "ready") {
      return copy.studio.previewStatusReady;
    }

    return copy.studio.previewStatusIdle;
  }

  return (
    <SiteFrame locale={locale} page="studio">
      <section className={`${styles.intro} container`}>
        <span className="eyebrow">{copy.studio.badge}</span>
        <div className={styles.introCopy}>
          <h1 className="section-title">{copy.studio.title}</h1>
          <p className="section-copy">{copy.studio.subtitle}</p>
        </div>
      </section>

      <section className={`${styles.workspace} container`}>
        <article className={styles.composer}>
          <div className={styles.block}>
            <label htmlFor="product-input" className={styles.blockLabel}>
              {copy.studio.inputLabel}
            </label>
            <textarea
              id="product-input"
              name="product"
              value={productText}
              onChange={(event) => {
                resetReadyState();
                setProductText(event.target.value);
              }}
              placeholder={copy.studio.inputPlaceholder}
              className={styles.textarea}
            />
          </div>

          <div className={styles.block}>
            <span className={styles.blockLabel}>{copy.studio.targetLanguageLabel}</span>
            <div className={styles.chips}>
              {copy.studio.languages.map((option) => {
                const isActive = option.id === language;

                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`${styles.chip} ${isActive ? styles.chipActive : ""}`.trim()}
                    onClick={() => {
                      resetReadyState();
                      setLanguage(option.id);
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className={styles.block}>
            <span className={styles.blockLabel}>{copy.studio.platformLabel}</span>
            <div className={styles.chips}>
              {copy.studio.platforms.map((option) => {
                const isActive = option.id === platform;

                return (
                  <button
                    key={option.id}
                    type="button"
                    className={`${styles.chip} ${isActive ? styles.chipActive : ""}`.trim()}
                    onClick={() => {
                      resetReadyState();
                      setPlatform(option.id);
                    }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <button type="button" className={styles.createButton} onClick={handleCreatePack}>
            {status === "loading"
              ? copy.studio.createLoading
              : status === "ready"
                ? copy.studio.createReady
                : copy.studio.createButton}
          </button>

          <p className={styles.helper}>{copy.studio.helperNote}</p>
          <p className={styles.createHint}>{copy.studio.createHint}</p>
        </article>

        <div className={styles.sidebar}>
          <article className={styles.creditsCard}>
            <div className={styles.creditsTop}>
              <div>
                <span className={styles.cardLabel}>{copy.studio.creditsTitle}</span>
                <h2>{copy.studio.creditsLeftLabel}</h2>
              </div>
              <span className={styles.costPill}>{copy.studio.fullPackCostValue}</span>
            </div>

            <div className={styles.balanceRow}>
              <div>
                <span>{copy.studio.creditsLeftLabel}</span>
                <strong>{creditBalance}</strong>
              </div>
              <div>
                <span>{copy.studio.fullPackCostLabel}</span>
                <strong>{fullPackCost}</strong>
              </div>
              <div>
                <span>{copy.studio.packsLeftLabel}</span>
                <strong>{packsLeft}</strong>
              </div>
            </div>

            <div className={styles.balanceBar}>
              <span style={{ width: `${(packsLeft / 10) * 100}%` }} />
            </div>

            <p className={styles.creditNote}>{copy.studio.creditNote}</p>
          </article>

          <article
            className={`${styles.previewCard} ${
              status === "loading" ? styles.previewLoading : status === "ready" ? styles.previewReady : ""
            }`.trim()}
          >
            <div className={styles.previewHead}>
              <div>
                <span className={styles.cardLabel}>{copy.studio.previewTitle}</span>
                <h2>{previewTitle}</h2>
              </div>
              <span className={styles.statusPill}>{getStatusLabel()}</span>
            </div>

            <p className={styles.previewText}>{copy.studio.previewText}</p>

            <div className={styles.previewMeta}>
              <span>{previewContext}</span>
              <span>{copy.studio.previewMeta}</span>
            </div>

            <ul className={styles.previewList}>
              {copy.studio.previewSections.map((section) => (
                <li key={section.title} className={styles.previewItem}>
                  <div>
                    <span>{section.title}</span>
                    <p>{section.sample}</p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>
    </SiteFrame>
  );
}

function getPreviewName(input: string, fallback: string) {
  const firstLine = input
    .split("\n")
    .map((line) => line.trim())
    .find(Boolean);

  if (!firstLine) {
    return fallback;
  }

  return firstLine.length > 42 ? `${firstLine.slice(0, 39)}...` : firstLine;
}
