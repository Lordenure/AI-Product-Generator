"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { getCopy } from "@/content/copy";
import { AccountAvatar } from "@/features/account/AccountAvatar";
import { AccountSettingsModal } from "@/features/account/AccountSettingsModal";
import { getDefaultAvatarTone } from "@/features/account/avatar";
import { useAuth } from "@/features/auth/AuthProvider";
import { getLocalizedPath, type Locale } from "@/lib/i18n";
import { PackCard } from "@/features/studio/PackCard";
import { StudioAppShell } from "@/features/studio/StudioAppShell";
import { useStudioState } from "@/features/studio/StudioStateProvider";

import styles from "./ProfileScreen.module.css";

type ProfileScreenProps = {
  locale: Locale;
  profileId: string;
};

export function ProfileScreen({ locale, profileId }: ProfileScreenProps) {
  const copy = getCopy(locale);
  const router = useRouter();
  const { user, updateProfile, isReady } = useAuth();
  const { packs } = useStudioState(locale);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const isOwner = user?.id === profileId;
  const publicPacks = useMemo(
    () => packs.filter((pack) => pack.visibility === "public" && pack.authorId === profileId),
    [packs, profileId]
  );
  const leadPack = publicPacks[0];

  useEffect(() => {
    if (isReady && !isOwner && !leadPack) {
      router.replace(getLocalizedPath(locale, "/packs"));
    }
  }, [isOwner, isReady, leadPack, locale, router]);

  if (isReady && !isOwner && !leadPack) {
    return (
      <StudioAppShell locale={locale} activeNav="packs" showRail={false}>
        <section className={styles.panel} />
      </StudioAppShell>
    );
  }

  const profileName = isOwner ? (user?.name ?? copy.studio.sidebarProfileName) : (leadPack?.authorName ?? "");
  const avatarTone = isOwner ? (user?.avatarTone ?? getDefaultAvatarTone(profileId)) : getDefaultAvatarTone(profileId);
  const avatarImage = isOwner ? (user?.avatarImage ?? null) : null;
  const coverImage = isOwner ? (user?.coverImage ?? null) : null;
  const coverTone = isOwner ? user?.avatarTone ?? leadPack?.artTone ?? "sky" : leadPack?.artTone ?? "sky";
  const secondaryLabel = user?.secondaryLabel ?? copy.studio.sidebarProfileRole;

  return (
    <StudioAppShell locale={locale} activeNav="packs" showRail={false}>
      <section className={styles.panel}>
        <section className={styles.headerCard}>
          <div
            className={`${styles.cover} ${styles[`cover${capitalize(coverTone)}`]}`.trim()}
            style={coverImage ? { backgroundImage: `url(${coverImage})` } : undefined}
          />

          <div className={styles.identityRow}>
            <div className={styles.identity}>
              <AccountAvatar
                name={profileName}
                tone={avatarTone}
                imageSrc={avatarImage}
                size="settings"
                className={styles.profileAvatar}
              />

              <div className={styles.identityCopy}>
                <h1 className={styles.title}>{profileName}</h1>
              </div>
            </div>

            {isOwner ? (
              <button
                type="button"
                className={styles.settingsButton}
                aria-label={copy.studio.profileSettingsLabel}
                onClick={() => setSettingsOpen(true)}
              >
                <span className={styles.settingsGear} aria-hidden="true" />
              </button>
            ) : null}
          </div>
        </section>

        <section className={styles.packsSection}>
          <div className={styles.sectionHeading}>
            <h2 className={styles.sectionTitle}>{copy.studio.profilePacksTitle}</h2>
          </div>

          {publicPacks.length > 0 ? (
            <div className={styles.grid}>
              {publicPacks.map((pack) => (
                <PackCard
                  key={pack.id}
                  locale={locale}
                  pack={pack}
                  showDelete={false}
                  onDelete={() => undefined}
                />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <div className={styles.emptyVisual} aria-hidden="true">
                <span className={styles.emptyShape} />
                <span className={`${styles.emptyShape} ${styles.emptyShapeOffset}`.trim()} />
              </div>
              <div className={styles.emptyCopy}>
                <h2 className={styles.emptyTitle}>{copy.studio.profileEmptyTitle}</h2>
                <p className={styles.emptyText}>{copy.studio.profileEmptyText}</p>
              </div>
            </div>
          )}
        </section>
      </section>

      {isOwner && user ? (
        <AccountSettingsModal
          isOpen={settingsOpen}
          locale={locale}
          name={user.name}
          secondaryLabel={secondaryLabel}
          avatarTone={user.avatarTone}
          avatarImage={user.avatarImage}
          coverImage={user.coverImage}
          onClose={() => setSettingsOpen(false)}
          onSave={(input) => {
            updateProfile(input);
            setSettingsOpen(false);
          }}
        />
      ) : null}
    </StudioAppShell>
  );
}

function capitalize(value: string) {
  return value[0].toUpperCase() + value.slice(1);
}
