"use client";

import { useEffect, useRef, useState } from "react";

import { getCopy } from "@/content/copy";
import type { Locale } from "@/lib/i18n";

import { AccountAvatar } from "./AccountAvatar";
import { AccountModalShell } from "./AccountModalShell";
import type { AvatarTone } from "./avatar";
import styles from "./AccountSettingsModal.module.css";

type AccountSettingsModalProps = {
  isOpen: boolean;
  locale: Locale;
  name: string;
  secondaryLabel: string;
  avatarTone: AvatarTone;
  avatarImage: string | null;
  onClose: () => void;
  onSave: (input: { name: string; avatarImage: string | null }) => void;
};

export function AccountSettingsModal({
  isOpen,
  locale,
  name,
  secondaryLabel,
  avatarTone,
  avatarImage,
  onClose,
  onSave
}: AccountSettingsModalProps) {
  const copy = getCopy(locale);
  const [draftName, setDraftName] = useState(name);
  const [draftAvatarImage, setDraftAvatarImage] = useState<string | null>(avatarImage);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setDraftName(name);
    setDraftAvatarImage(avatarImage);
  }, [avatarImage, isOpen, name]);

  return (
    <AccountModalShell isOpen={isOpen} title={copy.studio.accountSettingsTitle} onClose={onClose}>
      <div className={styles.stack}>
        <div className={styles.preview}>
          <AccountAvatar
            name={draftName || name}
            tone={avatarTone}
            imageSrc={draftAvatarImage}
            size="settings"
          />

          <div className={styles.previewBody}>
            <div className={styles.previewCopy}>
              <strong>{draftName || name}</strong>
              <span>{secondaryLabel}</span>
            </div>

            <div className={styles.uploadRow}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={async (event) => {
                  const file = event.target.files?.[0];

                  if (!file) {
                    return;
                  }

                  setDraftAvatarImage(await readImageAsDataUrl(file));
                  event.target.value = "";
                }}
              />

              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => fileInputRef.current?.click()}
              >
                {draftAvatarImage ? copy.studio.accountImageChangeLabel : copy.studio.accountImageChooseLabel}
              </button>

              {draftAvatarImage ? (
                <button type="button" className={styles.removeButton} onClick={() => setDraftAvatarImage(null)}>
                  {copy.studio.accountImageRemoveLabel}
                </button>
              ) : null}
            </div>
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
                avatarImage: draftAvatarImage
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

function readImageAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(new Error("Failed to read image."));
    reader.readAsDataURL(file);
  });
}
