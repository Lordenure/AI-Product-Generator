"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getCopy } from "@/content/copy";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

import { PackDeleteControl } from "./PackDeleteControl";
import { StudioAppShell } from "./StudioAppShell";
import { useStudioState } from "./StudioStateProvider";
import styles from "./PackDetailScreen.module.css";

type PackDetailScreenProps = {
  locale: Locale;
  packId: string;
};

export function PackDetailScreen({ locale, packId }: PackDetailScreenProps) {
  const copy = getCopy(locale);
  const router = useRouter();
  const { getPack, deletePack } = useStudioState(locale);
  const pack = getPack(packId);

  useEffect(() => {
    if (!pack) {
      router.replace(getLocalizedPath(locale, "/studio"));
    }
  }, [locale, pack, router]);

  if (!pack) {
    return (
      <StudioAppShell locale={locale} activeNav="packs">
        <section className={styles.panel} />
      </StudioAppShell>
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

        <article className={styles.summaryCard}>
          <span className={styles.kicker}>{copy.studio.detailLabel}</span>
          <h1 className={styles.title}>{pack.productName}</h1>
          <p className={styles.text}>{copy.studio.detailText}</p>

          <div className={styles.meta}>
            <span>{pack.languageLabel}</span>
            <span>{pack.targetLabel}</span>
            <span>{pack.updatedLabel}</span>
          </div>
        </article>

        <section className={styles.sectionGrid}>
          {pack.sections.map((section) => (
            <article key={section.title} className={styles.sectionCard}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </section>
      </section>
    </StudioAppShell>
  );
}
