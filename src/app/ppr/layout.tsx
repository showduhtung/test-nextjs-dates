import type { ReactNode } from "react";

type LayoutProps = { children: ReactNode; force_dynamic: ReactNode };

export default function RootLayout({ children, force_dynamic }: LayoutProps) {
  return (
    <div>
      <h1 className="text-4xl font-bold">PPR Rendered</h1>
      {children}
      {force_dynamic}
    </div>
  );
}
