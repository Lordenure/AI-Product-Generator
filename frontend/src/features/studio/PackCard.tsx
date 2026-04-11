"use client";

import Link from "next/link";

import { getCopy } from "@/content/copy";
import type { PackRecord } from "@/content/packs";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

import { PackDeleteControl } from "./PackDeleteControl";
import styles from "./PackCard.module.css";

type PackCardProps = {
  locale: Locale;
  pack: PackRecord;
  isActive?: boolean;
  showVisibility?: boolean;
  showAuthor?: boolean;
  authorHref?: string;
  showDelete?: boolean;
  onDelete: () => void;
};

export function PackCard({
  locale,
  pack,
  isActive = false,
  showVisibility = false,
  showAuthor = false,
  authorHref,
  showDelete = true,
  onDelete
}: PackCardProps) {
  const copy = getCopy(locale);
  const href = getLocalizedPath(locale, `/studio/packs/${pack.id}`);
  const initials = pack.productName
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <article className={`${styles.card} ${isActive ? styles.cardActive : ""}`.trim()}>
      <div className={styles.cardTop}>
        <div className={styles.head}>
          <div className={`${styles.thumb} ${styles[`thumb${pack.artTone}`]}`.trim()} aria-hidden="true">
            <span>{initials}</span>
          </div>

          <div className={styles.copy}>
            <div className={styles.titleRow}>
              <h3 className={styles.title}>{pack.productName}</h3>
              <span className={`${styles.status} ${styles[`status${pack.status}`]}`.trim()}>{pack.statusLabel}</span>
            </div>
            <p className={styles.summary}>{pack.summary}</p>
          </div>
        </div>

        {showDelete ? <PackDeleteControl locale={locale} onDelete={onDelete} /> : null}
      </div>

      {showAuthor ? (
        authorHref ? (
          <Link href={authorHref} className={styles.authorLink}>
            {pack.authorName}
          </Link>
        ) : (
          <p className={styles.author}>{pack.authorName}</p>
        )
      ) : null}

      <div className={styles.meta}>
        <span>{pack.languageLabel}</span>
        <span>{pack.targetLabel}</span>
        <span>{pack.updatedLabel}</span>
      </div>

      <div className={styles.footer}>
        <div className={styles.tags}>
          {showVisibility ? (
            <span
              className={`${styles.tag} ${styles.tagVisibility} ${styles[`tagVisibility${pack.visibility}`]}`.trim()}
            >
              {pack.visibilityLabel}
            </span>
          ) : null}
          {pack.tags.slice(0, 2).map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>

        <Link href={href} className={styles.action}>
          {copy.studio.openPack}
          <span className={styles.arrow} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
