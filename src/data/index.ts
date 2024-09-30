import { TZDate } from "~/libs/date-fns";

type BoundaryResponse = [Date, Date | undefined];
async function mockFetchBoundaries(
  date: Date = new Date("June 31 2024, 04:00:00 PM GMT+0"),
): Promise<BoundaryResponse> {
  const response = await new Promise<BoundaryResponse>((resolve) =>
    setTimeout(() => resolve([date, undefined] as BoundaryResponse), 100),
  );
  return response;
}

type LocalizedBoundaryResponse = [TZDate, TZDate | undefined];
async function mockFetchLocalizedBoundaries(
  date: TZDate = new TZDate("June 31 2024, 04:00:00 PM GMT+0"),
): Promise<BoundaryResponse> {
  const response = await new Promise<LocalizedBoundaryResponse>((resolve) =>
    setTimeout(() => resolve([date, undefined] as LocalizedBoundaryResponse), 100),
  );
  return response;
}

export { mockFetchBoundaries, mockFetchLocalizedBoundaries };
