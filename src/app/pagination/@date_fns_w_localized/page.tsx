import React from "react";
import { parseSearchParams } from "~/common/utilities";
import {
  mockFetchLocalizedBoundaries,
  PaginationPageProps,
  PaginationSearchParams,
} from "../common";
import { IntervalPagination } from "../_components/interval-pagination";
import { IntervalSelect } from "../_components/interval-select";
import {
  addDays,
  differenceInCalendarDays,
  endOfDay,
  isAfter,
  startOfDay,
  subDays,
  isSameDay,
  format,
} from "date-fns";
import { TZDate } from "~/libs/date-fns";

const functions = {
  addDays,
  differenceInCalendarDays,
  endOfDay,
  isAfter,
  startOfDay,
  subDays,
  isSameDay,
  format,
};

export default DateFnsWithLocalizedDatesPage;

async function DateFnsWithLocalizedDatesPage({ searchParams }: PaginationPageProps) {
  const { interval, selectedDates } = parseSearchParams<PaginationSearchParams>(searchParams);
  if (!interval || !selectedDates) return <>Missing params</>;

  const [boundaryStart, boundaryEnd = TZDate.tz()] = await mockFetchLocalizedBoundaries();
  const [selectedStart, selectedEnd] = selectedDates;

  return (
    <div className="flex flex-col gap-12">
      <IntervalSelect
        interval={interval}
        selectedDates={[new TZDate(selectedStart), new TZDate(selectedEnd)]}
        functions={functions}
        boundaries={[boundaryStart, boundaryEnd]}
      />
      <IntervalPagination
        interval={interval}
        selectedDates={[new TZDate(selectedStart), new TZDate(selectedEnd)]}
        functions={functions}
        boundaries={[new TZDate(boundaryStart), new TZDate(boundaryEnd)]}
      />
    </div>
  );
}
