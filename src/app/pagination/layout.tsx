import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/tabs";

type PaginationLayoutProps = {
  children: React.ReactNode;
  native: React.ReactNode;
  date_fns: React.ReactNode;
  solution: React.ReactNode;
};

export default function PaginationLayout({
  children,
  native,
  solution,
  date_fns,
}: PaginationLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      {children}
      <div className="my-8 w-full border border-dashed border-primary" />
      <Tabs defaultValue="native">
        <TabsList>
          <TabsTrigger value="native">Native JS</TabsTrigger>
          <TabsTrigger value="date-fns">Raw date-fns</TabsTrigger>
          <TabsTrigger value="solution">Wrapped date-fns (Solution)</TabsTrigger>
        </TabsList>
        <TabsContent value="native" className="w-full">
          {native}
        </TabsContent>

        <TabsContent value="date-fns" className="w-full">
          {date_fns}
        </TabsContent>
        <TabsContent value="solution" className="w-full">
          {solution}
        </TabsContent>
      </Tabs>
    </div>
  );
}
