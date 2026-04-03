import styles from "./Flag.module.css";

type FlagCode = "ru" | "us";

type FlagProps = {
  code: FlagCode;
};

export function Flag({ code }: FlagProps) {
  return <span className={`${styles.flag} ${styles[code]}`} aria-hidden="true" />;
}

