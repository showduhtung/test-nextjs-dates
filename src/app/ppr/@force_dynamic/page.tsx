import { TestDate, TextTZDate, TZDateClient } from "~/app/_components";

export const dynamic = "force-dynamic";

export default function ForceDynamic() {
  return (
    <div className="flex w-full flex-col gap-8">
      <TestDate />
      <TextTZDate />
      <TZDateClient />
    </div>
  );
}
