"use client";

import { useRef, useState } from "react";

import { FloatingPopover } from "@/components/FloatingPopover";
import { getCopy } from "@/content/copy";
import type { Locale } from "@/lib/i18n";

import styles from "./PackDeleteControl.module.css";

type PackDeleteControlProps = {
  locale: Locale;
  onDelete: () => void;
  variant?: "card" | "detail";
};

export function PackDeleteControl({
  locale,
  onDelete,
  variant = "card"
}: PackDeleteControlProps) {
  const copy = getCopy(locale);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div className={`${styles.root} ${variant === "detail" ? styles.rootDetail : styles.rootCard}`.trim()}>
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.button} ${variant === "detail" ? styles.buttonDetail : styles.buttonCard}`.trim()}
        aria-label={copy.studio.deleteLabel}
        aria-expanded={confirmOpen}
        onClick={() => setConfirmOpen((open) => !open)}
      >
        <span className={styles.icon} aria-hidden="true" />
        {variant === "detail" ? <span>{copy.studio.deleteLabel}</span> : null}
      </button>

      <FloatingPopover
        anchorRef={buttonRef}
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        className={styles.confirm}
        align="end"
      >
        <div>
          <p className={styles.title}>{copy.studio.deleteTitle}</p>
          <p className={styles.text}>{copy.studio.deleteText}</p>
          <div className={styles.actions}>
            <button type="button" className={styles.cancel} onClick={() => setConfirmOpen(false)}>
              {copy.studio.deleteCancel}
            </button>
            <button
              type="button"
              className={styles.delete}
              onClick={() => {
                onDelete();
                setConfirmOpen(false);
              }}
            >
              {copy.studio.deleteConfirm}
            </button>
          </div>
        </div>
      </FloatingPopover>
    </div>
  );
}
