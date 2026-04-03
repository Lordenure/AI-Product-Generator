import type { ReactNode } from "react";

import type { Locale } from "@/lib/i18n";

import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./SiteFrame.module.css";

type SiteFrameProps = {
  locale: Locale;
  page: "home" | "studio";
  children: ReactNode;
};

export function SiteFrame({ locale, page, children }: SiteFrameProps) {
  return (
    <div className={styles.frame}>
      <div className={styles.glow} aria-hidden="true" />
      <Header locale={locale} page={page} />
      <main className={styles.main}>{children}</main>
      <Footer locale={locale} />
    </div>
  );
}

