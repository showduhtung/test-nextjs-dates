import { TestDate, TextTZDate, TZDateClient } from "~/app/_components";

export const dynamic = "force-dynamic";

export default function Dynamic() {
  return (
    <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
      <h1 className="text-4xl font-bold">Dynamically Rendered</h1>
      <div className="flex gap-20">
        <TestDate />
        <TextTZDate />
        <TZDateClient />
      </div>
    </main>
  );
}
