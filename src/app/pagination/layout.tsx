type RootLayoutProps = {
  children: React.ReactNode;
  interval_select: React.ReactNode;
  interval_pagination: React.ReactNode;
};

export default function RootLayout({
  children,
  interval_select,
  interval_pagination,
}: RootLayoutProps) {
  return (
    <div className="flex flex-col gap-4">
      {children}

      <br />
      <br />

      <div className="flex items-center gap-2">
        <div className="flex justify-between text-lg">{interval_select}</div>
      </div>
      {interval_pagination}
    </div>
  );
}
