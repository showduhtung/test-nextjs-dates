import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/tabs";

type PaginationLayoutProps = {
  children: React.ReactNode;
  native: React.ReactNode;
  solution: React.ReactNode;
};

export default function PaginationLayout({ children, native, solution }: PaginationLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      {children}
      <div className="my-8 w-full border border-dashed border-primary" />
      <Tabs defaultValue="native">
        <TabsList>
          <TabsTrigger value="native">Native</TabsTrigger>
          <TabsTrigger value="solution">Solution</TabsTrigger>
        </TabsList>

        <TabsContent value="native" className="w-full">
          {native}
        </TabsContent>
        <TabsContent value="solution">{solution}</TabsContent>
      </Tabs>
    </div>
  );
}
