import Link from "next/link";

import { creditBalance, fullPackCost, getCopy } from "@/content/copy";
import { SiteFrame } from "@/components/SiteFrame";
import { getLocalizedPath, type Locale } from "@/lib/i18n";

import styles from "./HomeScreen.module.css";

type HomeScreenProps = {
  locale: Locale;
};

export function HomeScreen({ locale }: HomeScreenProps) {
  const copy = getCopy(locale);
  const studioHref = getLocalizedPath(locale, "/studio");
  const packsLeft = Math.floor(creditBalance / fullPackCost);

  return (
    <SiteFrame locale={locale} page="home">
      <section className={`${styles.hero} container`}>
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

      <section className={`${styles.contentGrid} container`}>
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

        <div className={styles.sideStack}>
          <article className={styles.packCard}>
            <span className={styles.sectionLabel}>{copy.home.includedTitle}</span>
            <p className={styles.sectionText}>{copy.home.includedText}</p>
            <ul className={styles.includedList}>
              {copy.home.includedList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={styles.creditsCard}>
            <div className={styles.creditsHeader}>
              <h2 className={styles.creditsTitle}>{copy.home.creditsTitle}</h2>
              <span className={styles.creditsBadge}>{copy.home.creditsBadge}</span>
              <p className={styles.creditsMini}>{copy.home.creditsMini}</p>
            </div>

            <div className={styles.creditsNumbers}>
              <div>
                <span>{copy.home.creditsLeftLabel}</span>
                <strong>{creditBalance}</strong>
              </div>
              <div>
                <span>{copy.home.packsLeftLabel}</span>
                <strong>{packsLeft}</strong>
              </div>
            </div>

            <div className={styles.creditsBar}>
              <span style={{ width: `${(packsLeft / 10) * 100}%` }} />
            </div>

            <p className={styles.creditsText}>{copy.home.creditsText}</p>
            <p className={styles.creditsMeta}>{copy.home.creditsMeta}</p>
          </article>
        </div>
      </section>
    </SiteFrame>
  );
}
