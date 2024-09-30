import type { ReactNode } from "react";
import { max, min } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { parseSearchParams, SearchParams } from "~/common/utilities";
import { cn } from "~/libs/tailwind";
import { Button } from "~/components/button";
import { addDays, endOfDay, format, isSameDay, startOfDay, subDays } from "~/libs/date-fns";
import {
  intervals,
  mockFetchBoundaries,
  type PaginationPageProps,
  type PaginationSearchParams,
} from "../common";

export default IntervalPagination;

async function IntervalPagination({ searchParams }: PaginationPageProps) {
  const { interval, selectedDates } = parseSearchParams<PaginationSearchParams>(searchParams);
  if (!selectedDates || !interval) return <>Missing params</>;

  const [boundaryStart, boundaryEnd] = await mockFetchBoundaries();

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
    <>
      <div className="flex items-center gap-2">
        <LinkArrow params={prevParams} boundary={boundaryStart} url={urlStart}>
          <ChevronLeftIcon />
        </LinkArrow>
        <LinkArrow params={nextParams} boundary={boundaryEnd} url={urlEnd}>
          <ChevronRightIcon />
        </LinkArrow>
      </div>
      <div className="flex flex-col gap-4">
        {[
          { title: "Prev", intervals: prev },
          { title: "Next", intervals: next },
        ].map(({ title, intervals: [start, end] }) => (
          <div key={title}>
            <div className="flex justify-between">
              <span className="flex items-center gap-4">
                <strong className="text-lg">{title}:</strong>
                <dfn className="text-xs text-primary">
                  <code>&quot;format(date, pattern)&quot;</code>
                </dfn>
              </span>
              <div className="flex w-[550px] justify-between text-primary">
                <time>{format(start, "MMM dd yyyy, hh:mm:ss a z")}</time>
                <p>|</p>
                <time>{format(end, "MMM dd yyyy, hh:mm:ss a z")}</time>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="flex items-center gap-4">
                <div className="w-11" />
                <dfn className="text-xs text-primary">
                  <code>&quot;date.toISOString()&quot;</code>
                </dfn>
              </span>
              <div className="flex w-[550px] justify-between text-primary">
                <time>{start.toISOString()}</time>
                <p>|</p>
                <time>{end.toISOString()}</time>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

type LinkArrowProps = { params: SearchParams; boundary: Date; url: Date; children: ReactNode };
function LinkArrow({ params, boundary, url, children }: LinkArrowProps) {
  const isDisabled = isSameDay(boundary, url);
  return (
    <Button
      asChild
      size="icon"
      disabled={isDisabled}
      className={cn(isDisabled ? "pointer-events-none opacity-50" : "pointer-events-auto")}
    >
      <Link href={`/pagination?${params.toString()}`}>{children}</Link>
    </Button>
  );
}
