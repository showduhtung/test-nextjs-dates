import { redirect } from "next/navigation";
import { PATTERN } from "~/common";
import { parseSearchParams, PageSearchParams, SearchParams } from "~/common/utilities";
import { Time } from "~/components/time";
import { endOfDay } from "~/libs/date-fns";
import { mockFetchBoundaries, type Interval, type IntervalDateRange } from "./common";

type PaginationSearchParams = Partial<{ selectedDates: IntervalDateRange; interval: Interval }>;
type PageProps = { searchParams: PageSearchParams<PaginationSearchParams> };

export default async function PaginationPage({ searchParams }: PageProps) {
  const { selectedDates, interval } = parseSearchParams<PaginationSearchParams>(searchParams);

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
        <strong className="text-2xl">Boundaries:</strong>
        <div className="flex items-center justify-between text-primary">
          <dfn className="text-xs">
            <code>&quot;boundaryStart.toUTCString()&quot;</code>
          </dfn>

          <div className="flex w-[550px] justify-between gap-4">
            <time>{boundaryStart.toUTCString()}</time>
            <p>|</p>
            <time>{boundaryEnd.toUTCString()}</time>
          </div>
        </div>

        <div className="flex items-center justify-between text-primary">
          <dfn className="text-xs">
            <code>&quot;boundaryStart.toISOString()&quot;</code>
          </dfn>

          <div className="flex w-[550px] justify-between gap-4">
            <time>{boundaryStart.toISOString()}</time>
            <p>|</p>
            <time>{boundaryEnd.toISOString()}</time>
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
            <time>{urlStart.toISOString()}</time>
            <p>|</p>
            <time>{urlEnd.toISOString()}</time>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <strong className="text-2xl">UI Display:</strong>
        <div className="flex items-center justify-between text-primary">
          <dfn className="text-xs">
            <code>&quot;&lt;Time&gt;&#123;urlStart.toISOString()&#125;&lt;/Time&gt;&quot;</code>
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
