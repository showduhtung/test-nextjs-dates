import { Display, TestDate, TextTZDate, TZDateClient } from "~/testers";

export default function Statically() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold">Dynamically Rendered</h1>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-20">
          <TestDate />
          <TextTZDate />
          <TZDateClient />
        </div>
      </main>
      <footer>
        <Display label="pattern">yyyy-MM-dd HH:mm:ss</Display>
      </footer>
    </div>
  );
}
