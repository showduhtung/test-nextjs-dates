import { TZDate as DateTZ } from "@date-fns/tz";
import { TIME_ZONE } from "~/common";

export class TZDate extends DateTZ {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(date: Date | string | number, _timeZone?: string) {
    if (typeof date === "string") super(date, TIME_ZONE);
    else if (typeof date === "number") super(date, TIME_ZONE);
    else if (date instanceof Date) super(date, TIME_ZONE);
    else throw new Error("Invalid date type");
  }
}
