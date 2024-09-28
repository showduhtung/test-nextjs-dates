type Interval = "hourly" | "daily" | "weekly";
type IntervalDateRange = [Date, Date];

const boundaries: IntervalDateRange = [
  new Date("Aug 31 2022, 04:00:00 PM GMT+0"),
  new Date("Sep 29 2026, 04:00:00 PM GMT+0"),
];

async function mockFetchBoundaries(): Promise<IntervalDateRange> {
  const response = await new Promise<IntervalDateRange>((resolve) =>
    setTimeout(() => resolve(boundaries), 100),
  );
  return response;
}

export type { Interval, IntervalDateRange };
export { mockFetchBoundaries };
