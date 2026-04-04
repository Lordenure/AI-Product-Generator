import Link from "next/link";

import { getCopy } from "@/content/copy";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

import styles from "./Brand.module.css";

type BrandProps = {
  href?: string;
  locale: Locale;
};

export function Brand({ href, locale }: BrandProps) {
  const copy = getCopy(locale);

  return (
    <Link href={href ?? getLocalizedPath(locale, "/")} className={styles.link}>
      <span className={styles.mark} aria-hidden="true" />
      <span className={styles.text}>
        <span className={styles.wordmark}>TradeAI</span>
        <span className={styles.tagline}>{copy.common.brandLine}</span>
      </span>
    </Link>
  );
}
