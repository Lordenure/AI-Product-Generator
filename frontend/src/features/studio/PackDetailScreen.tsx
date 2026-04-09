"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { getCopy } from "@/content/copy";
import type { PackRecord } from "@/content/packs";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

import { PackDeleteControl } from "./PackDeleteControl";
import { StudioAppShell } from "./StudioAppShell";
import { useStudioState } from "./StudioStateProvider";
import styles from "./PackDetailScreen.module.css";

type PackDetailScreenProps = {
  locale: Locale;
  packId: string;
};

type GalleryImage = {
  id: string;
  label: string;
  alt: string;
  src: string;
};

export function PackDetailScreen({ locale, packId }: PackDetailScreenProps) {
  const copy = getCopy(locale);
  const router = useRouter();
  const { getPack, deletePack } = useStudioState(locale);
  const pack = getPack(packId);
  const primarySections = useMemo(() => pack?.sections.slice(0, 4) ?? [], [pack]);
  const secondarySections = useMemo(() => pack?.sections.slice(4) ?? [], [pack]);
  const galleryImages = useMemo(() => (pack ? buildGalleryImages(locale, pack) : []), [locale, pack]);
  const [activeImage, setActiveImage] = useState(0);
  const [openSecondary, setOpenSecondary] = useState<string[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copyResetRef = useRef<number | null>(null);

  useEffect(() => {
    if (!pack) {
      router.replace(getLocalizedPath(locale, "/studio"));
    }
  }, [locale, pack, router]);

  useEffect(() => {
    setActiveImage(0);
    setOpenSecondary(secondarySections[0] ? [secondarySections[0].title] : []);
    setCopiedKey(null);
  }, [pack?.id, secondarySections]);

  useEffect(() => {
    return () => {
      if (copyResetRef.current) {
        window.clearTimeout(copyResetRef.current);
      }
    };
  }, []);

  if (!pack) {
    return (
      <StudioAppShell locale={locale} activeNav="packs">
        <section className={styles.panel} />
      </StudioAppShell>
    );
  }

  const activeGalleryImage = galleryImages[activeImage] ?? galleryImages[0];
  const copyAllText = pack.sections.map((section) => `${section.title}\n${section.body}`).join("\n\n");

  async function handleCopy(key: string, value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);

      if (copyResetRef.current) {
        window.clearTimeout(copyResetRef.current);
      }

      copyResetRef.current = window.setTimeout(() => {
        setCopiedKey(null);
      }, 1400);
    } catch {
      setCopiedKey(null);
    }
  }

  function toggleSecondary(title: string) {
    setOpenSecondary((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title]
    );
  }

  return (
    <StudioAppShell locale={locale} activeNav="packs" activePackId={pack.id}>
      <section className={styles.panel}>
        <div className={styles.topRow}>
          <Link href={getLocalizedPath(locale, "/studio")} className={styles.backLink}>
            {copy.studio.detailBack}
          </Link>

          <div className={styles.topActions}>
            <button
              type="button"
              className={styles.utilityButton}
              onClick={() => handleCopy("all", copyAllText)}
            >
              {copiedKey === "all" ? copy.studio.copiedLabel : copy.studio.copyAllLabel}
            </button>
            <PackDeleteControl
              locale={locale}
              variant="detail"
              onDelete={() => {
                deletePack(pack.id);
                router.replace(getLocalizedPath(locale, "/studio"));
              }}
            />
            <span className={`${styles.status} ${styles[`status${pack.status}`]}`.trim()}>{pack.statusLabel}</span>
          </div>
        </div>

        <article className={styles.resultHero}>
          <div className={styles.heroIntro}>
            <span className={styles.kicker}>{copy.studio.detailLabel}</span>
            <div className={styles.meta}>
              <span>{pack.languageLabel}</span>
              <span>{pack.targetLabel}</span>
              <span>{pack.updatedLabel}</span>
            </div>
          </div>

          <h1 className={styles.title}>{pack.productName}</h1>

          <section className={`${styles.gallerySection} ${styles.heroGallery}`.trim()}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>{copy.studio.detailGalleryTitle}</span>
            </div>

            {activeGalleryImage ? (
              <div className={styles.galleryShell}>
                <div className={styles.galleryFrame}>
                  <div className={styles.galleryFrameTop}>
                    <span className={styles.galleryBadgeMuted}>{activeGalleryImage.label}</span>
                    <span className={styles.galleryCounter}>
                      {activeImage + 1} / {galleryImages.length}
                    </span>
                  </div>

                  <div className={styles.galleryImageWrap}>
                    <img
                      src={activeGalleryImage.src}
                      alt={activeGalleryImage.alt}
                      className={styles.galleryImage}
                    />
                  </div>
                </div>

                <div className={styles.galleryThumbs} aria-label={copy.studio.detailGalleryTitle}>
                  {galleryImages.map((image, index) => (
                    <button
                      key={image.id}
                      type="button"
                      className={`${styles.galleryThumb} ${index === activeImage ? styles.galleryThumbActive : ""}`.trim()}
                      onClick={() => setActiveImage(index)}
                      aria-pressed={index === activeImage}
                    >
                      <img src={image.src} alt="" className={styles.galleryThumbImage} aria-hidden="true" />
                      <span>{image.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </section>

          <div className={styles.heroContent}>
            <p className={styles.summary}>{pack.summary}</p>
            <p className={styles.text}>{copy.studio.detailText}</p>
          </div>
        </article>

        <section className={styles.primaryGroup}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionLabel}>{copy.studio.detailPrimaryTitle}</span>
          </div>

          <div className={styles.primaryStack}>
            {primarySections.map((section, index) => (
              <article
                key={section.title}
                className={`${styles.primaryCard} ${index === 0 ? styles.primaryCardTitle : ""}`.trim()}
              >
                <div className={styles.primaryCardTop}>
                  <h2>{section.title}</h2>
                  <button
                    type="button"
                    className={styles.copyButton}
                    onClick={() => handleCopy(section.title, section.body)}
                  >
                    {copiedKey === section.title ? copy.studio.copiedLabel : copy.studio.copyLabel}
                  </button>
                </div>

                {index === 0 ? (
                  <p className={styles.titleResult}>{section.body}</p>
                ) : index === 1 ? (
                  <ul className={styles.benefitsList}>
                    {splitBenefits(section.body).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className={`${styles.primaryText} ${index === 3 ? styles.seoText : ""}`.trim()}>{section.body}</p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className={styles.secondaryGroup}>
          <div className={styles.sectionHeading}>
            <span className={styles.sectionLabel}>{copy.studio.detailSecondaryTitle}</span>
          </div>

          <div className={styles.secondaryStack}>
            {secondarySections.map((section) => {
              const isOpen = openSecondary.includes(section.title);

              return (
                <article
                  key={section.title}
                  className={`${styles.secondaryCard} ${isOpen ? styles.secondaryCardOpen : ""}`.trim()}
                >
                  <button
                    type="button"
                    className={styles.secondaryToggle}
                    onClick={() => toggleSecondary(section.title)}
                  >
                    <div className={styles.secondaryIntro}>
                      <h3>{section.title}</h3>
                      <p>{getPreviewText(section.body)}</p>
                    </div>
                    <span
                      className={`${styles.secondaryChevron} ${isOpen ? styles.secondaryChevronOpen : ""}`.trim()}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen ? (
                    <div className={styles.secondaryContent}>
                      <p>{section.body}</p>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </StudioAppShell>
  );
}

function splitBenefits(text: string): string[] {
  const parts = text
    .split(/[\n,;]+/)
    .map((part) => part.trim())
    .filter(Boolean);

  return parts.length > 0 ? parts : [text];
}

function getPreviewText(text: string): string {
  const trimmed = text.trim();
  return trimmed.length > 120 ? `${trimmed.slice(0, 117).trim()}...` : trimmed;
}

function buildGalleryImages(locale: Locale, pack: PackRecord): GalleryImage[] {
  const labels =
    locale === "ru"
      ? ["Главный кадр", "Лайфстайл", "Деталь"]
      : ["Hero shot", "Lifestyle", "Close-up"];

  return labels.map((label, index) => ({
    id: `${pack.id}-${index}`,
    label,
    alt: `${pack.productName} ${label}`,
    src: buildPlaceholderImage({
      locale,
      title: pack.productName,
      subtitle: label,
      tone: pack.artTone,
      index
    })
  }));
}

function buildPlaceholderImage({
  locale,
  title,
  subtitle,
  tone,
  index
}: {
  locale: Locale;
  title: string;
  subtitle: string;
  tone: PackRecord["artTone"];
  index: number;
}): string {
  const palettes: Record<PackRecord["artTone"], [string, string, string]> = {
    sun: ["#ffe8b0", "#ffab7a", "#91b7ff"],
    mint: ["#bbfff0", "#87e6d6", "#91b7ff"],
    sky: ["#d6e3ff", "#91b7ff", "#ffbe91"],
    rose: ["#ffd0e4", "#ff9dc6", "#87e6d6"]
  };
  const [first, second, third] = palettes[tone];
  const stageX = [166, 128, 214][index] ?? 166;
  const stageY = [108, 90, 122][index] ?? 108;
  const stageRotate = [-6, 0, 7][index] ?? 0;
  const accentX = [944, 270, 980][index] ?? 944;
  const accentY = [164, 620, 548][index] ?? 164;
  const softLabel = locale === "ru" ? "Сгенерированный образ" : "Generated visual";

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${escapeXml(title)}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${first}" />
          <stop offset="52%" stop-color="${second}" />
          <stop offset="100%" stop-color="${third}" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="rgba(255,255,255,0.52)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0.12)" />
        </linearGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="24" />
        </filter>
        <filter id="shadow">
          <feDropShadow dx="0" dy="18" stdDeviation="28" flood-color="rgba(5,9,18,0.36)" />
        </filter>
      </defs>
      <rect width="1200" height="800" rx="48" fill="#0f1726" />
      <rect x="24" y="24" width="1152" height="752" rx="42" fill="url(#bg)" opacity="0.94" />
      <rect x="64" y="96" width="1072" height="560" rx="44" fill="rgba(9,16,29,0.16)" />
      <circle cx="${accentX}" cy="${accentY}" r="154" fill="rgba(255,255,255,0.18)" filter="url(#blur)" />
      <circle cx="${120 + index * 150}" cy="${160 + index * 120}" r="94" fill="rgba(255,255,255,0.12)" filter="url(#blur)" />
      <ellipse cx="600" cy="622" rx="338" ry="54" fill="rgba(7,12,21,0.22)" filter="url(#blur)" />
      <g transform="translate(${stageX} ${stageY}) rotate(${stageRotate} 360 240)" filter="url(#shadow)">
        <rect x="0" y="0" width="760" height="500" rx="46" fill="rgba(9,16,29,0.14)" />
        <rect x="22" y="22" width="716" height="456" rx="38" fill="url(#glass)" opacity="0.62" />
        <rect x="56" y="64" width="232" height="336" rx="38" fill="rgba(255,255,255,0.2)" />
        <rect x="96" y="94" width="152" height="246" rx="56" fill="rgba(9,16,29,0.18)" />
        <rect x="126" y="52" width="92" height="64" rx="30" fill="rgba(255,255,255,0.58)" />
        <rect x="122" y="132" width="100" height="194" rx="44" fill="rgba(255,255,255,0.22)" />
        <rect x="342" y="92" width="250" height="24" rx="12" fill="rgba(9,16,29,0.16)" />
        <rect x="342" y="136" width="280" height="18" rx="9" fill="rgba(9,16,29,0.12)" />
        <rect x="342" y="170" width="214" height="18" rx="9" fill="rgba(9,16,29,0.12)" />
        <rect x="342" y="236" width="186" height="132" rx="28" fill="rgba(255,255,255,0.2)" />
        <rect x="554" y="236" width="122" height="132" rx="28" fill="rgba(255,255,255,0.14)" />
        <circle cx="622" cy="154" r="56" fill="rgba(255,255,255,0.18)" />
      </g>
      <text x="96" y="662" fill="#09101d" font-family="Fraunces, serif" font-size="54" font-weight="600">${escapeXml(title)}</text>
      <text x="96" y="712" fill="#09101d" font-family="Manrope, sans-serif" font-size="24">${escapeXml(subtitle)}</text>
      <text x="96" y="92" fill="rgba(9,16,29,0.72)" font-family="Manrope, sans-serif" font-size="18" letter-spacing="2">${escapeXml(
        softLabel
      )}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
