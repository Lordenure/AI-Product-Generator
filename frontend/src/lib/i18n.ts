export const locales = ["en", "ru"] as const;

export type Locale = (typeof locales)[number];

export function getLocalizedPath(locale: Locale, path: string): string {
  if (locale === "ru") {
    return path === "/" ? "/ru" : `/ru${path}`;
  }

  return path;
}

export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const normalizedPath = normalizeEnglishPath(pathname);

  if (targetLocale === "ru") {
    return normalizedPath === "/" ? "/ru" : `/ru${normalizedPath}`;
  }

  return normalizedPath;
}

function normalizeEnglishPath(pathname: string): string {
  if (!pathname || pathname === "/") {
    return "/";
  }

  if (pathname === "/ru") {
    return "/";
  }

  if (pathname.startsWith("/ru/")) {
    return pathname.slice(3);
  }

  return pathname;
}
