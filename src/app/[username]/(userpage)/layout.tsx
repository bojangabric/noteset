import { UserPageHeader } from "@/components/user/UserPageHeader";

export default function UserPagesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { username: string };
}) {
  return (
    <main className="flex min-h-screen flex-col">
      <UserPageHeader username={params.username} />
      <div className="flex grow flex-col px-6 pb-4 pt-48">{children}</div>
    </main>
  );
}
