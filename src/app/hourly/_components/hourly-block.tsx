import Link from "next/link";
import { Button } from "~/components/button";
import { PATTERN } from "~/common";
import { Time } from "~/components/time";

import { IntervalDateRange } from "~/app/pagination/common";
import { DateFunctions } from "~/libs/date-fns";

type HourlyBlocksProps = {
  functions: DateFunctions;
  boundaries: IntervalDateRange;
};

function HourlyBlocks({ functions, boundaries: [boundaryStart, boundaryEnd] }: HourlyBlocksProps) {
  const { differenceInCalendarDays, startOfHour, addHours, format, getHours, startOfDay, addDays } =
    functions;
  const dayCount = differenceInCalendarDays(boundaryEnd, boundaryStart) + 1;
  const [start, end] = [startOfHour(boundaryStart), addHours(startOfHour(boundaryEnd), 1)];

  const blocks = [...Array(dayCount).keys()].reverse().map((day) => {
    let hourCount = 24;
    // Adjust for partial first and last day
    if (day === 0) hourCount = 24 - getHours(start);
    else if (day === dayCount - 1) hourCount = getHours(end);

    const today = startOfDay(addDays(start, day));

    const hours = [...Array(hourCount).keys()].map((num) => {
      const offset = day === 0 ? getHours(start) : 0;
      const timestamp = addHours(today, offset + num); // Create timestamp

      return { timestamp };
    });

    return { hours, today };
  });

  return (
    <div className="flex flex-col gap-8">
      {blocks.map(({ today, hours }) => (
        <div
          key={today.getTime()}
          className="flex flex-col gap-4 rounded-md border border-primary p-4"
        >
          <h6 className="text-xl font-semibold text-white underline">
            {format(today, "eee, d MMM yyyy")}
          </h6>
          <div className="flex flex-wrap gap-4 pl-1">
            {hours.map(({ timestamp }) => (
              <Button asChild key={timestamp.toISOString()} className="w-32">
                <Link
                  href={`/hourly/${encodeURIComponent(timestamp.toISOString())}`}
                  prefetch={false}
                >
                  <Time
                    className="whitespace-nowrap text-nowrap text-lg font-semibold uppercase"
                    pattern="hh:mm a"
                  >
                    {timestamp.toISOString()}
                  </Time>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export { HourlyBlocks };
