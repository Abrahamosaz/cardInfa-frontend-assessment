"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  ChartData,
  TooltipItem,
  Chart,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);

type ChartOptionsType = ChartOptions<"pie">;

const PieChart = () => {
  const data: ChartData<"pie"> = {
    labels: ["Active", "Expired", "Inactive", "Blocked", "Lost"],
    datasets: [
      {
        data: [1800, 400, 100, 100, 50],
        backgroundColor: [
          "#20B2AA",
          "#FFB347",
          "#4169E1",
          "#663399",
          "#FF6B6B",
        ],
        borderWidth: 0,
        spacing: 5, // Add spacing between sections
        weight: 0.5, // Makes the chart thinner
      },
    ],
  };

  const centerTextPlugin = {
    id: "centerText",
    afterDraw: (chart: Chart) => {
      const {
        ctx,
        chartArea: { left, top, width, height },
      } = chart;
      ctx.save();

      // Total number
      ctx.font = "600 24px Inter";
      ctx.fillStyle = "#121212";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("2,450", left + width / 2, top + height / 2 - 10);

      // "Total Cards" text
      ctx.font = "12px Inter";
      ctx.fillStyle = "#6B7280";
      ctx.fillText("Total Cards", left + width / 2, top + height / 2 + 15);

      ctx.restore();
    },
  };

  const options: ChartOptionsType = {
    responsive: true,
    radius: "70%",
    cutout: "85%",
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        align: "start" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle" as const,
          padding: 10,
          boxWidth: 8,
          boxHeight: 8,
          font: {
            family: "Inter, sans-serif",
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: TooltipItem<"pie">) => {
            const value = context.raw as number;
            const total = (context.dataset.data as number[]).reduce(
              (a, b) => a + b,
              0
            );
            const percentage = ((value / total) * 100).toFixed(1);
            return `${context.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full bg-white border border-[#E2E2E2] rounded-xl px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg font-medium text-[#121212]">
          Card Status Distribution
        </p>
      </div>
      <div className="h-80 mt-8 flex items-center justify-center">
        <Pie data={data} options={options} plugins={[centerTextPlugin]} />
      </div>
    </div>
  );
};

export default PieChart;
