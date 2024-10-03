import { Time } from "~/components/time";
import { format, getHours } from "~/libs/date-fns";

export default function Page() {
  const hour = getHours(new Date());
  return (
    <div>
      <p>Hour is : {hour}</p>
      <Time>This is the time : {format(new Date(), "dd MMM hh:mm a")}</Time>
    </div>
  );
}
