import React from "react";

import {
  addDays,
  TZDate,
  differenceInCalendarDays,
  endOfDay,
  isAfter,
  startOfDay,
  subDays,
  isSameDay,
  format,
  type DateFunctions,
  startOfHour,
  addHours,
  getHours,
} from "~/libs/date-fns";

import { mockFetchBoundaries } from "~/data";
import { HourlyBlocks } from "../_components/hourly-block";

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
} as DateFunctions;

export default HourlyLocalizedAtFetch;

async function HourlyLocalizedAtFetch() {
  const [boundaryStart, boundaryEnd = new Date()] = await mockFetchBoundaries(
    new Date("Sep 14 2024, 2:00:00 PM GMT+0"),
  );

  return <HourlyBlocks boundaries={[boundaryStart, boundaryEnd]} functions={functions} />;
}
