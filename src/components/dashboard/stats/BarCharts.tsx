"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
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
        stacked: true,
        beginAtZero: true,
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
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
        },
      },
    },
    maintainAspectRatio: false,
  };

  const data = {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    datasets: [
      {
        label: "Personalized",
        data: [10, 20, 5, 8, 12, 18, 8],
        backgroundColor: "#014DAF",
        borderRadius: 8,
      },
      {
        label: "Instant",
        data: [40, 50, 25, 50, 35, 62, 65],
        backgroundColor: "#CCE2FF",
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="w-full bg-white border border-[#E2E2E2] rounded-xl px-4 py-4">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium text-[#121212]">Monthly Issuance</p>
      </div>
      <div className="h-80 mt-8">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default BarChart;
