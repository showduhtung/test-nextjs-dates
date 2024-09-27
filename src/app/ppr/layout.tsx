import type { ReactNode } from "react";

type LayoutProps = { children: ReactNode; force_dynamic: ReactNode };

export default function RootLayout({ children, force_dynamic }: LayoutProps) {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold">PPR Rendered</h1>
      {children}
      {force_dynamic}
    </main>
  );
}
