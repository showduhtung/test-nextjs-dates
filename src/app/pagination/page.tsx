import React from "react";
import { redirect } from "next/navigation";
import { parseSearchParams, SearchParams } from "~/common/utilities";
import { endOfDay } from "~/libs/date-fns";
import { mockFetchBoundaries, PaginationPageProps, PaginationSearchParams } from "./common";
import { Time } from "~/components/time";
import { PATTERN } from "~/common";

export default async function PaginationPage({ searchParams }: PaginationPageProps) {
  const { interval, selectedDates } = parseSearchParams<PaginationSearchParams>(searchParams);
  const [boundaryStart, boundaryEnd] = await mockFetchBoundaries();

  if (!interval || !selectedDates) {
    const queries = new SearchParams(searchParams);
    if (!interval) queries.set("interval", "hourly");
    if (!selectedDates) queries.set("selectedDates", [boundaryStart, endOfDay(boundaryStart)]);

    redirect(`/pagination?${queries.toString()}`);
  }

  const [urlStart, urlEnd] = selectedDates;

  return (
    <>
      <div className="flex flex-col gap-1">
        <span className="flex items-baseline gap-2">
          <strong className="text-2xl">Boundaries:</strong>
          <dfn className="inline-flex gap-1 text-xs text-primary">Sept 1, 2024 - Sept 30, 2026</dfn>
        </span>
        <div className="flex items-center justify-between text-primary">
          <dfn className="text-xs">
            <code>&quot;boundaries.toUTCString()&quot;</code>
          </dfn>

          <div className="flex w-[550px] justify-between gap-4">
            <time suppressHydrationWarning>{boundaryStart.toUTCString()}</time>
            <p>|</p>
            <time suppressHydrationWarning>{boundaryEnd.toUTCString()}</time>
          </div>
        </div>

        <div className="flex items-center justify-between text-primary">
          <dfn className="text-xs">
            <code>&quot;boundaries.toISOString()&quot;</code>
          </dfn>

          <div className="flex w-[550px] justify-between gap-4">
            <time suppressHydrationWarning>{boundaryStart.toISOString()}</time>
            <p>|</p>
            <time suppressHydrationWarning>{boundaryEnd.toISOString()}</time>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <strong className="text-2xl">URL State:</strong>

        <div className="flex items-center justify-between text-primary">
          <dfn className="text-xs">
            <code>&quot;format(url, pattern)&quot;</code>
          </dfn>

          <div className="flex w-[550px] justify-between gap-4">
            <time suppressHydrationWarning>{urlStart.toISOString()}</time>
            <p>|</p>
            <time suppressHydrationWarning>{urlEnd.toISOString()}</time>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <strong className="text-2xl">UI Display:</strong>
        <div className="flex items-center justify-between text-primary">
          <dfn className="text-xs">
            <code>&quot;&lt;Time&gt;&#123;url.toISOString()&#125;&lt;/Time&gt;&quot;</code>
          </dfn>

          <div className="flex w-[550px] justify-between gap-4">
            <Time pattern={PATTERN}>{urlStart.toISOString()}</Time>
            <p>|</p>
            <Time pattern={PATTERN}>{urlEnd.toISOString()}</Time>
          </div>
        </div>
      </div>
    </>
  );
}
