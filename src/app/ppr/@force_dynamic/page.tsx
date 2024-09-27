import { TestDate, TextTZDate, TZDateClient } from "~/testers";

export const dynamic = "force-dynamic";

export default function ForceDynamic() {
  return (
    <div className="flex gap-20">
      Dynamic
      <TestDate />
      <TextTZDate />
      <TZDateClient />
    </div>
  );
}
