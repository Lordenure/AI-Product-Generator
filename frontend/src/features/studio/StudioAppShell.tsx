import type { ReactNode } from "react";

import type { Locale } from "@/lib/i18n";

import { RecentPacksRail } from "./RecentPacksRail";
import { StudioSidebar } from "./StudioSidebar";
import styles from "./StudioAppShell.module.css";

type StudioAppShellProps = {
  locale: Locale;
  activeNav: "create" | "packs";
  activePackId?: string;
  showRail?: boolean;
  children: ReactNode;
};

export function StudioAppShell({
  locale,
  activeNav,
  activePackId,
  showRail = true,
  children
}: StudioAppShellProps) {
  return (
    <section className={styles.wrap}>
      <div className={`${styles.shell} ${!showRail ? styles.shellNoRail : ""}`.trim()}>
        <StudioSidebar locale={locale} activeNav={activeNav} />
        <div className={styles.center}>{children}</div>
        {showRail ? <RecentPacksRail locale={locale} activePackId={activePackId} /> : null}
      </div>
    </section>
  );
}
