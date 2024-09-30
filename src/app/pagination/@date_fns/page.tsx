import React from "react";
import { parseSearchParams } from "~/common/utilities";
import { mockFetchBoundaries, PaginationPageProps, PaginationSearchParams } from "../common";
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

export default async function DateFnsPage({ searchParams }: PaginationPageProps) {
  const { interval, selectedDates } = parseSearchParams<PaginationSearchParams>(searchParams);
  if (!interval || !selectedDates) return <>Missing params</>;

  const boundaries = await mockFetchBoundaries();

  return (
    <div className="flex flex-col gap-12">
      <IntervalSelect interval={interval} selectedDates={selectedDates} functions={functions} />
      <IntervalPagination
        interval={interval}
        selectedDates={selectedDates}
        functions={functions}
        boundaries={boundaries}
      />
    </div>
  );
}
