"use client";

import Link from "next/link";
import { useState } from "react";

import { getCopy } from "@/content/copy";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

import { PackCard } from "./PackCard";
import { StudioAppShell } from "./StudioAppShell";
import { useStudioState } from "./StudioStateProvider";
import styles from "./PacksScreen.module.css";

type PacksScreenProps = {
  locale: Locale;
};

type PacksTab = "library" | "community";

export function PacksScreen({ locale }: PacksScreenProps) {
  const copy = getCopy(locale);
  const { packs, deletePack } = useStudioState(locale);
  const [tab, setTab] = useState<PacksTab>("library");

  return (
    <StudioAppShell locale={locale} activeNav="packs" showRail={false}>
      <section className={styles.panel}>
        <div className={styles.top}>
          <h1 className={styles.title}>{copy.studio.packsPageTitle}</h1>

          <div className={styles.tabs} role="tablist" aria-label={copy.studio.packsPageTitle}>
            <button
              type="button"
              className={`${styles.tab} ${tab === "library" ? styles.tabActive : ""}`.trim()}
              onClick={() => setTab("library")}
              aria-selected={tab === "library"}
            >
              {copy.studio.packsTabLibrary}
            </button>
            <button
              type="button"
              className={`${styles.tab} ${tab === "community" ? styles.tabActive : ""}`.trim()}
              onClick={() => setTab("community")}
              aria-selected={tab === "community"}
            >
              {copy.studio.packsTabCommunity}
            </button>
          </div>
        </div>

        {tab === "library" ? (
          packs.length > 0 ? (
            <div className={styles.grid}>
              {packs.map((pack) => (
                <PackCard
                  key={pack.id}
                  locale={locale}
                  pack={pack}
                  showVisibility
                  onDelete={() => deletePack(pack.id)}
                />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <div className={styles.emptyVisual} aria-hidden="true">
                <span className={styles.emptyShape} />
                <span className={`${styles.emptyShape} ${styles.emptyShapeOffset}`.trim()} />
              </div>
              <div className={styles.emptyCopy}>
                <h2 className={styles.emptyTitle}>{copy.studio.packsLibraryEmptyTitle}</h2>
                <p className={styles.emptyText}>{copy.studio.packsLibraryEmptyText}</p>
              </div>
              <Link href={getLocalizedPath(locale, "/studio")} className={styles.emptyAction}>
                {copy.studio.packsLibraryEmptyAction}
              </Link>
            </div>
          )
        ) : (
          <div className={`${styles.empty} ${styles.communityEmpty}`.trim()}>
            <div className={styles.emptyVisual} aria-hidden="true">
              <span className={styles.emptyShape} />
            </div>
            <div className={styles.emptyCopy}>
              <h2 className={styles.emptyTitle}>{copy.studio.packsCommunityEmptyTitle}</h2>
              <p className={styles.emptyText}>{copy.studio.packsCommunityEmptyText}</p>
            </div>
          </div>
        )}
      </section>
    </StudioAppShell>
  );
}
