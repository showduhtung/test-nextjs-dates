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
const startOfHour = (date: Date) => {
  const time = new Date(date);
  time.setMinutes(0, 0, 0);
  return time;
};
const addHours = (date: Date, number: number) => {
  const time = new Date(date);
  time.setHours(time.getHours() + number);
  return time;
};
const getHours = (date: Date) => date.getHours();

const differenceInCalendarDays = (start: Date, end: Date) => {
  return Math.abs(Math.floor((end.getTime() - start.getTime()) / day));
};

const isSameDay = (dateLeft: Date, dateRight: Date) =>
  startOfDay(dateLeft).getTime() === startOfDay(dateRight).getTime();

const format = (date: Date, _pattern: string) => formatter.format(date);

const formatter = new Intl.DateTimeFormat("en-GB", {
  year: "2-digit",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "numeric",
});

const isAfter = (dateLeft: Date, dateRight: Date) => dateLeft.getTime() > dateRight.getTime();

export {
  addDays,
  subDays,
  startOfDay,
  endOfDay,
  differenceInCalendarDays,
  isSameDay,
  format,
  isAfter,
  startOfHour,
  addHours,
  getHours,
};
