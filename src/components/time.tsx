"use client";

import { isValidElement, ReactNode } from "react";
import { format } from "date-fns";
import { TZDate } from "~/libs/date-fns";

type TimeProps = React.ComponentPropsWithoutRef<"time">;

function Time({
  children,
  pattern = "yyyy-MM-dd HH:mm",
  ...props
}: TimeProps & { pattern?: string }) {
  const dateTime = formatDateTime(children);
  if (dateTime === null) throw new Error("Invalid date time");

  const slotProps = {} as TimeProps;
  if (dateTime) slotProps.dateTime = dateTime.toISOString();

  return (
    <time suppressHydrationWarning {...slotProps} {...props}>
      {format(dateTime, pattern)}
    </time>
  );
}

function formatDateTime(node?: ReactNode): Date | null {
  let dateInput: string | number | Date | undefined;

  // Extracts node type
  if (typeof node === "string" || typeof node === "number") dateInput = node;
  else if (isValidElement(node) && typeof node.props.children === "string") {
    dateInput = node.props.children; // Extracts children's string
  } else return null;

  if (typeof dateInput === "string" || typeof dateInput === "number") {
    const parsedDate = new TZDate(dateInput as string);

    if (isNaN(parsedDate.getTime())) return null; // Checks for invalid dates
    dateInput = parsedDate;
  }
  if (dateInput instanceof Date && !isNaN(dateInput.getTime())) return dateInput;

  return null;
}

export { Time };
