"use client";

import { type ReactNode, useEffect, useId } from "react";

import styles from "./AccountModalShell.module.css";

type AccountModalShellProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  width?: "default" | "wide";
};

export function AccountModalShell({
  isOpen,
  title,
  onClose,
  children,
  width = "default"
}: AccountModalShellProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.backdrop} onMouseDown={(event) => (event.target === event.currentTarget ? onClose() : null)}>
      <section
        className={`${styles.sheet} ${width === "wide" ? styles.wide : ""}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className={styles.top}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>

          <button type="button" className={styles.close} aria-label="Close" onClick={onClose}>
            <span className={styles.closeLine} aria-hidden="true" />
          </button>
        </div>

        {children}
      </section>
    </div>
  );
}
