import React from "react";
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

import { type DateFunctions } from "~/libs/date-fns";
import { mockFetchLocalizedBoundaries } from "~/data";
import { parseSearchParams } from "~/common/utilities";
import type { PaginationPageProps, PaginationSearchParams } from "../common";
import { IntervalPagination, IntervalSelect } from "../_components";
import { TZDate } from "@date-fns/tz";

const functions = {
  addDays,
  differenceInCalendarDays,
  endOfDay,
  isAfter,
  startOfDay,
  subDays,
  isSameDay,
  format,
} as DateFunctions;

export default async function DateFnsPage({ searchParams }: PaginationPageProps) {
  const { interval, selectedDates } = parseSearchParams<PaginationSearchParams>(searchParams);
  if (!interval || !selectedDates) return <>Missing params</>;

  const [first, second = new Date()] = await mockFetchLocalizedBoundaries();

  const [boundaryStart, boundaryEnd] = [new TZDate(first), new TZDate(second)];
  const [selectedStart, selectedEnd] = [new TZDate(selectedDates[0]), new TZDate(selectedDates[1])];

  return (
    <div className="flex flex-col gap-12">
      <IntervalSelect
        interval={interval}
        selectedDates={[selectedStart, selectedEnd]}
        functions={functions}
        boundaries={[boundaryStart, boundaryEnd]}
      />
      <IntervalPagination
        interval={interval}
        selectedDates={[selectedStart, selectedEnd]}
        functions={functions}
        boundaries={[boundaryStart, boundaryEnd]}
      />

      <IntervalSelect
        interval={interval}
        selectedDates={selectedDates}
        functions={functions}
        boundaries={[first, second]}
      />
      <IntervalPagination
        interval={interval}
        selectedDates={selectedDates}
        functions={functions}
        boundaries={[first, second]}
      />
    </div>
  );
}
