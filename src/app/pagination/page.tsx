import { addDays, endOfDay, format, isSameDay, max, min, startOfDay, subDays } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { parseSearchParams, PageSearchParams, SearchParams } from "~/common/utilities";
import { cn } from "~/libs/tailwind";
const intervals = { hourly: 1, daily: 7, weekly: 30 } as const;

type Interval = "hourly" | "daily" | "weekly";
type IntervalDateRange = [Date, Date];
type PaginationSearchParams = Partial<{ selectedDates: IntervalDateRange; interval: Interval }>;

type PageProps = { searchParams: PageSearchParams<PaginationSearchParams> };
const [boundaryStart, boundaryEnd] = [new Date("Sept 1, 2022"), new Date("Sept 30, 2026")];

export default function PaginationPage({ searchParams }: PageProps) {
  const { selectedDates, interval } = parseSearchParams<PaginationSearchParams>(searchParams);

  if (!interval || !selectedDates) {
    const queries = new SearchParams(searchParams);
    if (!interval) queries.set("interval", "hourly");
    if (!selectedDates) queries.set("selectedDates", [boundaryStart, addDays(boundaryStart, 1)]);

    redirect(`/pagination?${queries.toString()}`);
  }

  const [start, end] = selectedDates;
  const [prev, next] = (() => {
    const cycle = intervals[interval];

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

  const stuff = [
    { title: "Prev", dates: prev },
    { title: "Next", dates: next },
  ];

  return (
    <div className="container flex flex-col gap-8">
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

      <div className="flex items-center gap-2">
        <Link
          href={`/pagination?${prevParams.toString()}`}
          className={cn(
            "button-press-effect flex h-7 w-7 min-w-0 items-center justify-center rounded-md border bg-white",
            isSameDay(boundaryStart, start) ? "border-grey-200 pointer-events-none" : "",
          )}
        >
          <ChevronLeftIcon className="text-black" />
        </Link>

        <Link
          href={`/pagination?${nextParams.toString()}`}
          className={cn(
            "button-press-effect flex h-7 w-7 min-w-0 items-center justify-center rounded-md border bg-white",
            isSameDay(boundaryEnd, end) ? "pointer-events-none text-gray-400" : "text-black",
          )}
        >
          <ChevronRightIcon className="text-black" />
        </Link>
      </div>
      <div className="flex justify-between text-lg text-red-300">
        <strong className="text-2xl">URL STATE:</strong>
        <div className="flex gap-4">
          <p>{format(start, "MMM dd yyyy, hh:mm:ss a z")}</p>
          <p>|</p>
          <p>{format(end, "MMM dd yyyy, hh:mm:ss a z")}</p>
        </div>
      </div>
      <div>
        {stuff.map(({ title, dates }) => (
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
  );
}
