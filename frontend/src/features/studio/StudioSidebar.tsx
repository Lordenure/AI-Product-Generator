"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Brand } from "@/components/Brand";
import { FloatingPopover } from "@/components/FloatingPopover";
import { getCopy } from "@/content/copy";
import { getPlanCards } from "@/content/plans";
import { AccountAvatar } from "@/features/account/AccountAvatar";
import { AccountSettingsModal } from "@/features/account/AccountSettingsModal";
import { LogoutModal } from "@/features/account/LogoutModal";
import { PlansModal } from "@/features/account/PlansModal";
import { useAuth } from "@/features/auth/AuthProvider";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

import { SidebarLanguageSwitcher } from "./SidebarLanguageSwitcher";
import { useStudioState } from "./StudioStateProvider";
import styles from "./StudioSidebar.module.css";

type StudioSidebarProps = {
  locale: Locale;
  activeNav: "create" | "packs";
};

export function StudioSidebar({ locale, activeNav }: StudioSidebarProps) {
  const router = useRouter();
  const copy = getCopy(locale);
  const plans = getPlanCards(locale);
  const { planId, setPlan, creditBalance } = useStudioState(locale);
  const { user, updateProfile, signOut } = useAuth();
  const libraryHref = getLocalizedPath(locale, "/packs");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [activeSurface, setActiveSurface] = useState<"plans" | "account" | "logout" | null>(null);
  const profileButtonRef = useRef<HTMLButtonElement | null>(null);

  const currentPlan = useMemo(() => plans.find((plan) => plan.id === planId) ?? plans[0], [planId, plans]);
  const profileName = user?.name ?? copy.studio.sidebarProfileName;
  const profileLabel = user?.secondaryLabel ?? copy.studio.sidebarProfileRole;
  const avatarTone = user?.avatarTone ?? "mint";
  const avatarImage = user?.avatarImage ?? null;
  const homeHref = getLocalizedPath(locale, "/");

  return (
    <>
      <aside className={styles.sidebar}>
        <div className={styles.top}>
          <Brand locale={locale} href={getLocalizedPath(locale, "/studio")} />

          <nav className={styles.nav} aria-label={copy.common.studio}>
            <Link href={homeHref} className={styles.navLink}>
              <span className={styles.navIcon} aria-hidden="true" />
              <span>{copy.studio.sidebarHomeLabel}</span>
            </Link>

            <Link
              href={getLocalizedPath(locale, "/studio")}
              className={`${styles.navLink} ${activeNav === "create" ? styles.navLinkActive : ""}`.trim()}
            >
              <span className={styles.navIcon} aria-hidden="true" />
              <span>{copy.studio.sidebarCreateLabel}</span>
            </Link>

            <Link
              href={libraryHref}
              className={`${styles.navLink} ${activeNav === "packs" ? styles.navLinkActive : ""}`.trim()}
            >
              <span className={styles.navIcon} aria-hidden="true" />
              <span>{copy.studio.sidebarPacksLabel}</span>
            </Link>
          </nav>

          <div className={styles.creditsCard} aria-label={copy.studio.creditsTitle}>
            <strong className={styles.creditValue}>
              {creditBalance} {copy.studio.creditsLeftLabel}
            </strong>
          </div>

          <div className={styles.utilityRow}>
            <button
              type="button"
              className={styles.upgradeButton}
              onClick={() => {
                setPopoverOpen(false);
                setActiveSurface("plans");
              }}
            >
              {copy.studio.sidebarUpgradeLabel}
            </button>

            <SidebarLanguageSwitcher currentLocale={locale} />
          </div>
        </div>

        <button
          ref={profileButtonRef}
          type="button"
          className={styles.profileTrigger}
          onClick={() => setPopoverOpen((open) => !open)}
          aria-expanded={popoverOpen}
        >
          <AccountAvatar name={profileName} tone={avatarTone} imageSrc={avatarImage} size="sidebar" />
          <div className={styles.profileCopy}>
            <strong>{profileName}</strong>
            <span>{profileLabel}</span>
          </div>
        </button>
      </aside>

      <FloatingPopover
        anchorRef={profileButtonRef}
        open={popoverOpen}
        onClose={() => setPopoverOpen(false)}
        className={styles.accountMenu}
        align="start"
      >
        <button
          type="button"
          className={styles.accountPlan}
          onClick={() => {
            setPopoverOpen(false);
            setActiveSurface("plans");
          }}
        >
          <span className={styles.accountMenuIcon} aria-hidden="true" />
          <span className={styles.accountPlanCopy}>
            <span>{copy.studio.accountMenuPlanLabel}</span>
            <strong>{currentPlan.name}</strong>
          </span>
        </button>

        <button
          type="button"
          className={styles.accountMenuItem}
          onClick={() => {
            setPopoverOpen(false);
            setActiveSurface("account");
          }}
        >
          <span className={styles.accountMenuIcon} aria-hidden="true" />
          <span>{copy.studio.accountMenuAccount}</span>
        </button>

        <button
          type="button"
          className={`${styles.accountMenuItem} ${styles.accountMenuItemDanger}`.trim()}
          onClick={() => {
            setPopoverOpen(false);
            setActiveSurface("logout");
          }}
        >
          <span className={styles.accountMenuIcon} aria-hidden="true" />
          <span>{copy.studio.accountMenuLogout}</span>
        </button>
      </FloatingPopover>

      <PlansModal
        isOpen={activeSurface === "plans"}
        locale={locale}
        currentPlanId={planId}
        onClose={() => setActiveSurface(null)}
        onSelectPlan={(nextPlanId) => {
          setPlan(nextPlanId);
          setActiveSurface(null);
        }}
      />

      <AccountSettingsModal
        isOpen={activeSurface === "account"}
        locale={locale}
        name={profileName}
        secondaryLabel={profileLabel}
        avatarTone={avatarTone}
        avatarImage={avatarImage}
        onClose={() => setActiveSurface(null)}
        onSave={(input) => {
          updateProfile(input);
          setActiveSurface(null);
        }}
      />

      <LogoutModal
        isOpen={activeSurface === "logout"}
        locale={locale}
        onClose={() => setActiveSurface(null)}
        onConfirm={() => {
          setActiveSurface(null);
          signOut();
          router.replace(homeHref);
        }}
      />
    </>
  );
}
