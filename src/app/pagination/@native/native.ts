import * as DateFns from "date-fns";

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

const addDays = (start: Date, number: number) => new Date(start.getTime() + number * day);
const subDays = (start: Date, number: number) => new Date(start.getTime() - number * day);
const startOfDay = (date: Date) => {
  const time = new Date(date);
  time.setHours(0, 0, 0, 0);
  return time;
};
const endOfDay = (date: Date) => {
  const time = new Date(date);
  time.setHours(23, 59, 59, 999);
  return time;
};
const differenceInCalendarDays = (start: Date, end: Date) =>
  Math.floor((end.getTime() - start.getTime()) / day);
const isSameDay = (dateLeft: Date, dateRight: Date) =>
  startOfDay(dateLeft).getTime() === startOfDay(dateRight).getTime();

const format = (date: Date, _pattern: string) =>
  date.toLocaleDateString(undefined, { timeZone: "UTC" });

const functions = {
  addDays,
  subDays,
  startOfDay,
  endOfDay,
  differenceInCalendarDays,
  isSameDay,
  format,
} as typeof DateFns;

export { functions };
