"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { getCopy } from "@/content/copy";
import { switchLocalePath, type Locale } from "@/lib/i18n";

import { Flag } from "./Flag";
import styles from "./LanguageSwitcher.module.css";

type LanguageSwitcherProps = {
  currentLocale: Locale;
};

const options = [
  { locale: "en", label: "English", flag: "us" },
  { locale: "ru", label: "Русский", flag: "ru" }
] as const;

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const copy = getCopy(currentLocale);
  const pathname = usePathname();
  const currentOption = options.find((option) => option.locale === currentLocale) ?? options[0];

  function getHref(targetLocale: Locale) {
    return switchLocalePath(pathname, targetLocale);
  }

  return (
    <details className={styles.switcher}>
      <summary className={styles.trigger} aria-label={copy.common.language}>
        <span className={styles.current}>
          <Flag code={currentOption.flag} />
        </span>
        <span className={styles.chevron} aria-hidden="true" />
      </summary>
      <div className={styles.menu}>
        {options.map((option) => {
          const isActive = option.locale === currentLocale;

          return (
            <Link
              key={option.locale}
              href={getHref(option.locale)}
              className={`${styles.option} ${isActive ? styles.optionActive : ""}`.trim()}
              aria-label={option.label}
              title={option.label}
            >
              <Flag code={option.flag} />
              {isActive ? <span className={styles.activeDot} aria-hidden="true" /> : null}
            </Link>
          );
        })}
      </div>
    </details>
  );
}
