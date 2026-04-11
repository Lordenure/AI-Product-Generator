"use client";

import { useEffect, useState } from "react";

import { getCopy } from "@/content/copy";
import type { Locale } from "@/lib/i18n";

import { AccountAvatar } from "./AccountAvatar";
import { AccountModalShell } from "./AccountModalShell";
import { avatarTones, type AvatarTone } from "./avatar";
import styles from "./AccountSettingsModal.module.css";

type AccountSettingsModalProps = {
  isOpen: boolean;
  locale: Locale;
  name: string;
  secondaryLabel: string;
  avatarTone: AvatarTone;
  onClose: () => void;
  onSave: (input: { name: string; avatarTone: AvatarTone }) => void;
};

export function AccountSettingsModal({
  isOpen,
  locale,
  name,
  secondaryLabel,
  avatarTone,
  onClose,
  onSave
}: AccountSettingsModalProps) {
  const copy = getCopy(locale);
  const [draftName, setDraftName] = useState(name);
  const [draftTone, setDraftTone] = useState<AvatarTone>(avatarTone);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setDraftName(name);
    setDraftTone(avatarTone);
  }, [avatarTone, isOpen, name]);

  return (
    <AccountModalShell isOpen={isOpen} title={copy.studio.accountSettingsTitle} onClose={onClose}>
      <div className={styles.stack}>
        <div className={styles.preview}>
          <AccountAvatar name={draftName || name} tone={draftTone} size="settings" />
          <div className={styles.previewCopy}>
            <strong>{draftName || name}</strong>
            <span>{secondaryLabel}</span>
          </div>
        </div>

        <label className={styles.field}>
          <span className={styles.label}>{copy.studio.accountNameLabel}</span>
          <input
            className={styles.input}
            value={draftName}
            onChange={(event) => setDraftName(event.target.value)}
            placeholder={name}
          />
        </label>

        <div className={styles.avatarGroup}>
          <span className={styles.label}>{copy.studio.accountAvatarLabel}</span>
          <div className={styles.avatarChoices}>
            {avatarTones.map((tone) => (
              <button
                key={tone}
                type="button"
                className={`${styles.avatarOption} ${draftTone === tone ? styles.avatarOptionActive : ""}`.trim()}
                onClick={() => setDraftTone(tone)}
                aria-pressed={draftTone === tone}
              >
                <AccountAvatar name={draftName || name} tone={tone} size="option" />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.secondary} onClick={onClose}>
            {copy.studio.accountCancelLabel}
          </button>
          <button
            type="button"
            className={styles.primary}
            onClick={() => {
              onSave({
                name: draftName.trim() || name,
                avatarTone: draftTone
              });
            }}
          >
            {copy.studio.accountSaveLabel}
          </button>
        </div>
      </div>
    </AccountModalShell>
  );
}
