import { TZDate } from "~/libs/date-fns";

type BoundaryResponse = [Date, Date | undefined];
async function mockFetchBoundaries(): Promise<BoundaryResponse> {
  const boundaries = [new Date("Aug 31 2022, 04:00:00 PM GMT+0"), undefined];
  const response = await new Promise<BoundaryResponse>((resolve) =>
    setTimeout(() => resolve(boundaries as BoundaryResponse), 100),
  );
  return response;
}

type LocalizedBoundaryResponse = [TZDate, TZDate | undefined];
async function mockFetchLocalizedBoundaries(): Promise<BoundaryResponse> {
  const boundaries = [new TZDate("Aug 31 2022, 04:00:00 PM GMT+0"), undefined];
  const response = await new Promise<LocalizedBoundaryResponse>((resolve) =>
    setTimeout(() => resolve(boundaries as LocalizedBoundaryResponse), 100),
  );
  return response;
}

export { mockFetchBoundaries, mockFetchLocalizedBoundaries };
