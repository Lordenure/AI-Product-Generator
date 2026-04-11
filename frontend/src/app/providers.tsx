"use client";

import type { ReactNode } from "react";

import { AuthProvider } from "@/features/auth/AuthProvider";
import { StudioStateProvider } from "@/features/studio/StudioStateProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <StudioStateProvider>{children}</StudioStateProvider>
    </AuthProvider>
  );
}
