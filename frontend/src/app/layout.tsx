import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "TradeAI",
  description: "TradeAI turns one product into a full ready-to-use content pack.",
  applicationName: "TradeAI"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
