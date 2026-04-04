"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useRef, useState } from "react";

import { FloatingPopover } from "@/components/FloatingPopover";
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
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const currentOption = useMemo(
    () => options.find((option) => option.locale === currentLocale) ?? options[0],
    [currentLocale]
  );

  return (
    <div className={styles.switcher}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.trigger}
        aria-label={currentOption.label}
        aria-expanded={open}
        title={currentOption.label}
        onClick={() => setOpen((current) => !current)}
      >
        <Flag code={currentOption.flag} />
        <span className={styles.chevron} aria-hidden="true" />
      </button>

      <FloatingPopover
        anchorRef={buttonRef}
        open={open}
        onClose={() => setOpen(false)}
        className={styles.menu}
        align="start"
      >
        {options.map((option) => {
          const isActive = option.locale === currentLocale;

          return (
            <Link
              key={option.locale}
              href={switchLocalePath(pathname, option.locale)}
              className={`${styles.option} ${isActive ? styles.optionActive : ""}`.trim()}
              aria-label={option.label}
              title={option.label}
              onClick={() => setOpen(false)}
            >
              <Flag code={option.flag} />
              {isActive ? <span className={styles.activeDot} aria-hidden="true" /> : null}
            </Link>
          );
        })}
      </FloatingPopover>
    </div>
  );
}
