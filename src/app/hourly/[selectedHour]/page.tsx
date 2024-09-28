import Link from "next/link";
import { PATTERN } from "~/common";
import { PageParams, parseParams } from "~/common/utilities";
import { Button } from "~/components/button";
import { Time } from "~/components/time";

type HourlyParams = Readonly<{ selectedHour: Date }>;
type PageProps = { params: PageParams<HourlyParams> };

export default function HourPage({ params }: PageProps) {
  const { selectedHour } = parseParams<HourlyParams>(params);

  return (
    <div className="flex flex-col gap-4">
      <Button className="w-fit" asChild>
        <Link href="/hourly">Back</Link>
      </Button>
      <div className="flex flex-col gap-1">
        <strong className="text-2xl">URL State:</strong>
        <div className="flex items-center justify-between text-primary">
          <dfn className="text-xs">
            <code>&quot;selectedHour.toUTCString()&quot;</code>
          </dfn>

          <time>{selectedHour.toUTCString()}</time>
        </div>

        <div className="flex items-center justify-between text-primary">
          <dfn className="text-xs">
            <code>&quot;selectedHour.toISOString()&quot;</code>
          </dfn>

          <time>{selectedHour.toISOString()}</time>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <strong className="text-2xl">UI Display:</strong>
        <div className="flex items-center justify-between text-primary">
          <dfn className="text-xs">
            <code>&quot;&lt;Time&gt;&#123;selectedHour.toISOString()&#125;&lt;/Time&gt;&quot;</code>
          </dfn>

          <Time pattern={PATTERN}>{selectedHour.toISOString()}</Time>
        </div>
      </div>
    </div>
  );
}
