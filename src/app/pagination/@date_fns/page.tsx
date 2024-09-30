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
import { mockFetchBoundaries } from "~/data";
import { parseSearchParams } from "~/common/utilities";
import type { PaginationPageProps, PaginationSearchParams } from "../common";
import { IntervalPagination, IntervalSelect } from "../_components";

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

  const [boundaryStart, boundaryEnd = new Date()] = await mockFetchBoundaries();

  return (
    <div className="flex flex-col gap-12">
      <IntervalSelect
        interval={interval}
        selectedDates={selectedDates}
        functions={functions}
        boundaries={[boundaryStart, boundaryEnd]}
      />
      <IntervalPagination
        interval={interval}
        selectedDates={selectedDates}
        functions={functions}
        boundaries={[boundaryStart, boundaryEnd]}
      />
    </div>
  );
}
