import { TestDate, TextTZDate, TZDateClient } from "~/app/_components";

export const experimental_ppr = true;

export default function PPR() {
  return (
    <div className="flex flex-grow flex-col gap-8">
      <TestDate />
      <TextTZDate />
      <TZDateClient />
    </div>
  );
}
