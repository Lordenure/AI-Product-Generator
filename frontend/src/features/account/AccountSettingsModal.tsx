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
  coverImage: string | null;
  onClose: () => void;
  onSave: (input: {
    name: string;
    avatarFile: File | null;
    removeAvatar: boolean;
    coverFile: File | null;
    removeCover: boolean;
  }) => Promise<void>;
};

export function AccountSettingsModal({
  isOpen,
  locale,
  name,
  secondaryLabel,
  avatarTone,
  avatarImage,
  coverImage,
  onClose,
  onSave
}: AccountSettingsModalProps) {
  const copy = getCopy(locale);
  const [draftName, setDraftName] = useState(name);
  const [draftAvatarPreviewUrl, setDraftAvatarPreviewUrl] = useState<string | null>(avatarImage);
  const [draftCoverPreviewUrl, setDraftCoverPreviewUrl] = useState<string | null>(coverImage);
  const [draftAvatarFile, setDraftAvatarFile] = useState<File | null>(null);
  const [draftCoverFile, setDraftCoverFile] = useState<File | null>(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [removeCover, setRemoveCover] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);
  const avatarObjectUrlRef = useRef<string | null>(null);
  const coverObjectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setIsSaving(false);
      setSaveError(null);
      return;
    }

    revokeObjectUrl(avatarObjectUrlRef.current);
    revokeObjectUrl(coverObjectUrlRef.current);
    avatarObjectUrlRef.current = null;
    coverObjectUrlRef.current = null;

    setDraftName(name);
    setDraftAvatarPreviewUrl(avatarImage);
    setDraftCoverPreviewUrl(coverImage);
    setDraftAvatarFile(null);
    setDraftCoverFile(null);
    setRemoveAvatar(false);
    setRemoveCover(false);
    setSaveError(null);
    setIsSaving(false);
  }, [avatarImage, coverImage, isOpen, name]);

  useEffect(() => {
    return () => {
      revokeObjectUrl(avatarObjectUrlRef.current);
      revokeObjectUrl(coverObjectUrlRef.current);
    };
  }, []);

  return (
    <AccountModalShell isOpen={isOpen} title={copy.studio.accountSettingsTitle} onClose={onClose}>
      <div className={styles.stack}>
        <div className={styles.preview}>
          <AccountAvatar
            name={draftName || name}
            tone={avatarTone}
            imageSrc={draftAvatarPreviewUrl}
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
                accept="image/png,image/jpeg,image/webp,image/gif"
                className={styles.fileInput}
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (!file) {
                    return;
                  }

                  const previewUrl = URL.createObjectURL(file);

                  revokeObjectUrl(avatarObjectUrlRef.current);
                  avatarObjectUrlRef.current = previewUrl;

                  setDraftAvatarFile(file);
                  setDraftAvatarPreviewUrl(previewUrl);
                  setRemoveAvatar(false);
                  event.target.value = "";
                }}
              />

              <button
                type="button"
                className={styles.uploadButton}
                disabled={isSaving}
                onClick={() => fileInputRef.current?.click()}
              >
                {draftAvatarPreviewUrl ? copy.studio.accountImageChangeLabel : copy.studio.accountImageChooseLabel}
              </button>

              {draftAvatarPreviewUrl ? (
                <button
                  type="button"
                  className={styles.removeButton}
                  disabled={isSaving}
                  onClick={() => {
                    revokeObjectUrl(avatarObjectUrlRef.current);
                    avatarObjectUrlRef.current = null;
                    setDraftAvatarFile(null);
                    setDraftAvatarPreviewUrl(null);
                    setRemoveAvatar(Boolean(avatarImage));
                  }}
                >
                  {copy.studio.accountImageRemoveLabel}
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className={styles.coverSection}>
          <span className={styles.label}>{copy.studio.accountCoverLabel}</span>

          <div className={styles.coverRow}>
            <div
              className={`${styles.coverPreview} ${styles[`cover${capitalizeTone(avatarTone)}`]}`.trim()}
              style={draftCoverPreviewUrl ? { backgroundImage: `url(${draftCoverPreviewUrl})` } : undefined}
            />

            <div className={styles.coverActions}>
              <input
                ref={coverInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/gif"
                className={styles.fileInput}
                onChange={(event) => {
                  const file = event.target.files?.[0];

                  if (!file) {
                    return;
                  }

                  const previewUrl = URL.createObjectURL(file);

                  revokeObjectUrl(coverObjectUrlRef.current);
                  coverObjectUrlRef.current = previewUrl;

                  setDraftCoverFile(file);
                  setDraftCoverPreviewUrl(previewUrl);
                  setRemoveCover(false);
                  event.target.value = "";
                }}
              />

              <button
                type="button"
                className={styles.uploadButton}
                disabled={isSaving}
                onClick={() => coverInputRef.current?.click()}
              >
                {draftCoverPreviewUrl ? copy.studio.accountCoverChangeLabel : copy.studio.accountCoverChooseLabel}
              </button>

              {draftCoverPreviewUrl ? (
                <button
                  type="button"
                  className={styles.removeButton}
                  disabled={isSaving}
                  onClick={() => {
                    revokeObjectUrl(coverObjectUrlRef.current);
                    coverObjectUrlRef.current = null;
                    setDraftCoverFile(null);
                    setDraftCoverPreviewUrl(null);
                    setRemoveCover(Boolean(coverImage));
                  }}
                >
                  {copy.studio.accountCoverRemoveLabel}
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
            disabled={isSaving}
          />
        </label>

        {saveError ? <p className={styles.message}>{saveError}</p> : null}

        <div className={styles.actions}>
          <button type="button" className={styles.secondary} onClick={onClose} disabled={isSaving}>
            {copy.studio.accountCancelLabel}
          </button>
          <button
            type="button"
            className={styles.primary}
            disabled={isSaving}
            onClick={async () => {
              if (isSaving) {
                return;
              }

              setIsSaving(true);
              setSaveError(null);

              try {
                await onSave({
                  name: draftName.trim() || name,
                  avatarFile: draftAvatarFile,
                  removeAvatar,
                  coverFile: draftCoverFile,
                  removeCover
                });

                onClose();
              } catch (error) {
                setSaveError(error instanceof Error ? error.message : copy.studio.accountSaveErrorLabel);
              } finally {
                setIsSaving(false);
              }
            }}
          >
            {isSaving ? copy.studio.accountSavePendingLabel : copy.studio.accountSaveLabel}
          </button>
        </div>
      </div>
    </AccountModalShell>
  );
}

function capitalizeTone(value: string) {
  return value[0].toUpperCase() + value.slice(1);
}

function revokeObjectUrl(value: string | null) {
  if (value?.startsWith("blob:")) {
    URL.revokeObjectURL(value);
  }
}
