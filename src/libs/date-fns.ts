import * as DateFns from "date-fns";
import { TZDate as DateTZ } from "@date-fns/tz";

import { TIME_ZONE } from "~/common";

export class TZDate extends DateTZ {
  constructor(date: Date | string | number, _timeZone?: string) {
    if (typeof date === "string") super(date, TIME_ZONE);
    else if (typeof date === "number") super(date, TIME_ZONE);
    else if (date instanceof Date) super(date, TIME_ZONE);
    else throw new Error("Invalid date type");
  }
}

function addDays(...args: Parameters<typeof DateFns.addDays>) {
  const [date, days, ...rest] = args;
  return DateFns.addDays(new TZDate(date, TIME_ZONE), days, ...rest);
}

function differenceInCalendarDays(...args: Parameters<typeof DateFns.differenceInCalendarDays>) {
  const [dateLeft, dateRight, ...rest] = args;
  return DateFns.differenceInCalendarDays(
    new TZDate(dateLeft, TIME_ZONE),
    new TZDate(dateRight, TIME_ZONE),
    ...rest,
  );
}

function endOfDay(...args: Parameters<typeof DateFns.endOfDay>) {
  const [date, ...options] = args;
  return DateFns.endOfDay(new TZDate(date, TIME_ZONE), ...options);
}

function format(...args: Parameters<typeof DateFns.format>) {
  const [date, pattern, ...options] = args;
  return DateFns.format(new TZDate(date, TIME_ZONE), pattern, ...options);
}

function isAfter(...args: Parameters<typeof DateFns.isAfter>) {
  const [dateLeft, dateRight] = args;
  return DateFns.isAfter(new TZDate(dateLeft, TIME_ZONE), new TZDate(dateRight, TIME_ZONE));
}

function isSameDay(...args: Parameters<typeof DateFns.isSameDay>) {
  const [dateLeft, dateRight, ...options] = args;
  return DateFns.isSameDay(
    new TZDate(dateLeft, TIME_ZONE),
    new TZDate(dateRight, TIME_ZONE),
    ...options,
  );
}

function startOfDay(...args: Parameters<typeof DateFns.startOfDay>) {
  const [date, ...options] = args;
  return DateFns.startOfDay(new TZDate(date, TIME_ZONE), ...options);
}

function subDays(...args: Parameters<typeof DateFns.subDays>) {
  console.log({ args });
  const [date, days, ...options] = args;
  return DateFns.subDays(new TZDate(date, TIME_ZONE), days, ...options);
}

export {
  addDays,
  differenceInCalendarDays,
  endOfDay,
  format,
  isAfter,
  isSameDay,
  startOfDay,
  subDays,
};
