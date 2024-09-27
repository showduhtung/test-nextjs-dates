import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import type { ReactNode } from "react";
import { PATTERN } from "~/common";
import { Time } from "~/components/time";

function Display({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="flex justify-between gap-8 whitespace-nowrap">
      <h3 className="font-bold">{label}:</h3>
      {children}
    </span>
  );
}

function TestDate() {
  return (
    <div className="rounded-md border border-red-300 p-8">
      <h2 className="font-bold">Native Display</h2>
      <div className="h-8" />
      <div className="flex flex-col gap-2">
        <Display label="new Date().toISOString()">{new Date().toISOString()}</Display>
      </div>
    </div>
  );
}

function TextTZDate() {
  return (
    <div className="rounded-md border border-red-300 p-8">
      <h2 className="font-bold">Testing TZ Date</h2>
      <div className="h-8" />
      <div className="flex flex-col gap-2">
        <Display label="new Date().toISOString()">{new Date().toISOString()}</Display>

        <div />
        <Display label={`format(new Date())`}>{format(new Date(), PATTERN)}</Display>
        <Display label={`format(new TZDate())`}>{format(new TZDate(), PATTERN)}</Display>
        <Display label={`format(TZDate.tz("Asia/Singapore"))`}>
          {format(TZDate.tz("Asia/Singapore"), PATTERN)}
        </Display>
      </div>

      <div className="h-8" />
    </div>
  );
}

function TZDateClient() {
  return (
    <div className="rounded-md border border-red-300 p-8">
      <h2 className="font-bold">Testing TZ Date with Client components</h2>
      <div className="h-8" />
      <div className="flex flex-col gap-2">
        <Display label="new Date().toISOString()">
          <Time pattern={PATTERN}>{new Date().toISOString()}</Time>
        </Display>

        <div />
        <Display label={`format(new Date())`}>
          <Time pattern={PATTERN}>{format(new Date(), PATTERN)}</Time>
        </Display>
        <Display label={`format(new TZDate())`}>
          <Time pattern={PATTERN}>{format(new TZDate(), PATTERN)}</Time>
        </Display>
        <Display label={`format(TZDate.tz("Asia/Singapore"))`}>
          <Time pattern={PATTERN}>{format(TZDate.tz("Asia/Singapore"), PATTERN)}</Time>
        </Display>
      </div>

      <div className="h-8" />
    </div>
  );
}

export { Display, TestDate, TextTZDate, TZDateClient };
