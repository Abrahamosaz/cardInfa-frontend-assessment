import React from "react";
import BarCharts from "./BarCharts";
import LineCharts from "./LineCharts";
import PieCharts from "./PieCharts";
import RequestTable from "./RequestTable";

const Charts = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-2">
      <div className="w-full h-full lg:w-[50%] flex flex-col gap-2">
        <BarCharts />
        <LineCharts />
      </div>
      <div className="w-full h-full lg:w-[50%] flex flex-col gap-2">
        <RequestTable />
        <PieCharts />
      </div>
    </div>
  );
};

export default Charts;
