"use client";

import { getPlanCards, type PlanId } from "@/content/plans";
import { getCopy } from "@/content/copy";
import type { Locale } from "@/lib/i18n";

import { AccountModalShell } from "./AccountModalShell";
import styles from "./PlansModal.module.css";

type PlansModalProps = {
  isOpen: boolean;
  locale: Locale;
  currentPlanId: PlanId;
  onClose: () => void;
  onSelectPlan: (planId: PlanId) => void;
};

export function PlansModal({ isOpen, locale, currentPlanId, onClose, onSelectPlan }: PlansModalProps) {
  const copy = getCopy(locale);
  const plans = getPlanCards(locale);
  const visiblePlans =
    currentPlanId === "free"
      ? plans
      : currentPlanId === "plus"
        ? plans.filter((plan) => plan.id !== "free")
        : plans.filter((plan) => plan.id === "pro");
  const gridClass =
    visiblePlans.length === 1 ? styles.gridSingle : visiblePlans.length === 2 ? styles.gridTwo : styles.gridThree;
  const modalWidth = visiblePlans.length === 1 ? "default" : "wide";

  return (
    <AccountModalShell isOpen={isOpen} title={copy.studio.plansModalTitle} onClose={onClose} width={modalWidth}>
      <div className={`${styles.grid} ${gridClass}`.trim()}>
        {visiblePlans.map((plan) => {
          const isCurrent = plan.id === currentPlanId;

          return (
            <article
              key={plan.id}
              className={`${styles.plan} ${plan.featured ? styles.planFeatured : ""} ${
                isCurrent ? styles.planCurrent : ""
              }`.trim()}
            >
              <div className={styles.top}>
                {isCurrent ? <span className={styles.eyebrow}>{copy.studio.planCurrentLabel}</span> : null}

                <div className={styles.copy}>
                  <h3 className={styles.name}>{plan.name}</h3>
                  <p className={styles.line}>{plan.line}</p>
                </div>
              </div>

              <span className={styles.price}>{plan.price}</span>

              <ul className={styles.featureList}>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className={styles.dot} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`${styles.action} ${isCurrent ? styles.actionCurrent : styles.actionChoose}`.trim()}
                disabled={isCurrent}
                onClick={() => {
                  if (isCurrent) {
                    return;
                  }

                  onSelectPlan(plan.id);
                }}
              >
                {isCurrent ? copy.studio.planCurrentAction : `${copy.studio.planChooseAction} ${plan.name}`}
              </button>
            </article>
          );
        })}
      </div>
    </AccountModalShell>
  );
}
