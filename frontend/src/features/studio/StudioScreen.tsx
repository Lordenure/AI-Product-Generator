"use client";

import { startTransition, useEffect, useRef, useState } from "react";

import { creditBalance, fullPackCost, getCopy } from "@/content/copy";
import { SiteFrame } from "@/components/SiteFrame";
import type { Locale } from "@/lib/i18n";

import styles from "./StudioScreen.module.css";

type StudioScreenProps = {
  locale: Locale;
};

type StudioStatus = "idle" | "loading" | "ready";

const meterSlots = 10;

export function StudioScreen({ locale }: StudioScreenProps) {
  const copy = getCopy(locale);
  const [productText, setProductText] = useState(copy.studio.inputPlaceholder);
  const [language, setLanguage] = useState(copy.studio.languages[0]?.id ?? "en");
  const [platform, setPlatform] = useState(copy.studio.platforms[0]?.id ?? "site");
  const [status, setStatus] = useState<StudioStatus>("idle");
  const timeoutRef = useRef<number | null>(null);
  const packsLeft = Math.floor(creditBalance / fullPackCost);
  const filledSlots = Math.min(packsLeft, meterSlots);
  const isRussian = locale === "ru";
  const statusNote =
    status === "loading"
      ? copy.studio.createLoadingNote
      : status === "ready"
        ? copy.studio.createReadyNote
        : copy.studio.createHint;

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

  return (
    <SiteFrame locale={locale} page="studio">
      <section className={`${styles.intro} ${isRussian ? styles.introRu : ""} container`}>
        <div className={styles.introTop}>
          <div className={styles.introCopy}>
            <span className="eyebrow">{copy.studio.badge}</span>
            <h1 className="section-title">{copy.studio.title}</h1>
            <p className="section-copy">{copy.studio.subtitle}</p>
          </div>

          <aside className={styles.creditDock} aria-label={copy.studio.creditsTitle}>
            <div className={styles.creditPrimary}>
              <span className={styles.creditMark} aria-hidden="true" />
              <div className={styles.creditAmount}>
                <span className={styles.creditLabel}>{copy.studio.creditsLeftLabel}</span>
                <strong>{creditBalance}</strong>
              </div>
              <span className={styles.creditCompactNote}>{copy.studio.creditCompactNote}</span>
            </div>

            <div className={styles.creditRail} aria-hidden="true">
              {Array.from({ length: meterSlots }, (_, index) => (
                <span
                  key={index}
                  className={`${styles.creditDot} ${index < filledSlots ? styles.creditDotActive : ""}`.trim()}
                />
              ))}
            </div>

            <div className={styles.creditFacts}>
              <span className={styles.creditFact}>{copy.studio.fullPackCostValue}</span>
              <span className={styles.creditFact}>
                {packsLeft} {copy.studio.packsLeftLabel.toLowerCase()}
              </span>
            </div>
          </aside>
        </div>
      </section>

      <section className={`${styles.workspace} ${isRussian ? styles.workspaceRu : ""} container`}>
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

          <div className={styles.controls}>
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
          </div>

          <div className={styles.actionZone}>
            <button
              type="button"
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
                status === "loading" ? styles.createNoteLoading : status === "ready" ? styles.createNoteReady : ""
              }`.trim()}
            >
              {statusNote}
            </p>
          </div>

          <div className={styles.packStrip}>
            <div className={styles.packStripCopy}>
              <span className={styles.cardLabel}>{copy.studio.packListTitle}</span>
              <p className={styles.helper}>{copy.studio.helperNote}</p>
            </div>

            <ul className={styles.packList}>
              {copy.studio.packList.map((item) => (
                <li key={item} className={styles.packItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>
    </SiteFrame>
  );
}
