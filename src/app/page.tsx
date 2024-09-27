import { TestDate, TextTZDate, TZDateClient } from "~/testers";

export default function Statically() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Dynamically Rendered</h1>
      <div className="flex gap-20">
        <TestDate />
        <TextTZDate />
        <TZDateClient />
      </div>
    </div>
  );
}
