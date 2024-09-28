import "./globals.css";
import { Display } from "~/app/_components";
import { PATTERN } from "~/common";
import { NavLink } from "~/components/nav-link";
import { ThemeProvider } from "~/components/theme-provider";
import { ModeToggle } from "~/components/theme-toggle";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid min-h-screen grid-rows-[20px_1fr_20px] gap-12 p-20 pb-12 font-[family-name:var(--font-geist-sans)]">
            <div className="flex justify-between">
              <div className="flex gap-12">
                <NavLink href="/">Static</NavLink>
                <NavLink href="/dynamic">Dynamic</NavLink>
                <NavLink href="/ppr">PPR</NavLink>
                <NavLink href="/pagination">Pagination</NavLink>
                <NavLink href="/hourly">Hourly Blocks</NavLink>
              </div>
              <ModeToggle />
            </div>
            <div className="container mx-auto flex flex-col justify-between justify-items-center gap-16">
              {children}
              <footer>
                <div className="w-fit justify-items-center">
                  <Display label="pattern">{PATTERN}</Display>
                </div>
              </footer>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
