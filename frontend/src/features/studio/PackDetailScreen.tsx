import Link from "next/link";
import { notFound } from "next/navigation";

import { getCopy } from "@/content/copy";
import { getPackById } from "@/content/packs";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

import { StudioAppShell } from "./StudioAppShell";
import styles from "./PackDetailScreen.module.css";

type PackDetailScreenProps = {
  locale: Locale;
  packId: string;
};

export function PackDetailScreen({ locale, packId }: PackDetailScreenProps) {
  const copy = getCopy(locale);
  const pack = getPackById(locale, packId);

  if (!pack) {
    notFound();
  }

  return (
    <StudioAppShell locale={locale} activeNav="packs" activePackId={pack.id}>
      <section className={styles.panel}>
        <div className={styles.topRow}>
          <Link href={getLocalizedPath(locale, "/studio")} className={styles.backLink}>
            {copy.studio.detailBack}
          </Link>
          <span className={`${styles.status} ${styles[`status${pack.status}`]}`.trim()}>{pack.statusLabel}</span>
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
