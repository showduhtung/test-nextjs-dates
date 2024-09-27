import type { ReactNode } from "react";
import { Display } from "~/testers";

type LayoutProps = { children: ReactNode; force_dynamic: ReactNode };

export default function RootLayout({ children, force_dynamic }: LayoutProps) {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">PPR Rendered</h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {children}
        {force_dynamic}
      </main>
      <footer>
        <Display label="pattern">yyyy-MM-dd HH:mm:ss</Display>
      </footer>
    </div>
  );
}
