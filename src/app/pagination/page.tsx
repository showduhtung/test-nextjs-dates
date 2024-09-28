import { TZDate } from "@date-fns/tz";
import { addDays, endOfDay, format, isSameDay, max, min, startOfDay, subDays } from "date-fns";
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
    if (!selectedDates)
      queries.set("selectedDates", [
        new TZDate(boundaryStart),
        addDays(new TZDate(boundaryStart), 1),
      ]);

    redirect(`/pagination?${queries.toString()}`);
  }

  const [selectedStart, selectedEnd] = selectedDates;
  const [prev, next] = (() => {
    const cycle = intervals[interval];

    const [start, end] = [new TZDate(selectedStart), new TZDate(selectedEnd)];

    // Calculate the "back" and "forward" date with cycle, ensuring it doesn't go beyond boundaries
    const back = max([startOfDay(subDays(start, cycle)), boundaryStart]);
    const forward = min([endOfDay(addDays(end, cycle)), boundaryEnd]);

    return [
      [back, endOfDay(addDays(back, cycle - 1))],
      [startOfDay(subDays(forward, cycle - 1)), forward],
    ];
  })();

  const prevParams = new SearchParams(searchParams);
  prevParams.set("selectedDates", prev);

  const nextParams = new SearchParams(searchParams);
  nextParams.set("selectedDates", next);

  return (
    <div className="gap- flex h-full flex-col gap-4">
      <div className="flex justify-between text-lg">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-lg" asChild>
            <Button className="capitalize">{interval}</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {options.map((option) => {
              const params = new SearchParams(searchParams);
              params.set("interval", option);
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
      </div>
      <div className="h-4" />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <div className="flex justify-between text-lg text-red-300">
            <strong className="text-2xl">Boundaries:</strong>
            <div className="flex gap-4">
              <p>{format(boundaryStart, "MMM dd yyyy, hh:mm:ss a z")}</p>
              <p>|</p>
              <p>{format(boundaryEnd, "MMM dd yyyy, hh:mm:ss a z")}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between text-lg text-red-300">
          <span className="flex items-baseline gap-2">
            <strong className="text-2xl">URL STATE:</strong>
            <dfn className="text-sm">(what the url is)</dfn>
          </span>
          <div className="flex gap-4">
            <p>{format(selectedStart, "MMM dd yyyy, hh:mm:ss a z")}</p>
            <p>|</p>
            <p>{format(selectedEnd, "MMM dd yyyy, hh:mm:ss a z")}</p>
          </div>
        </div>

        <div className="flex justify-between text-lg text-red-300">
          <span className="flex items-baseline gap-2">
            <strong className="text-2xl">Display:</strong>
            <dfn className="text-sm">(what the user sees using time component)</dfn>
          </span>
          <div className="flex gap-4">
            <Time pattern={PATTERN}>{selectedStart.toISOString()}</Time>
            <p>|</p>
            <Time pattern={PATTERN}>{selectedEnd.toISOString()}</Time>
          </div>
        </div>

        <div className="flex justify-between text-lg">
          <span className="flex items-baseline gap-2">
            <strong className="text-2xl">Queries:</strong>
            <dfn className="text-sm">(what we pass into our endpoints)</dfn>
          </span>
          <div className="flex gap-4">
            <time>{selectedStart.toISOString()}</time>
            <p>|</p>
            <time>{selectedEnd.toISOString()}</time>
          </div>
        </div>

        <br />
        <br />

        <div className="flex items-center gap-2">
          <Button asChild size="icon" disabled={isSameDay(boundaryStart, selectedStart)}>
            <Link href={`/pagination?${prevParams.toString()}`}>
              <ChevronLeftIcon
                className={cn(
                  isSameDay(boundaryStart, selectedStart) ? "text-gray-400" : "text-black",
                )}
              />
            </Link>
          </Button>

          <Button asChild size="icon" disabled={isSameDay(boundaryEnd, selectedEnd)}>
            <Link href={`/pagination?${prevParams.toString()}`}>
              <ChevronRightIcon
                className={cn(isSameDay(boundaryEnd, selectedEnd) ? "text-gray-400" : "text-black")}
              />
            </Link>
          </Button>
        </div>

        <div>
          {[
            { title: "Prev", dates: prev },
            { title: "Next", dates: next },
          ].map(({ title, dates }) => (
            <div className="flex justify-between text-lg" key={title}>
              <p>{title}:</p>
              <div className="flex gap-4">
                <p>{format(dates[0], "MMM dd yyyy, hh:mm:ss a z")}</p>
                <p>|</p>
                <p>{format(dates[1], "MMM dd yyyy, hh:mm:ss a z")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const options = ["hourly", "daily", "weekly"] as const;
