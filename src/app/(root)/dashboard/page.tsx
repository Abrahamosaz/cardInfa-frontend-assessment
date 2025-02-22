import Analytics from "@/components/dashboard/Analytics";
import Header from "@/components/dashboard/Header";

const DashboardPage = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6">
      <Header />
      <Analytics />
    </div>
  );
};

export default DashboardPage;
