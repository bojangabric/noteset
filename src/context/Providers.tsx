"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      enableColorScheme={true}
      themes={["system", "dark", "light"]}
    >
      {children}
      <Toaster duration={4000} position="bottom-center" />
    </ThemeProvider>
  );
}
