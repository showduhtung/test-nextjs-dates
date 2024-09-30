import React from "react";
import { parseSearchParams } from "~/common/utilities";
import { PaginationPageProps, PaginationSearchParams } from "../common";
import { IntervalPagination } from "../_components/interval-pagination";
import { IntervalSelect } from "../_components/interval-select";
import * as DateFns from "date-fns";

export default async function NativePage({ searchParams }: PaginationPageProps) {
  const { interval, selectedDates } = parseSearchParams<PaginationSearchParams>(searchParams);
  if (!interval || !selectedDates) return <>Missing params</>;

  return (
    <div className="flex flex-col gap-12">
      <IntervalSelect
        interval={interval}
        selectedDates={selectedDates}
        functions={
          {
            addDays: (start: Date, number) => new Date(start.getTime() + number * day),
            differenceInCalendarDays: (start: Date, end: Date) =>
              Math.floor((end.getTime() - start.getTime()) / day),
            endOfDay: (date: Date) => {
              const time = new Date(date);
              time.setHours(23, 59, 59, 999);
              return time;
            },
            isAfter: (dateLeft: Date, dateRight: Date) => dateLeft.getTime() > dateRight.getTime(),
            startOfDay: (date: Date) => {
              const time = new Date(date);
              time.setHours(0, 0, 0, 0);
              return time;
            },
            subDays: (start: Date, number) => new Date(start.getTime() - number * day),
          } as typeof DateFns
        }
      />
      <IntervalPagination interval={interval} selectedDates={selectedDates} />
    </div>
  );
}

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;
