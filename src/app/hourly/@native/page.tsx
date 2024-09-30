import React from "react";
import { type DateFunctions } from "~/libs/date-fns";

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
} from "~/libs/native-date";

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

export default HourlyNativePage;

async function HourlyNativePage() {
  const [boundaryStart, boundaryEnd = new Date()] = await mockFetchBoundaries(
    new Date("Sep 14 2024, 2:00:00 PM GMT+0"),
  );

  return <HourlyBlocks boundaries={[boundaryStart, boundaryEnd]} functions={functions} />;
}
