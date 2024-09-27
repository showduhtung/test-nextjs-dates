import { TestDate, TextTZDate, TZDateClient } from "~/testers";

export default function Statically() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold">Statically Rendered</h1>
      <div className="flex gap-20">
        <TestDate />
        <TextTZDate />
        <TZDateClient />
      </div>
    </main>
  );
}
