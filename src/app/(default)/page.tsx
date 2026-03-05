import StatisticsCard from "@/components/dashboard/statistics-card";
import { Overview } from "@/components/dashboard/overview";
import { RecentSales } from "@/components/dashboard/recent-sales";

export default function Page() {
  return (
    <section className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <StatisticsCard />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7  px-4 lg:px-6">
          <Overview />
          <RecentSales />
        </div>
      </div>
    </section>
  )
}
