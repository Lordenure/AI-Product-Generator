import Link from "next/link";

import { getCopy } from "@/content/copy";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

import styles from "./Footer.module.css";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const copy = getCopy(locale);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.shell}>
          <div className={styles.copy}>
            <span className={styles.brand}>TradeAI</span>
            <p className={styles.line}>{copy.common.footerLine}</p>
            <p className={styles.note}>{copy.common.footerNote}</p>
          </div>
          <nav className={styles.nav}>
            <Link href={getLocalizedPath(locale, "/")} className={styles.navLink}>
              {copy.common.home}
            </Link>
            <Link href={getLocalizedPath(locale, "/studio")} className={styles.navLink}>
              {copy.common.studio}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

