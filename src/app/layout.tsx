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
          <div className="container mx-auto flex min-h-screen flex-col justify-between gap-8 p-8">
            <div className="font-[family-name:var(--font-geist-sans)]">
              <div className="mb-12 flex justify-between">
                <Navigation />
                <ModeToggle />
              </div>
              {children}
            </div>
            <footer>
              <div className="w-fit justify-items-center">
                <Display label="pattern">{PATTERN}</Display>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

function Navigation() {
  return (
    <div className="flex gap-12">
      <NavLink href="/">Static</NavLink>
      <NavLink href="/dynamic">Dynamic</NavLink>
      <NavLink href="/ppr">PPR</NavLink>
      <NavLink href="/pagination">Pagination</NavLink>
      <NavLink href="/hourly">Hourly Blocks</NavLink>
      <NavLink href="/shifts">Shifts</NavLink>
    </div>
  );
}
