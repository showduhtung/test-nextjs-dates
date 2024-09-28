type HourPageProps = Readonly<{ params: unknown; searchParams: unknown }>;

export default function HourPage({ params, searchParams }: HourPageProps) {
  return <pre>{JSON.stringify({ params, searchParams }, null, 2)}</pre>;
}
