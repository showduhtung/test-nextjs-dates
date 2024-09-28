import Link from "next/link";
import { parseSearchParams, PageSearchParams, SearchParams } from "~/common/utilities";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/dropdown-menu";
import { Button } from "~/components/button";
import {
  TZDate,
  addDays,
  differenceInCalendarDays,
  endOfDay,
  isAfter,
  startOfDay,
  subDays,
} from "~/libs/date-fns";
import { mockFetchBoundaries } from "../common";

const intervals = { hourly: 1, daily: 7, weekly: 30 } as const;

type Interval = "hourly" | "daily" | "weekly";
type IntervalDateRange = [Date, Date];
type PaginationSearchParams = Partial<{ selectedDates: IntervalDateRange; interval: Interval }>;
type IntervalSelectProps = {
  searchParams: PageSearchParams<PaginationSearchParams>;
  boundaries: IntervalDateRange;
};

export default IntervalSelect;

async function IntervalSelect({ searchParams }: IntervalSelectProps) {
  const { interval, selectedDates } = parseSearchParams<PaginationSearchParams>(searchParams);
  if (!selectedDates || !interval) return <>Missing params</>;

  const [boundaryStart, boundaryEnd] = await mockFetchBoundaries();
  const [start] = selectedDates;

  function createInterval(interval: Interval): IntervalDateRange {
    // Get cycle length based on the interval, and return boundaries if the cycle exceeds max range.
    const cycle = intervals[interval];
    const maxDifference = differenceInCalendarDays(boundaryEnd, boundaryStart);
    if (maxDifference < cycle) return [boundaryStart, boundaryEnd];

    // Calculate the projected end of the cycle, and check if it fits within boundaries.
    const cycleEnd = endOfDay(addDays(new TZDate(start), cycle - 1));
    if (!isAfter(cycleEnd, boundaryEnd)) return [start, cycleEnd];

    // If cycle exceeds boundaries, adjust start to fit the range and return updated interval.
    return [startOfDay(subDays(boundaryEnd, cycle)), boundaryEnd];
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-lg" asChild>
        <Button className="font-bold capitalize">{interval}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {(["hourly", "daily", "weekly"] as const).map((option) => {
          const params = new SearchParams(searchParams);
          params.set("interval", option);
          params.set("selectedDates", createInterval(option));
          return (
            <DropdownMenuItem asChild key={option}>
              <Link href={`/pagination?${params.toString()}`} className="capitalize">
                {option}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
