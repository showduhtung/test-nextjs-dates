import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/tabs";

type RootLayoutProps = {
  children: React.ReactNode;
  interval_select: React.ReactNode;
  interval_pagination: React.ReactNode;
  native: React.ReactNode;
  solution: React.ReactNode;
};

export default function RootLayout({
  children,
  interval_select,
  interval_pagination,
  native,
  solution,
}: RootLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      {children}
      <Tabs defaultValue="Native">
        <TabsList className="mb-8">
          <TabsTrigger value="account">Native</TabsTrigger>
          <TabsTrigger value="solution">Solution</TabsTrigger>
        </TabsList>

        <TabsContent value="account">{native}</TabsContent>
        <TabsContent value="solution">{solution}</TabsContent>
      </Tabs>

      <br />

      <div className="mb-8 flex items-center gap-2">
        <div className="flex justify-between text-lg">{interval_select}</div>
      </div>
      {interval_pagination}
    </div>
  );
}
