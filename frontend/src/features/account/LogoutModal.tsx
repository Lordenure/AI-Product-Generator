"use client";

import { getCopy } from "@/content/copy";
import type { Locale } from "@/lib/i18n";

import { AccountModalShell } from "./AccountModalShell";
import styles from "./LogoutModal.module.css";

type LogoutModalProps = {
  isOpen: boolean;
  locale: Locale;
  onClose: () => void;
  onConfirm: () => void;
};

export function LogoutModal({ isOpen, locale, onClose, onConfirm }: LogoutModalProps) {
  const copy = getCopy(locale);

  return (
    <AccountModalShell isOpen={isOpen} title={copy.studio.logoutTitle} onClose={onClose}>
      <div className={styles.stack}>
        <p className={styles.text}>{copy.studio.logoutText}</p>

        <div className={styles.actions}>
          <button type="button" className={styles.secondary} onClick={onClose}>
            {copy.studio.logoutCancel}
          </button>
          <button type="button" className={styles.danger} onClick={onConfirm}>
            {copy.studio.logoutConfirm}
          </button>
        </div>
      </div>
    </AccountModalShell>
  );
}
