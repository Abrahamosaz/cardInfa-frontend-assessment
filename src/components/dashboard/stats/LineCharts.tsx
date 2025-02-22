"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

const LineChart = () => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
          color: "#F2F4F7",
        },
        border: {
          color: "#F2F4F7",
        },
        ticks: {
          color: "#667085",
          font: {
            size: 12,
          },
        },
      },
      y: {
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: "#667085",
          font: {
            size: 12,
          },
        },
        grid: {
          color: "#F2F4F7",
          drawTicks: false,
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
        mode: "nearest",
        intersect: false,
        backgroundColor: "white",
        titleColor: "#121212",
        bodyColor: "#121212",
        borderColor: "#E2E2E2",
        borderWidth: 1,
        padding: 8,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `${context.parsed.y}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: "nearest",
    },
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
        borderColor: "#4DAF01",
        fill: false,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        backgroundColor: "#4DAF01",
        borderColor: "white",
        borderWidth: 2,
      },
    },
  };

  const data: ChartData<"line"> = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Income",
        data: [50, 40, 20, 45, 40, 55, 75],
        cubicInterpolationMode: "monotone" as const,
        borderColor: "#22C55E",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: "#22C55E",
        pointBorderColor: "white",
        pointBorderWidth: 2,
        fill: false,
      },
    ],
  };

  return (
    <div className="w-full bg-white border border-[#E2E2E2] rounded-xl px-4 py-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium text-[#121212]">
          This Week&apos;s Income
        </p>
      </div>
      <div className="h-80 mt-8">
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default LineChart;
