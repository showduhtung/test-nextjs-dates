import React from "react";
import { parseSearchParams } from "~/common/utilities";
import { DateFunctions, PaginationPageProps, PaginationSearchParams } from "../common";
import { IntervalPagination } from "../_components/interval-pagination";
import { IntervalSelect } from "../_components/interval-select";

import {
  addDays,
  differenceInCalendarDays,
  endOfDay,
  isAfter,
  startOfDay,
  subDays,
  format,
  isSameDay,
} from "~/libs/date-fns";

const functions = {
  addDays,
  differenceInCalendarDays,
  endOfDay,
  isAfter,
  startOfDay,
  subDays,
  format,
  isSameDay,
} as DateFunctions;

export default async function PaginationPage({ searchParams }: PaginationPageProps) {
  const { interval, selectedDates } = parseSearchParams<PaginationSearchParams>(searchParams);
  if (!interval || !selectedDates) return <>Missing params</>;

  return (
    <div className="flex flex-col gap-12">
      <IntervalSelect interval={interval} selectedDates={selectedDates} functions={functions} />
      <IntervalPagination interval={interval} selectedDates={selectedDates} functions={functions} />
    </div>
  );
}
