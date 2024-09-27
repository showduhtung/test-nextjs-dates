"use client";

import { TZDate } from "@date-fns/tz";
import { Slot } from "@radix-ui/react-slot";
import { format } from "date-fns";
import { isValidElement } from "react";

type TimeProps = {
  asChild?: boolean;
  pattern?: string;
  value?: Date | string | number;
} & React.ComponentPropsWithoutRef<"time">;

function Time({
  children,
  asChild,
  pattern = "yyyy-MM-dd HH:mm",
  value,
  ...props
}: TimeProps) {
  const Comp = asChild ? Slot : "time";
  const slotProps = {} as TimeProps;
  const dateTime = formatDateTime(pattern, value || children);
  if (asChild && dateTime) slotProps.dateTime = dateTime;

  const parsedValue =
    value instanceof Date
      ? format(new TZDate(value, "Asia/Singapore"), pattern)
      : value;

  return (
    <Comp suppressHydrationWarning {...slotProps} {...props}>
      {dateTime || parsedValue || children}
    </Comp>
  );
}

function formatDateTime(
  pattern: string,
  node?: Date | React.ReactNode
): string | null {
  let dateInput: string | number | Date;

  if (!node) dateInput = new Date();
  else if (
    typeof node === "string" ||
    typeof node === "number" ||
    node instanceof Date
  ) {
    dateInput = node;
  } else if (isValidElement(node) && typeof node.props.children === "string") {
    dateInput = node.props.children;
  } else return null;

  // Check if the dateInput is string or number, and convert it to Date if needed
  if (typeof dateInput === "string" || typeof dateInput === "number") {
    const parsedDate = new Date(dateInput);
    if (isNaN(parsedDate.getTime())) return null;
    dateInput = parsedDate;
  }

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return null;

  // Return the formatted date
  return format(date, pattern);
}

export { Time };
