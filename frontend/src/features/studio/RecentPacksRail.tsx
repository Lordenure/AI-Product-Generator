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
  const isEmpty = packs.length === 0;

  return (
    <aside id="packs" className={styles.rail} aria-labelledby="recent-packs-title">
      <div className={styles.header}>
        <div>
          <h2 id="recent-packs-title" className={styles.title}>
            {isEmpty ? copy.studio.sidebarPacksLabel : copy.studio.packsTitle}
          </h2>
          {!isEmpty ? <p className={styles.text}>{copy.studio.packsText}</p> : null}
        </div>
      </div>

      <div className={styles.scrollArea}>
        {!isEmpty ? (
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
          <div className={styles.empty}>
            <div className={styles.emptyVisual} aria-hidden="true">
              <span className={styles.emptyShape} />
              <span className={`${styles.emptyShape} ${styles.emptyShapeMiddle}`.trim()} />
              <span className={`${styles.emptyShape} ${styles.emptyShapeFront}`.trim()} />
            </div>
            <div className={styles.emptyCopy}>
              <h3 className={styles.emptyTitle}>{copy.studio.packsEmptyTitle}</h3>
              <p className={styles.emptyText}>{copy.studio.packsEmpty}</p>
            </div>
            <button
              type="button"
              className={styles.emptyAction}
              onClick={() => {
                const input = document.getElementById("product-name") as HTMLInputElement | null;
                input?.focus();
                input?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              {copy.studio.packsEmptyAction}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
