import { getHours } from "~/libs/date-fns";

export default function Page() {
  const hour = getHours(new Date());
  return <>Hour is : {hour}</>;
}
