import React from "react";
import { parseSearchParams } from "~/common/utilities";
import { mockFetchBoundaries } from "~/data";
import {
  addDays,
  subDays,
  startOfDay,
  endOfDay,
  differenceInCalendarDays,
  isSameDay,
  format,
  isAfter,
} from "~/libs/native-date";

import type { PaginationPageProps, PaginationSearchParams } from "../common";
import { IntervalPagination, IntervalSelect } from "../_components";
import { DateFunctions } from "~/libs/date-fns";

const functions = {
  addDays,
  subDays,
  startOfDay,
  endOfDay,
  differenceInCalendarDays,
  isSameDay,
  format,
  isAfter,
} as DateFunctions;

export default async function NativePage({ searchParams }: PaginationPageProps) {
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
