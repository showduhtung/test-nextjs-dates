import { PATTERN } from "~/common";
import { Time } from "~/components/time";

const [boundaryStart, boundaryEnd] = [
  new Date("Aug 31 2024, 02:00:00 PM GMT+0"),
  new Date("Oct 01 2024, 02:00:00 PM GMT+0"),
];

export default function HourlyPage() {
  return (
    <div className="flex flex-col gap-1">
      <span className="flex items-baseline gap-2">
        <strong className="text-2xl">Boundaries:</strong>
        <dfn className="inline-flex gap-1 text-xs text-primary">
          Sept 1, 2024 10PM - Oct 1, 2024 10PM
        </dfn>
      </span>
      <div className="flex items-center justify-between text-primary">
        <dfn className="text-xs">
          <code>&quot;boundaries.toUTCString()&quot;</code>
        </dfn>

        <div className="flex w-[550px] justify-between gap-4">
          <time suppressHydrationWarning>{boundaryStart.toUTCString()}</time>
          <p>|</p>
          <time suppressHydrationWarning>{boundaryEnd.toUTCString()}</time>
        </div>
      </div>

      <div className="flex items-center justify-between text-primary">
        <dfn className="text-xs">
          <code>&quot;boundaries.toISOString()&quot;</code>
        </dfn>

        <div className="flex w-[550px] justify-between gap-4">
          <time suppressHydrationWarning>{boundaryStart.toISOString()}</time>
          <p>|</p>
          <time suppressHydrationWarning>{boundaryEnd.toISOString()}</time>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <strong className="text-2xl">UI Display:</strong>
        <div className="flex items-center justify-between text-primary">
          <dfn className="text-xs">
            <code>&quot;&lt;Time&gt;&#123;boundaries.toISOString()&#125;&lt;/Time&gt;&quot;</code>
          </dfn>

          <div className="flex w-[550px] justify-between gap-4">
            <Time pattern={PATTERN}>{boundaryStart.toISOString()}</Time>
            <p>|</p>
            <Time pattern={PATTERN}>{boundaryEnd.toISOString()}</Time>
          </div>
        </div>
      </div>
    </div>
  );
}
