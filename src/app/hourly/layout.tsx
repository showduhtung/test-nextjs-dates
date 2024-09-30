import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/tabs";

type HourlyLayoutProps = {
  children: React.ReactNode;
  native: React.ReactNode;
  date_fns: React.ReactNode;
  localized_date_fns: React.ReactNode;
  localized_at_fetch: React.ReactNode;
};

export default function HourlyLayout({
  children,
  native,
  localized_date_fns,
  // date_fns,
  // localized_at_fetch,
}: HourlyLayoutProps) {
  return (
    <div className="flex flex-col gap-9">
      {children}
      <div className="my-8 w-full border border-dashed border-primary" />
      <Tabs defaultValue="localized_date_fns">
        <TabsList>
          <TabsTrigger value="native">Native JS</TabsTrigger>
          {/* <TabsTrigger value="date-fns">Raw date-fns</TabsTrigger> */}
          {/* <TabsTrigger value="date_fns_w_locatlized">Localized Data w/ date-fns</TabsTrigger> */}
          <TabsTrigger value="localized_date_fns">Localized date-fns (Solution)</TabsTrigger>
        </TabsList>
        <TabsContent value="native" className="w-full">
          {native}
        </TabsContent>
        {/* <TabsContent value="date-fns" className="w-full">
          {date_fns}
        </TabsContent> */}
        <TabsContent value="localized_at_fetch" className="w-full">
          {/* {localized_at_fetch} */}
        </TabsContent>
        <TabsContent value="localized_date_fns" className="w-full">
          {localized_date_fns}
        </TabsContent>
      </Tabs>
    </div>
  );
}
