import React from "react";
import BarCharts from "./BarCharts";
import LineCharts from "./LineCharts";
import PieCharts from "./PieCharts";
import RequestTable from "./RequestTable";

const Charts = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-2">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
        <BarCharts />
        <RequestTable />

        <LineCharts />
        <PieCharts />
      </div>
    </div>
  );
};

export default Charts;
