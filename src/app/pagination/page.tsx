import { redirect } from "next/navigation";
import { parseSearchParams, SearchParams } from "~/common/utilities";
import { endOfDay } from "~/libs/date-fns";
import { mockFetchBoundaries, PaginationPageProps, PaginationSearchParams } from "./common";

export default async function PaginationPage({ searchParams }: PaginationPageProps) {
  const { interval, selectedDates } = parseSearchParams<PaginationSearchParams>(searchParams);
  const [boundaryStart] = await mockFetchBoundaries();

  if (!interval || !selectedDates) {
    const queries = new SearchParams(searchParams);
    if (!interval) queries.set("interval", "hourly");
    if (!selectedDates) queries.set("selectedDates", [boundaryStart, endOfDay(boundaryStart)]);

    redirect(`/pagination?${queries.toString()}`);
  }

  return <></>;
}
