import { getAvatarInitials, type AvatarTone } from "./avatar";
import styles from "./AccountAvatar.module.css";

type AccountAvatarProps = {
  name: string;
  tone: AvatarTone;
  imageSrc?: string | null;
  size?: "sidebar" | "popover" | "settings" | "option";
  className?: string;
};

export function AccountAvatar({
  name,
  tone,
  imageSrc,
  size = "sidebar",
  className
}: AccountAvatarProps) {
  return (
    <div className={`${styles.avatar} ${styles[`tone${capitalize(tone)}`]} ${styles[size]} ${className ?? ""}`.trim()}>
      {imageSrc ? <img src={imageSrc} alt="" className={styles.image} /> : <span>{getAvatarInitials(name)}</span>}
    </div>
  );
}

function capitalize(value: string) {
  return value[0].toUpperCase() + value.slice(1);
}
