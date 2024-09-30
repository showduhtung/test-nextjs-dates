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
  DateFunctions,
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
  format,
} as DateFunctions;

export default HourlyLocalizedAtFetch;

async function HourlyLocalizedAtFetch() {
  const [boundaryStart, boundaryEnd = TZDate.tz()] = await mockFetchBoundaries();

  return <HourlyBlocks boundaries={[boundaryStart, boundaryEnd]} functions={functions} />;
}
