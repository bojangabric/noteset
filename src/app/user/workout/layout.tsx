import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Noteset - workout",
  description: "Workout tracking app",
};

export default function WorkoutPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen flex-col px-4 pb-8 pt-4">
      {children}
    </main>
  );
}
