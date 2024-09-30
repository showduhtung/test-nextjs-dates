import * as DateFns from "date-fns";
import * as DateFnsTz from "@date-fns/tz";

import { TIME_ZONE } from "~/common";

class TZDate extends DateFnsTz.TZDate {
  constructor(date: Date | string | number, _timeZone?: string) {
    if (typeof date === "string") super(date, TIME_ZONE);
    else if (typeof date === "number") super(date, TIME_ZONE);
    else if (date instanceof Date) super(date, TIME_ZONE);
    else throw new Error("Invalid date type");
  }
  static tz(_timeZone?: string) {
    return DateFnsTz.TZDate.tz(TIME_ZONE);
  }
}

function addDays(...args: Parameters<typeof DateFns.addDays>) {
  const [date, ...rest] = args;
  return DateFns.addDays(new TZDate(date), ...rest);
}

function addHours(...args: Parameters<typeof DateFns.addHours>) {
  const [date, ...rest] = args;
  return DateFns.addHours(new TZDate(date), ...rest);
}

function addMinutes(...args: Parameters<typeof DateFns.addMinutes>) {
  const [date, ...rest] = args;
  return DateFns.addMinutes(new TZDate(date), ...rest);
}

function addSeconds(...args: Parameters<typeof DateFns.addSeconds>) {
  const [date, ...rest] = args;
  return DateFns.addSeconds(new TZDate(date), ...rest);
}

function getHours(...args: Parameters<typeof DateFns.getHours>) {
  const [date, ...rest] = args;
  return DateFns.getHours(new TZDate(date), ...rest);
}

function differenceInCalendarDays(...args: Parameters<typeof DateFns.differenceInCalendarDays>) {
  const [dateLeft, dateRight, ...rest] = args;
  return DateFns.differenceInCalendarDays(new TZDate(dateLeft), new TZDate(dateRight), ...rest);
}

function endOfDay(...args: Parameters<typeof DateFns.endOfDay>) {
  const [date, ...options] = args;
  return DateFns.endOfDay(new TZDate(date), ...options);
}

function format(...args: Parameters<typeof DateFns.format>) {
  const [date, ...options] = args;
  return DateFns.format(new TZDate(date), ...options);
}

function isAfter(...args: Parameters<typeof DateFns.isAfter>) {
  const [dateLeft, dateRight] = args;
  return DateFns.isAfter(new TZDate(dateLeft), new TZDate(dateRight));
}

function isSameDay(...args: Parameters<typeof DateFns.isSameDay>) {
  const [dateLeft, dateRight, ...options] = args;
  return DateFns.isSameDay(new TZDate(dateLeft), new TZDate(dateRight), ...options);
}

function startOfDay(...args: Parameters<typeof DateFns.startOfDay>) {
  const [date, ...options] = args;
  return DateFns.startOfDay(new TZDate(date), ...options);
}

function startOfHour(...args: Parameters<typeof DateFns.startOfHour>) {
  const [date, ...options] = args;
  return DateFns.startOfHour(new TZDate(date), ...options);
}

function subDays(...args: Parameters<typeof DateFns.subDays>) {
  const [date, ...options] = args;
  return DateFns.subDays(new TZDate(date), ...options);
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
  startOfHour,
  addHours,
  addMinutes,
  addSeconds,
  getHours,
  TZDate,
};
