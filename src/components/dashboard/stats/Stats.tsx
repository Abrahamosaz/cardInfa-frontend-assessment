import { dashboard } from "@/public/icons";
import Image from "next/image";
import { GoArrowUpRight } from "react-icons/go";
import { IoAlertCircleOutline } from "react-icons/io5";

const stats = [
  {
    icon: dashboard.activeCardStat,
    title: "Total Active Cards",
    value: "26,478",
    profitStatus: true,
    profitValue: "+9%",
    period: "this month",
  },
  {
    icon: dashboard.cardStat,
    title: "Total Personalized Cards",
    value: "15,703",
    profitStatus: true,
    profitValue: "8.5%",
    period: "this month",
  },
  {
    icon: dashboard.revenueStat,
    title: "Today’s Revenue",
    value: "15,703",
    profitStatus: true,
    profitValue: "+6%",
    period: "vs yesterday",
  },
  {
    icon: dashboard.pendingStat,
    title: "Pending Requests",
    value: "38",
    profitStatus: false,
    profitValue: "-12%",
    period: "this month",
  },
];
const Stats = () => {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 min-[850px]:grid-cols-3 min-[1340px]:grid-cols-4 2xl:gap-3 gap-2">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="w-full flex flex-col gap-4 bg-white border border-[#E2E2E2] rounded-[0.625rem] px-4 py-4"
        >
          <div className="flex flex-col gap-0.5">
            <Image src={stat.icon} alt={stat.title} className="w-5" />
            <p className="text-sm font-medium text-[#0000008F]">{stat.title}</p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-2xl font-bold text-[#121212]">{stat.value}</p>

            {stat.profitStatus ? (
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-2 text-[#29A174] bg-[#EFFAF6] px-2 py-1 rounded-md">
                  <GoArrowUpRight className="text-sm" />
                  <p className="text-xs font-medium">{stat.profitValue}</p>
                </div>
                <p className="text-xs text-[#0000008F]">{stat.period}</p>
              </div>
            ) : (
              <div className="flex items-center gap-0.5 text-[#E78020]">
                <IoAlertCircleOutline className="text-sm" />
                <p className="text-xs">Requires attention</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
