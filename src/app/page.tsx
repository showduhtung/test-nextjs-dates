import { format } from "date-fns";
import type { ReactNode } from "react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Hello world!</h1>
        <div className="flex flex-col gap-2">
          <Display label="new Date().toISOString()">
            {new Date().toISOString()}
          </Display>
          <Display label={`format(new Date(), "yyyy-MM-dd HH:mm")`}>
            {format(new Date(), "yyyy-MM-dd HH:mm")}
          </Display>
        </div>
      </main>
    </div>
  );
}

function Display({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="flex gap-8">
      <h3 className="font-bold">{label}:</h3>
      {children}
    </span>
  );
}
