import React from "react";
import { parseSearchParams } from "~/common/utilities";
import { PaginationPageProps, PaginationSearchParams } from "../common";
import { IntervalPagination } from "../_components/interval-pagination";
import { IntervalSelect } from "../_components/interval-select";

import * as DateFns from "date-fns";
import {
  addDays,
  differenceInCalendarDays,
  endOfDay,
  isAfter,
  startOfDay,
  subDays,
} from "~/libs/date-fns";

export default async function PaginationPage({ searchParams }: PaginationPageProps) {
  const { interval, selectedDates } = parseSearchParams<PaginationSearchParams>(searchParams);
  if (!interval || !selectedDates) return <>Missing params</>;

  return (
    <div className="flex flex-col gap-12">
      <IntervalSelect
        interval={interval}
        selectedDates={selectedDates}
        functions={
          {
            addDays,
            differenceInCalendarDays,
            endOfDay,
            isAfter,
            startOfDay,
            subDays,
          } as typeof DateFns
        }
      />
      <IntervalPagination interval={interval} selectedDates={selectedDates} />
    </div>
  );
}
