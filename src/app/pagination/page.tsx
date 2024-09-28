import { max, min } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PATTERN } from "~/common";
import { parseSearchParams, PageSearchParams, SearchParams } from "~/common/utilities";
import { Time } from "~/components/time";
import { cn } from "~/libs/tailwind";
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
  format,
  isAfter,
  isSameDay,
  startOfDay,
  subDays,
} from "~/libs/date-fns";
const intervals = { hourly: 1, daily: 7, weekly: 30 } as const;

type Interval = "hourly" | "daily" | "weekly";
type IntervalDateRange = [Date, Date];
type PaginationSearchParams = Partial<{ selectedDates: IntervalDateRange; interval: Interval }>;

type PageProps = { searchParams: PageSearchParams<PaginationSearchParams> };
const [boundaryStart, boundaryEnd] = [
  new Date("Aug 31 2022, 04:00:00 PM GMT+0"),
  new Date("Sep 29 2026, 04:00:00 PM GMT+0"),
];

export default function PaginationPage({ searchParams }: PageProps) {
  const { selectedDates, interval } = parseSearchParams<PaginationSearchParams>(searchParams);

  if (!interval || !selectedDates) {
    const queries = new SearchParams(searchParams);
    if (!interval) queries.set("interval", "hourly");
    if (!selectedDates) queries.set("selectedDates", [boundaryStart, endOfDay(boundaryStart)]);

    redirect(`/pagination?${queries.toString()}`);
  }

  const [urlStart, urlEnd] = selectedDates;
  const [prev, next] = (() => {
    const cycle = intervals[interval];

    // Calculate the "back" and "forward" date with cycle, ensuring it doesn't go beyond boundaries
    const back = max([startOfDay(subDays(urlStart, cycle)), boundaryStart]);
    const forward = min([endOfDay(addDays(urlEnd, cycle)), boundaryEnd]);

    return [
      [back, endOfDay(subDays(urlStart, 1))],
      [startOfDay(addDays(urlEnd, 1)), forward],
    ];
  })();

  const prevParams = new SearchParams(searchParams);
  prevParams.set("selectedDates", prev);

  const nextParams = new SearchParams(searchParams);
  nextParams.set("selectedDates", next);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <strong className="text-2xl">Boundaries:</strong>
        <div className="flex items-center justify-between text-red-300">
          <dfn className="text-xs">
            <code>&quot;boundaryStart.toUTCString()&quot;</code>
          </dfn>

          <div className="flex w-[550px] justify-between gap-4">
            <p>{boundaryStart.toUTCString()}</p>
            <p>|</p>
            <p>{boundaryEnd.toUTCString()}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-red-300">
          <dfn className="text-xs">
            <code>&quot;boundaryStart.toISOString()&quot;</code>
          </dfn>

          <div className="flex w-[550px] justify-between gap-4">
            <p>{boundaryStart.toISOString()}</p>
            <p>|</p>
            <p>{boundaryEnd.toISOString()}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <strong className="text-2xl">URL State:</strong>

        <div className="flex items-center justify-between text-red-300">
          <dfn className="text-xs">
            <code>"&lt;Time&gt;&#123;urlStart.toISOString()&#125;&lt;/Time&gt;"</code>
          </dfn>

          <div className="flex w-[550px] justify-between gap-4">
            <Time pattern={PATTERN}>{urlStart.toISOString()}</Time>
            <p>|</p>
            <Time pattern={PATTERN}>{urlEnd.toISOString()}</Time>
          </div>
        </div>

        <div className="flex items-center justify-between text-red-300">
          <dfn className="text-xs">
            <code>&quot;format(url, pattern)&quot;</code>
          </dfn>

          <div className="flex w-[550px] justify-between gap-4">
            <time>{urlStart.toISOString()}</time>
            <p>|</p>
            <time>{urlEnd.toISOString()}</time>
          </div>
        </div>
      </div>

      <br />
      <br />

      <div className="flex items-center gap-2">
        <Button asChild size="icon" disabled={isSameDay(boundaryStart, urlStart)}>
          <Link
            href={`/pagination?${prevParams.toString()}`}
            className={cn(
              isSameDay(boundaryStart, urlStart) ? "pointer-events-none" : "pointer-events-auto",
            )}
          >
            <ChevronLeftIcon
              className={cn(isSameDay(boundaryStart, urlStart) ? "text-gray-400" : "text-red-400")}
            />
          </Link>
        </Button>

        <div className="flex justify-between text-lg">
          <IntervalSelect searchParams={searchParams} />
        </div>

        <Button asChild size="icon" disabled={isSameDay(boundaryEnd, urlEnd)}>
          <Link
            href={`/pagination?${nextParams.toString()}`}
            className={cn(
              isSameDay(boundaryEnd, urlEnd) ? "pointer-events-none" : "pointer-events-auto",
            )}
          >
            <ChevronRightIcon
              className={cn(isSameDay(boundaryEnd, urlEnd) ? "text-gray-400" : "text-red-400")}
            />
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {[
          { title: "Prev", dates: prev },
          { title: "Next", dates: next },
        ].map(({ title, dates }) => (
          <div key={title}>
            <div className="flex justify-between text-lg">
              <span className="flex items-baseline gap-4">
                <p>{title}:</p>
                <code className="text-sm">"format(date, pattern)"</code>
              </span>
              <div className="flex gap-4">
                <p>{format(dates[0], "MMM dd yyyy, hh:mm:ss a z")}</p>
                <p>|</p>
                <p>{format(dates[1], "MMM dd yyyy, hh:mm:ss a z")}</p>
              </div>
            </div>

            <div className="flex justify-between text-lg">
              <span className="flex items-baseline gap-4">
                <div className="w-11" />
                <code className="text-sm">"date.toISOString()"</code>
              </span>
              <div className="flex gap-4">
                <p>{dates[0].toISOString()}</p>
                <p>|</p>
                <p>{dates[1].toISOString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

type IntervalSelectProps = { searchParams: PageSearchParams<PaginationSearchParams> };

function IntervalSelect({ searchParams }: IntervalSelectProps) {
  const { interval, selectedDates } = parseSearchParams<PaginationSearchParams>(searchParams);
  if (!selectedDates || !interval) return <>Missing params</>;

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
        <Button className="font-bold capitalize text-red-400">{interval}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {options.map((option) => {
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

const options = ["hourly", "daily", "weekly"] as const;
