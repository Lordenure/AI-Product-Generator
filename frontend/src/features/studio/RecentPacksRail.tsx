"use client";

import { getCopy } from "@/content/copy";
import type { Locale } from "@/lib/i18n";

import { PackCard } from "./PackCard";
import { useStudioState } from "./StudioStateProvider";
import styles from "./RecentPacksRail.module.css";

type RecentPacksRailProps = {
  locale: Locale;
  activePackId?: string;
};

export function RecentPacksRail({ locale, activePackId }: RecentPacksRailProps) {
  const copy = getCopy(locale);
  const { packs, deletePack } = useStudioState(locale);

  return (
    <aside id="packs" className={styles.rail} aria-labelledby="recent-packs-title">
      <div className={styles.header}>
        <div>
          <h2 id="recent-packs-title" className={styles.title}>
            {copy.studio.packsTitle}
          </h2>
          <p className={styles.text}>{copy.studio.packsText}</p>
        </div>
      </div>

      <div className={styles.scrollArea}>
        {packs.length > 0 ? (
          <ul className={styles.list}>
            {packs.map((pack) => (
              <li key={pack.id}>
                <PackCard
                  locale={locale}
                  pack={pack}
                  isActive={pack.id === activePackId}
                  onDelete={() => deletePack(pack.id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>{copy.studio.packsEmpty}</div>
        )}
      </div>
    </aside>
  );
}
