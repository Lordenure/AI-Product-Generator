import Link from "next/link";

import { Brand } from "@/components/Brand";
import { creditBalance, getCopy } from "@/content/copy";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

import { SidebarLanguageSwitcher } from "./SidebarLanguageSwitcher";
import styles from "./StudioSidebar.module.css";

type StudioSidebarProps = {
  locale: Locale;
  activeNav: "create" | "packs";
};

export function StudioSidebar({ locale, activeNav }: StudioSidebarProps) {
  const copy = getCopy(locale);
  const libraryHref = `${getLocalizedPath(locale, "/studio")}#packs`;

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
          <strong className={styles.creditValue}>{creditBalance} {copy.studio.creditsLeftLabel}</strong>
        </div>

        <button type="button" className={styles.upgradeButton}>{copy.studio.sidebarUpgradeLabel}</button>

        <div className={styles.languageBlock}>
          <span className={styles.cardLabel}>{copy.studio.sidebarLanguageLabel}</span>
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
