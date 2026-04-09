import Link from "next/link";

import { getCopy } from "@/content/copy";
import { getPlanCards } from "@/content/plans";
import { SiteFrame } from "@/components/SiteFrame";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

import styles from "./HomeScreen.module.css";

type HomeScreenProps = {
  locale: Locale;
};

export function HomeScreen({ locale }: HomeScreenProps) {
  const copy = getCopy(locale);
  const plans = getPlanCards(locale);
  const studioHref = getLocalizedPath(locale, "/studio");
  const isRussian = locale === "ru";

  return (
    <SiteFrame locale={locale} page="home">
      <section className={`${styles.hero} ${isRussian ? styles.heroRu : ""} container`}>
        <div className={styles.heroCopy}>
          <span className="eyebrow">{copy.home.badge}</span>
          <h1 className="section-title">{copy.home.title}</h1>
          <p className="section-copy">{copy.home.subtitle}</p>
          <div className={styles.heroActions}>
            <Link href={studioHref} className={styles.cta}>
              {copy.home.cta}
            </Link>
          </div>
          <div className={styles.heroStats}>
            {copy.home.heroStats.map((stat) => (
              <span key={stat} className={styles.stat}>
                {stat}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.visualCard}>
          <div className={styles.visualTrack}>
            <div className={styles.visualInput}>
              <span className={styles.visualLabel}>{copy.home.visualInputLabel}</span>
              <p>{copy.home.visualInputValue}</p>
            </div>
            <div className={styles.visualBeam} aria-hidden="true" />
            <div className={styles.visualOutput}>
              <span className={styles.visualLabel}>{copy.home.visualOutputLabel}</span>
              <strong>{copy.home.visualOutputNote}</strong>
            </div>
          </div>

          <ul className={styles.outputGrid}>
            {copy.home.outputs.map((output) => (
              <li key={output} className={styles.outputPill}>
                {output}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`${styles.contentGrid} ${isRussian ? styles.contentRu : ""} container`}>
        <article className={styles.flowCard}>
          <span className={styles.sectionLabel}>{copy.home.flowTitle}</span>
          <p className={styles.sectionText}>{copy.home.flowText}</p>

          <div className={styles.steps}>
            {copy.home.flowSteps.map((step, index) => (
              <div key={step.title} className={styles.step}>
                <span className={styles.stepNumber}>0{index + 1}</span>
                <div className={styles.stepCopy}>
                  <h2>{step.title}</h2>
                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.packCard}>
          <span className={styles.sectionLabel}>{copy.home.includedTitle}</span>
          <p className={styles.sectionText}>{copy.home.includedText}</p>
          <ul className={styles.includedList}>
            {copy.home.includedList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className={`${styles.pricingSection} container`}>
        <div className={styles.pricingIntro}>
          <h2 className={styles.pricingTitle}>{copy.home.plansTitle}</h2>
          <p className={styles.pricingText}>{copy.home.plansText}</p>
        </div>

        <div className={styles.pricingGrid}>
          {plans.map((plan) => (
            <article key={plan.name} className={`${styles.plan} ${plan.featured ? styles.planFeatured : ""}`.trim()}>
              <div className={styles.planTop}>
                <div className={styles.planNameWrap}>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <p className={styles.planLine}>{plan.line}</p>
                </div>
              </div>

              <div className={styles.planPriceRow}>
                <span className={styles.planPrice}>{plan.price}</span>
              </div>

              <ul className={styles.planFeatures}>
                {plan.features.map((feature, index) => (
                  <li key={feature} className={index === 0 ? styles.planFeatureStrong : ""}>
                    <span className={styles.planFeatureDot} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </SiteFrame>
  );
}
