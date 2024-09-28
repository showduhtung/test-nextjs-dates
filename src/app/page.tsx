import { TestDate, TextTZDate, TZDateClient } from "~/app/_components";

export default function Statically() {
  return (
    <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
      <h1 className="text-4xl font-bold">Statically Rendered</h1>
      <div className="flex w-full flex-col gap-8">
        <TestDate />
        <TextTZDate />
        <TZDateClient />
      </div>
    </main>
  );
}
