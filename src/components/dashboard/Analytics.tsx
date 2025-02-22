import Charts from "./stats/Charts";
import Stats from "./stats/Stats";

const Analytics = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <h2 className="text-black text-lg font-bold">Analytics</h2>
        <hr className="w-full border-t border-[#D0D5DD]" />
      </div>
      <Stats />
      <Charts />
    </div>
  );
};

export default Analytics;
