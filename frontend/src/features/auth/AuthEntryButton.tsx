"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";

import type { Locale } from "@/lib/i18n";

import { useAuth } from "./AuthProvider";
import styles from "./AuthEntryButton.module.css";

type AuthEntryButtonProps = {
  locale: Locale;
  href: string;
  className?: string;
  children: ReactNode;
};

export function AuthEntryButton({ locale, href, className, children }: AuthEntryButtonProps) {
  const router = useRouter();
  const { isAuthenticated, isReady, openAuth } = useAuth();

  function handleClick() {
    if (!isReady) {
      return;
    }

    if (isAuthenticated) {
      router.push(href);
      return;
    }

    openAuth({ locale, redirectTo: href });
  }

  return (
    <button
      type="button"
      className={`${styles.button} ${className ?? ""}`.trim()}
      onClick={handleClick}
      aria-busy={!isReady}
    >
      {children}
    </button>
  );
}
