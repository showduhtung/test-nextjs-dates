import { Time } from "~/components/time";
import { format, getHours } from "~/libs/date-fns";

export default function Page() {
  const hour = getHours(new Date());
  return (
    <div>
      <p>Hour is: {hour}</p>
      <p>
        This is the time: <Time>{format(new Date(), "dd MMM hh:mm a")}</Time>
      </p>
    </div>
  );
}
