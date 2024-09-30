import * as DateFns from "date-fns";
import type { PageSearchParams } from "~/common/utilities";
import { TZDate } from "~/libs/date-fns";

type Interval = "hourly" | "daily" | "weekly";
type IntervalDateRange = [Date, Date] | [TZDate, TZDate];

type PaginationSearchParams = Partial<{ selectedDates: IntervalDateRange; interval: Interval }>;
type PaginationPageProps = { searchParams: PageSearchParams<PaginationSearchParams> };

const intervals = { hourly: 1, daily: 7, weekly: 30 } as const;

type BoundaryResponse = [Date, Date | undefined];
async function mockFetchBoundaries(): Promise<BoundaryResponse> {
  const boundaries = [new Date("Aug 31 2022, 04:00:00 PM GMT+0"), undefined];
  const response = await new Promise<BoundaryResponse>((resolve) =>
    setTimeout(() => resolve(boundaries as BoundaryResponse), 100),
  );
  return response;
}

type LocalizedBoundaryResponse = [TZDate, TZDate | undefined];
async function mockFetchLocalizedBoundaries(): Promise<BoundaryResponse> {
  const boundaries = [new TZDate("Aug 31 2022, 04:00:00 PM GMT+0"), undefined];
  const response = await new Promise<LocalizedBoundaryResponse>((resolve) =>
    setTimeout(() => resolve(boundaries as LocalizedBoundaryResponse), 100),
  );
  return response;
}

type DateFunctions = {
  addDays: typeof DateFns.addDays;
  differenceInCalendarDays: typeof DateFns.differenceInCalendarDays;
  endOfDay: typeof DateFns.endOfDay;
  isAfter: typeof DateFns.isAfter;
  startOfDay: typeof DateFns.startOfDay;
  subDays: typeof DateFns.subDays;
  format: typeof DateFns.format;
  isSameDay: typeof DateFns.isSameDay;
};

type IntervalComponenntProps = {
  interval: Interval;
  selectedDates: IntervalDateRange;
  functions: DateFunctions;
  boundaries: IntervalDateRange;
};

export type {
  Interval,
  IntervalDateRange,
  PaginationPageProps,
  PaginationSearchParams,
  IntervalComponenntProps,
  DateFunctions,
};
export { mockFetchLocalizedBoundaries, mockFetchBoundaries, intervals };
