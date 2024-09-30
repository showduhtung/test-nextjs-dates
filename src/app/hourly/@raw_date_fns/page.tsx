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
} as typeof DateFns;

export default async function RawDateFnsPage() {
  const [boundaryStart, boundaryEnd = new Date()] = await mockFetchBoundaries(
    new Date("Sep 14 2024, 2:00:00 PM GMT+0"),
  );

  return <HourlyBlocks boundaries={[boundaryStart, boundaryEnd]} functions={functions} />;
}
