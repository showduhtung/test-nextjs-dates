import { TestDate, TextTZDate, TZDateClient } from "~/app/_components";

export const dynamic = "force-dynamic";

export default function ForceDynamic() {
  return (
    <div className="flex gap-20">
      Dynamic
      <div className="flex w-full flex-wrap gap-8">
        <div className="flex-1">
          <TestDate />
        </div>
        <div className="min-w-min flex-1">
          <TextTZDate />
        </div>
        <div className="min-w-min flex-1">
          <TZDateClient />
        </div>
      </div>
    </div>
  );
}
