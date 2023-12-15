import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workout",
};

export default function WorkoutPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col">
     {children}
    </main>
  );
}
