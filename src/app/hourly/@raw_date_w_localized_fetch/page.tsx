import React from "react";
import * as DateFns from "date-fns";
import {
  addDays,
  differenceInCalendarDays,
  endOfDay,
  isAfter,
  startOfDay,
  subDays,
  isSameDay,
  format,
  startOfHour,
  addHours,
  getHours,
} from "date-fns";

import { mockFetchLocalizedBoundaries } from "~/data";
import { HourlyBlocks } from "../_components/hourly-block";
import { TZDate } from "~/libs/date-fns";

const functions = {
  addDays,
  differenceInCalendarDays,
  endOfDay,
  isAfter,
  startOfDay,
  subDays,
  isSameDay,
  startOfHour,
  getHours,
  format,
  addHours,
} as typeof DateFns;

export default async function RawDateFnWLocalizedFetchPage() {
  const [boundaryStart, boundaryEnd = TZDate.tz()] = await mockFetchLocalizedBoundaries(
    new TZDate("Sep 14 2024, 2:00:00 PM GMT+0"),
  );

  return (
    <HourlyBlocks
      boundaries={[new TZDate(boundaryStart), new TZDate(boundaryEnd)]}
      functions={functions}
    />
  );
}
