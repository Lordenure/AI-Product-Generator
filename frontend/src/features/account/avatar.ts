export type AvatarTone = "mint" | "sky" | "sun" | "rose";

export const avatarTones: AvatarTone[] = ["mint", "sky", "sun", "rose"];

export function getAvatarInitials(name: string) {
  const initials = name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "T";
}

export function getDefaultAvatarTone(seed: string) {
  const normalized = seed.trim().toLowerCase();

  if (!normalized) {
    return avatarTones[0];
  }

  let hash = 0;

  for (const char of normalized) {
    hash = (hash * 31 + char.charCodeAt(0)) % avatarTones.length;
  }

  return avatarTones[Math.abs(hash) % avatarTones.length];
}
