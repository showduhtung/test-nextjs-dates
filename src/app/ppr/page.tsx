import { TestDate, TextTZDate, TZDateClient } from "~/testers";

export const experimental_ppr = true;

export default function PPR() {
  return (
    <div className="flex gap-20">
      STATIC
      <TestDate />
      <TextTZDate />
      <TZDateClient />
    </div>
  );
}
