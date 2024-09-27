import Link from "next/link";
import "./globals.css";
import { Display } from "~/testers";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <div className="flex gap-12 ">
            <Link href="/">Static</Link>
            <Link href="/dynamic">Dynamic</Link>
            <Link href="/ppr">PPR</Link>
            <Link href="/pagination">Pagination</Link>
          </div>
          <div className="flex flex-col justify-between justify-items-center gap-16">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
              {children}
            </main>
            <footer>
              <div className="justify-items-center w-fit">
                <Display label="pattern">yyyy-MM-dd HH:mm:ss</Display>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
