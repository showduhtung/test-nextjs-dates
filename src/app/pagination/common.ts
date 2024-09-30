import type { PageSearchParams } from "~/common/utilities";
import { DateFunctions, TZDate } from "~/libs/date-fns";

type Interval = "hourly" | "daily" | "weekly";
type IntervalDateRange = [Date, Date] | [TZDate, TZDate];

type PaginationSearchParams = Partial<{ selectedDates: IntervalDateRange; interval: Interval }>;
type PaginationPageProps = { searchParams: PageSearchParams<PaginationSearchParams> };

const intervals = { hourly: 1, daily: 7, weekly: 30 } as const;

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
};
export { intervals };
