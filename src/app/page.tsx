import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import type { ReactNode } from "react";
import { Time } from "~/components/time";

// export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Hello world!</h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-20">
          <TestDate />
          <TextTZDate />
          <TZDateClient />
        </div>
      </main>
      <footer>
        <Display label="pattern">yyyy-MM-dd HH:mm</Display>
      </footer>
    </div>
  );
}

function TestDate() {
  return (
    <div>
      <h2 className="font-bold">Native Display</h2>
      <div className="h-8" />
      <div className="flex flex-col gap-2">
        <Display label="new Date().toISOString()">
          {new Date().toISOString()}
        </Display>
      </div>
    </div>
  );
}

function TextTZDate() {
  return (
    <div>
      <h2 className="font-bold">Testing TZ Date</h2>
      <div className="h-8" />
      <div className="flex flex-col gap-2">
        <Display label="new Date().toISOString()">
          {new Date().toISOString()}
        </Display>

        <div />
        <Display label={`format(new Date(), pattern)`}>
          {format(new Date(), "yyyy-MM-dd HH:mm")}
        </Display>
        <Display label={`format(new TZDate(), pattern)`}>
          {format(new TZDate(), "yyyy-MM-dd HH:mm")}
        </Display>
        <Display label={`format(TZDate.tz("Asia/Singapore"), pattern)`}>
          {format(TZDate.tz("Asia/Singapore"), "yyyy-MM-dd HH:mm")}
        </Display>
      </div>

      <div className="h-8" />
    </div>
  );
}

function TZDateClient() {
  return (
    <div>
      <h2 className="font-bold">Testing TZ Date with Client components</h2>
      <div className="h-8" />
      <div className="flex flex-col gap-2">
        <Display label="new Date().toISOString()">
          <Time>{new Date().toISOString()}</Time>
        </Display>

        <div />
        <Display label={`format(new Date(), pattern)`}>
          <Time>{format(new Date(), "yyyy-MM-dd HH:mm")}</Time>
        </Display>
        <Display label={`format(new TZDate(), pattern)`}>
          <Time>{format(new TZDate(), "yyyy-MM-dd HH:mm")}</Time>
        </Display>
        <Display label={`format(TZDate.tz("Asia/Singapore"), pattern)`}>
          <Time>{format(TZDate.tz("Asia/Singapore"), "yyyy-MM-dd HH:mm")}</Time>
        </Display>
      </div>

      <div className="h-8" />
    </div>
  );
}

function Display({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="flex justify-between gap-8">
      <h3 className="font-bold">{label}:</h3>
      {children}
    </span>
  );
}
