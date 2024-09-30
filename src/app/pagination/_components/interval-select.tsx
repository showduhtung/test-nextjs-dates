import Link from "next/link";
import { SearchParams } from "~/common/utilities";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/dropdown-menu";
import { Button } from "~/components/button";
import {
  intervals,
  type Interval,
  type IntervalDateRange,
  type IntervalComponenntProps,
} from "../common";

export function IntervalSelect({
  interval,
  selectedDates,
  functions,
  boundaries: [boundaryStart, boundaryEnd],
}: IntervalComponenntProps) {
  const [start] = selectedDates;
  const { addDays, differenceInCalendarDays, endOfDay, isAfter, startOfDay, subDays } = functions;

  function createInterval(interval: Interval): IntervalDateRange {
    // Get cycle length based on the interval, and return boundaries if the cycle exceeds max range.
    const cycle = intervals[interval];
    const maxDifference = differenceInCalendarDays(boundaryEnd, boundaryStart);

    if (maxDifference < cycle) return [boundaryStart, boundaryEnd];

    // Calculate the projected end of the cycle, and check if it fits within boundaries.
    const cycleEnd = endOfDay(addDays(start, cycle - 1));
    if (!isAfter(cycleEnd, boundaryEnd)) return [start, cycleEnd];

    // If cycle exceeds boundaries, adjust start to fit the range and return updated interval.
    return [startOfDay(subDays(boundaryEnd, cycle)), boundaryEnd];
  }

  const params = (["hourly", "daily", "weekly"] as const).map((option) => {
    const param = new SearchParams({ interval: option });
    param.set("interval", option);
    param.set("selectedDates", createInterval(option));
    return { searchParam: param, option, selectedDates: createInterval(option) };
  });

  return (
    <div className="flex w-full min-w-[850px] flex-col gap-4">
      <span className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Interval Selector Component</h1>
        <DropdownMenu>
          <DropdownMenuTrigger className="text-lg" asChild>
            <Button className="font-bold capitalize">{interval}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {params.map(({ searchParam, option }) => (
              <DropdownMenuItem asChild key={searchParam.toString()}>
                <Link href={`/pagination?${searchParam.toString()}`} className="capitalize">
                  {option}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </span>
      <div className="flex flex-col gap-4 rounded-md border-2 border-primary p-4">
        {params.map(({ searchParam, option, selectedDates: [start, end] }) => (
          <div className="flex flex-col" key={searchParam.toString()}>
            <strong className="text-2xl capitalize">{option}:</strong>
            <div className="flex items-center justify-between text-primary">
              <dfn className="text-xs">
                <code>&quot;selectedDates.toISOString()&quot;</code>
              </dfn>

              <div className="flex w-[450px] gap-2 text-sm">
                <time suppressHydrationWarning>{start.toISOString()}</time>
                <p>|</p>
                <time suppressHydrationWarning>{end.toISOString()}</time>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
