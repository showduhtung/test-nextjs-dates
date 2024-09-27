import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import type { ReactNode } from "react";
import { PATTERN } from "~/common";
import { Time } from "~/components/time";

function Display({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="flex justify-between gap-8">
      <h3 className="font-bold">{label}:</h3>
      {children}
    </span>
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
        <Display label={`format(new Date(), PATTERN)`}>
          {format(new Date(), PATTERN)}
        </Display>
        <Display label={`format(new TZDate(), PATTERN)`}>
          {format(new TZDate(), PATTERN)}
        </Display>
        <Display label={`format(TZDate.tz("Asia/Singapore"), PATTERN)`}>
          {format(TZDate.tz("Asia/Singapore"), PATTERN)}
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
          <Time pattern={PATTERN}>{new Date().toISOString()}</Time>
        </Display>

        <div />
        <Display label={`format(new Date(), PATTERN)`}>
          <Time pattern={PATTERN}>{format(new Date(), PATTERN)}</Time>
        </Display>
        <Display label={`format(new TZDate(), PATTERN)`}>
          <Time pattern={PATTERN}>{format(new TZDate(), PATTERN)}</Time>
        </Display>
        <Display label={`format(TZDate.tz("Asia/Singapore"), PATTERN)`}>
          <Time pattern={PATTERN}>
            {format(TZDate.tz("Asia/Singapore"), PATTERN)}
          </Time>
        </Display>
      </div>

      <div className="h-8" />
    </div>
  );
}

export { Display, TestDate, TextTZDate, TZDateClient };
