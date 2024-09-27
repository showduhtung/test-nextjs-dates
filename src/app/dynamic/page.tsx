import { TestDate, TextTZDate, TZDateClient } from "~/testers";

export const dynamic = "force-dynamic";

export default function Dynamic() {
  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <h1 className="text-4xl font-bold">Dynamically Rendered</h1>
      <div className="flex gap-20">
        <TestDate />
        <TextTZDate />
        <TZDateClient />
      </div>
    </main>
  );
}
