import type { AuthProviderId } from "@/content/auth";

type AuthProviderIconProps = {
  providerId: Exclude<AuthProviderId, "email">;
  className?: string;
};

export function AuthProviderIcon({ providerId, className }: AuthProviderIconProps) {
  if (providerId === "google") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          d="M20.64 12.2c0-.64-.06-1.25-.17-1.84H12v3.48h4.84c-.21 1.12-.84 2.07-1.79 2.71v2.25h2.9c1.69-1.56 2.69-3.86 2.69-6.6Z"
          fill="#4285F4"
        />
        <path
          d="M12 21c2.43 0 4.47-.8 5.96-2.18l-2.9-2.25c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H3.95v2.34A9 9 0 0 0 12 21Z"
          fill="#34A853"
        />
        <path
          d="M6.95 13.71A5.4 5.4 0 0 1 6.66 12c0-.59.1-1.15.29-1.71V7.95H3.95A9 9 0 0 0 3 12c0 1.45.35 2.82.95 4.05l3-2.34Z"
          fill="#FBBC05"
        />
        <path
          d="M12 6.57c1.32 0 2.5.45 3.43 1.34L18 5.34C16.47 3.9 14.43 3 12 3c-3.52 0-6.56 2.02-8.05 4.95l3 2.34c.71-2.13 2.7-3.72 5.05-3.72Z"
          fill="#EA4335"
        />
      </svg>
    );
  }

  if (providerId === "apple") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path
          fill="currentColor"
          d="M15.52 3.3c.76-.92 1.27-2.17 1.14-3.3-1.1.04-2.43.73-3.2 1.65-.7.82-1.32 2.1-1.16 3.24 1.22.1 2.46-.62 3.22-1.6Zm3.84 13.5c-.53 1.22-.78 1.76-1.46 2.83-.94 1.47-2.26 3.3-3.9 3.3-1.46.02-1.84-.93-3.82-.92-1.98 0-2.4.94-3.85.9-1.64-.02-2.9-1.68-3.84-3.15-2.63-4.1-2.9-8.91-1.28-11.4 1.14-1.77 2.95-2.82 4.66-2.82 1.75 0 2.85.96 4.3.96 1.42 0 2.29-.97 4.29-.97 1.52 0 3.13.83 4.27 2.27-3.73 2.04-3.12 7.42.63 9Z"
        />
      </svg>
    );
  }

  if (providerId === "yandex") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <text
          x="12"
          y="17"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fontFamily="Georgia, serif"
          fill="#FC3F1D"
        >
          Я
        </text>
      </svg>
    );
  }

  if (providerId === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="#1877F2" />
        <path
          d="M13.39 20v-6.35h2.13l.32-2.48h-2.45V9.6c0-.72.2-1.2 1.23-1.2H16V6.18a19 19 0 0 0-1.95-.1c-1.93 0-3.25 1.18-3.25 3.34v1.75H8.61v2.48h2.19V20h2.59Z"
          fill="#ffffff"
        />
      </svg>
    );
  }

  return (
    providerId === "sber" ? (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <defs>
          <linearGradient id="sberGradient" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#21A038" />
            <stop offset="0.55" stopColor="#4BBE2A" />
            <stop offset="1" stopColor="#7ECF2D" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#sberGradient)" />
        <path
          d="M7.4 12.2 10.15 15l6.45-6.25"
          fill="none"
          stroke="#ffffff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="6" fill="#2787F5" />
        <text
          x="12"
          y="15.8"
          textAnchor="middle"
          fontSize="8.2"
          fontWeight="700"
          fontFamily="Manrope, sans-serif"
          fill="#ffffff"
        >
          VK
        </text>
      </svg>
    )
  );
}
