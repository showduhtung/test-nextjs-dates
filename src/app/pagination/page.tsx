import { addDays, endOfDay, format, isSameDay, max, min, startOfDay, subDays } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { parseSearchParams, SearchParams } from "~/common/utilities";
import { cn } from "~/libs/tailwind";
// const intervals = { hourly: 1, daily: 7, weekly: 30 } as const;

// type Interval = "hourly" | "daily" | "weekly";
type IntervalDateRange = [Date, Date];
type PageSearchParams = { selectedDates: IntervalDateRange };

type PageProps = { searchParams: SearchParams<PageSearchParams> };
const [boundaryStart, boundaryEnd] = [new Date("Sept 1, 2022"), new Date("Sept 30, 2026")];

export default function Page({ searchParams }: PageProps) {
  const { selectedDates: [start, end] = [new Date(), new Date()] } = parseSearchParams<{
    selectedDates: IntervalDateRange;
  }>(searchParams);

  const [prevParams, nextParams] = (() => {
    // const cycle = intervals[interval];
    const cycle = 1;

    // Calculate the "back" and "forward" date with cycle, ensuring it doesn't go beyond boundaries
    const back = max([startOfDay(subDays(start, cycle)), boundaryStart]);
    const forward = min([endOfDay(addDays(end, cycle)), boundaryEnd]);

    // "previous" =  ['back',                'back' + 'cycle']
    const previous = [back, endOfDay(addDays(back, cycle - 1))] as IntervalDateRange;

    // "next" =                 ['forward' - 'cycle',    'forward']
    const next = [startOfDay(subDays(forward, cycle - 1)), forward] as IntervalDateRange;

    // Clone the original searchParams and set "selectedDates" for both
    const prevParams = new URLSearchParams(searchParams);
    prevParams.set("selectedDates", JSON.stringify(previous));

    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("selectedDates", JSON.stringify(next));

    return [prevParams, nextParams];
  })();

  return (
    <div className="container">
      <div className="flex items-center gap-2">
        <Link
          href={`/pagination?${prevParams.toString()}`}
          className={cn(
            "button-press-effect flex h-7 w-7 min-w-0 items-center justify-center rounded-md border bg-white",
            isSameDay(boundaryStart, start) ? "border-grey-200 pointer-events-none" : "",
          )}
        >
          <ChevronLeftIcon
            className={cn(isSameDay(boundaryStart, start) ? "text-gray-400" : "text-black")}
          />
        </Link>
        <p className="text-lg">start: {format(start, "MMM dd hh:mm a")}</p>
        <Link
          href={`/pagination?${nextParams.toString()}`}
          className={cn(
            "button-press-effect flex h-7 w-7 min-w-0 items-center justify-center rounded-md border bg-white",
            isSameDay(boundaryEnd, end) ? "pointer-events-none text-gray-400" : "text-black",
          )}
        >
          <ChevronRightIcon className={cn(isSameDay(boundaryEnd, end) ? "text-gray-400" : "")} />
        </Link>
      </div>
    </div>
  );
}
