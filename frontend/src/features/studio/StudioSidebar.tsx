"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { Brand } from "@/components/Brand";
import { getCopy } from "@/content/copy";
import { getPlanCards } from "@/content/plans";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

import { SidebarLanguageSwitcher } from "./SidebarLanguageSwitcher";
import { useStudioState } from "./StudioStateProvider";
import styles from "./StudioSidebar.module.css";

type StudioSidebarProps = {
  locale: Locale;
  activeNav: "create" | "packs";
};

export function StudioSidebar({ locale, activeNav }: StudioSidebarProps) {
  const copy = getCopy(locale);
  const plans = getPlanCards(locale);
  const { planId, setPlan, creditBalance } = useStudioState(locale);
  const libraryHref = getLocalizedPath(locale, "/packs");
  const [menuOpen, setMenuOpen] = useState(false);
  const planMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!planMenuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const currentPlan = useMemo(() => plans.find((plan) => plan.id === planId) ?? plans[0], [planId, plans]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <Brand locale={locale} href={getLocalizedPath(locale, "/studio")} />

        <nav className={styles.nav} aria-label={copy.common.studio}>
          <Link href={getLocalizedPath(locale, "/")} className={styles.navLink}>
            <span className={styles.navIcon} aria-hidden="true" />
            <span>{copy.studio.sidebarHomeLabel}</span>
          </Link>

          <Link
            href={getLocalizedPath(locale, "/studio")}
            className={`${styles.navLink} ${activeNav === "create" ? styles.navLinkActive : ""}`.trim()}
          >
            <span className={styles.navIcon} aria-hidden="true" />
            <span>{copy.studio.sidebarCreateLabel}</span>
          </Link>

          <Link
            href={libraryHref}
            className={`${styles.navLink} ${activeNav === "packs" ? styles.navLinkActive : ""}`.trim()}
          >
            <span className={styles.navIcon} aria-hidden="true" />
            <span>{copy.studio.sidebarPacksLabel}</span>
          </Link>
        </nav>

        <div className={styles.creditsCard} aria-label={copy.studio.creditsTitle}>
          <strong className={styles.creditValue}>
            {creditBalance} {copy.studio.creditsLeftLabel}
          </strong>
        </div>

        <div className={styles.utilityRow}>
          <div ref={planMenuRef} className={styles.planMenu}>
            <button
              type="button"
              className={styles.upgradeButton}
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
            >
              {copy.studio.sidebarUpgradeLabel}
            </button>

            {menuOpen ? (
              <div className={styles.planMenuCard}>
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    className={`${styles.planOption} ${plan.id === currentPlan.id ? styles.planOptionActive : ""}`.trim()}
                    onClick={() => {
                      setPlan(plan.id);
                      setMenuOpen(false);
                    }}
                  >
                    <span>{plan.name}</span>
                    <span>{plan.price}</span>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <SidebarLanguageSwitcher currentLocale={locale} />
        </div>
      </div>

      <div className={styles.profile}>
        <div className={styles.avatar} aria-hidden="true">
          <span>M</span>
        </div>
        <div className={styles.profileCopy}>
          <strong>{copy.studio.sidebarProfileName}</strong>
          <span>{copy.studio.sidebarProfileRole}</span>
        </div>
      </div>
    </aside>
  );
}
