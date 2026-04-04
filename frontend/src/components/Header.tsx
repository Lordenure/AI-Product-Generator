import Link from "next/link";

import { creditBalance, fullPackCost, getCopy } from "@/content/copy";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

import { Brand } from "./Brand";
import { LanguageSwitcher } from "./LanguageSwitcher";
import styles from "./Header.module.css";

type HeaderProps = {
  locale: Locale;
  page: "home" | "studio";
};

export function Header({ locale, page }: HeaderProps) {
  const copy = getCopy(locale);
  const packsLeft = Math.floor(creditBalance / fullPackCost);
  const actionHref = getLocalizedPath(locale, "/studio");
  const actionLabel = copy.common.openStudio;
  const brandHref = page === "studio" ? getLocalizedPath(locale, "/studio") : getLocalizedPath(locale, "/");

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={`${styles.shell} ${page === "studio" ? styles.shellApp : ""}`.trim()}>
          <Brand locale={locale} href={brandHref} />
          <div className={styles.actions}>
            {page === "home" ? (
              <Link href={actionHref} className={styles.link}>
                {actionLabel}
              </Link>
            ) : (
              <div className={styles.creditPill} aria-label={copy.studio.creditsTitle}>
                <span className={styles.creditIcon} aria-hidden="true" />
                <span className={styles.creditText}>
                  <strong>{creditBalance} {copy.studio.creditsLeftLabel}</strong>
                  <span>
                    {packsLeft} {copy.studio.packsLeftLabel} • {copy.studio.fullPackCostValue}
                  </span>
                </span>
              </div>
            )}
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
}
