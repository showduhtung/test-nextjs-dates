import React, { type ReactNode } from "react";
import { max, min } from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { SearchParams } from "~/common/utilities";
import { cn } from "~/libs/tailwind";
import { Button } from "~/components/button";
import { intervals, type IntervalComponenntProps } from "../common";
import { PATTERN } from "~/common";

type LinkArrowProps = { params: SearchParams; boundary: Date; url: Date; children: ReactNode };

export function IntervalPagination({
  interval,
  selectedDates,
  functions,
  boundaries: [boundaryStart, boundaryEnd],
}: IntervalComponenntProps) {
  const { addDays, endOfDay, startOfDay, subDays, format, isSameDay } = functions;

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

  const prevParams = new SearchParams();
  prevParams.set("interval", interval);
  prevParams.set("selectedDates", prev);

  const nextParams = new SearchParams();
  nextParams.set("interval", interval);
  nextParams.set("selectedDates", next);

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

  return (
    <div className="flex w-full flex-col gap-4">
      <span className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Interval Pagination Component</h1>
        <div className="flex items-center gap-2">
          <LinkArrow params={prevParams} boundary={boundaryStart} url={urlStart}>
            <ChevronLeftIcon />
          </LinkArrow>
          <LinkArrow params={nextParams} boundary={boundaryEnd} url={urlEnd}>
            <ChevronRightIcon />
          </LinkArrow>
        </div>
      </span>
      <div className="flex flex-col gap-4 rounded-md border-2 border-primary p-4">
        {[
          { title: "Prev", intervals: prev },
          { title: "Next", intervals: next },
        ].map(({ title, intervals: [start, end] }) => (
          <div className="flex flex-col gap-1" key={title}>
            <strong className="text-2xl">{title}:</strong>
            <div className="flex items-center justify-between text-primary">
              <dfn className="text-xs text-primary">
                <code>&quot;format(date, pattern)&quot;</code>
              </dfn>

              <div className="flex w-[550px] gap-2">
                <time suppressHydrationWarning>{format(start, PATTERN)}</time>
                <p>|</p>
                <time suppressHydrationWarning>{format(end, PATTERN)}</time>
              </div>
            </div>

            <div className="flex items-center justify-between text-primary">
              <dfn className="text-xs text-primary">
                <code>&quot;date.toISOString()&quot;</code>
              </dfn>

              <div className="flex w-[550px] gap-2">
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
