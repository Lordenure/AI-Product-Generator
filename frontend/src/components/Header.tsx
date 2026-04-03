import Link from "next/link";

import { getCopy } from "@/content/copy";
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
  const actionHref = page === "home" ? getLocalizedPath(locale, "/studio") : getLocalizedPath(locale, "/");
  const actionLabel = page === "home" ? copy.common.openStudio : copy.common.backHome;

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.shell}>
          <Brand locale={locale} />
          <div className={styles.actions}>
            <Link href={actionHref} className={styles.link}>
              {actionLabel}
            </Link>
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
}

