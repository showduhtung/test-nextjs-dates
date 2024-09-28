import type { ReactNode } from "react";

type LayoutProps = { children: ReactNode; force_dynamic: ReactNode };

export default function RootLayout({ children, force_dynamic }: LayoutProps) {
  return (
    <main className="row-start-2 flex flex-col items-stretch gap-8">
      <h1 className="text-4xl font-bold">PPR Rendered</h1>
      <div className="flex gap-20">
        <h3 className="w-12 text-2xl font-bold">Static</h3>
        {children}
      </div>

      <div className="flex gap-20">
        <h3 className="w-12 text-2xl font-bold">Dynamic</h3>
        {force_dynamic}
      </div>
    </main>
  );
}
