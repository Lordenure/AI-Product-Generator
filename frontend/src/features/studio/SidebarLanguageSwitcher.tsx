"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Flag } from "@/components/Flag";
import { switchLocalePath, type Locale } from "@/lib/i18n";

import styles from "./SidebarLanguageSwitcher.module.css";

type SidebarLanguageSwitcherProps = {
  currentLocale: Locale;
};

const options = [
  { locale: "en", label: "English", flag: "us" },
  { locale: "ru", label: "Русский", flag: "ru" }
] as const;

export function SidebarLanguageSwitcher({ currentLocale }: SidebarLanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className={styles.switcher}>
      {options.map((option) => {
        const isActive = option.locale === currentLocale;

        return (
          <Link
            key={option.locale}
            href={switchLocalePath(pathname, option.locale)}
            className={`${styles.option} ${isActive ? styles.optionActive : ""}`.trim()}
          >
            <span className={styles.optionLabel}>
              <Flag code={option.flag} />
              <span>{option.label}</span>
            </span>
            {isActive ? <span className={styles.activeDot} aria-hidden="true" /> : null}
          </Link>
        );
      })}
    </div>
  );
}
