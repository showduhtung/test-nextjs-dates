import "./globals.css";
import { Display } from "~/testers";
import { NavLink } from "~/components/nav-link";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
          <div className="flex gap-12">
            <NavLink href="/">Static</NavLink>
            <NavLink href="/dynamic">Dynamic</NavLink>
            <NavLink href="/ppr">PPR</NavLink>
            <NavLink href="/pagination">Pagination</NavLink>
            <NavLink href="/hourly">Hourly Blocks</NavLink>
          </div>
          <div className="flex flex-col justify-between justify-items-center gap-16">
            <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
              {children}
            </main>
            <footer>
              <div className="w-fit justify-items-center">
                <Display label="pattern">yyyy-MM-dd HH:mm:ss</Display>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
