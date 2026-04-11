"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { getAuthConfig } from "@/content/auth";
import type { Locale } from "@/lib/i18n";
import { useAuth } from "@/features/auth/AuthProvider";

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
  const pathname = usePathname();
  const auth = getAuthConfig(locale);
  const { isAuthenticated, isReady, openAuth } = useAuth();

  if (!isReady) {
    return (
      <section className={styles.wrap}>
        <div className={styles.accessShell}>
          <div className={styles.accessCard} aria-hidden="true" />
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    return (
      <section className={styles.wrap}>
        <div className={styles.accessShell}>
          <div className={styles.accessCard}>
            <div className={styles.accessCopy}>
              <span className={styles.accessEyebrow}>{auth.title["sign-in"]}</span>
              <h1 className={styles.accessTitle}>{auth.gateTitle}</h1>
              <p className={styles.accessText}>{auth.gateText}</p>
            </div>

            <div className={styles.accessActions}>
              <button
                type="button"
                className={styles.accessPrimary}
                onClick={() => openAuth({ locale, redirectTo: pathname, mode: "sign-in" })}
              >
                {auth.gateSignIn}
              </button>
              <button
                type="button"
                className={styles.accessSecondary}
                onClick={() => openAuth({ locale, redirectTo: pathname, mode: "create-account" })}
              >
                {auth.gateCreate}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
