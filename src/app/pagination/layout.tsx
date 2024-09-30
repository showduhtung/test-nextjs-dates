import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/tabs";

type PaginationLayoutProps = {
  children: React.ReactNode;
  native: React.ReactNode;
  raw_date_fns: React.ReactNode;
  localized_date_fns: React.ReactNode;
};

export default function PaginationLayout({
  children,
  native,
  localized_date_fns,
  raw_date_fns,
}: PaginationLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      {children}
      <div className="my-8 w-full border border-dashed border-primary" />
      <Tabs defaultValue="native">
        <TabsList className="mb-8">
          <TabsTrigger value="native">Native JS</TabsTrigger>
          <TabsTrigger value="raw_date_fns">Raw date-fns</TabsTrigger>
          <TabsTrigger value="localized_date_fns">Localized date-fns (Solution)</TabsTrigger>
        </TabsList>
        <TabsContent value="native" className="w-full">
          {native}
        </TabsContent>
        <TabsContent value="raw_date_fns" className="w-full">
          {raw_date_fns}
        </TabsContent>
        <TabsContent value="localized_date_fns" className="w-full">
          {localized_date_fns}
        </TabsContent>
      </Tabs>
    </div>
  );
}
