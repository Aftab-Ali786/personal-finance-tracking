import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data, total, label }) => {
  const options = {
    cutout: "75%",
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div
      style={{
        width: "250px",
        height: "250px",
        margin: "20px",
        position: "relative",
      }}
    >
      {/* Chart */}
      <Doughnut data={data} options={options} />

      {/* Center Text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>{total}</div>
        <div style={{ fontSize: "12px", fontWeight: "normal", color: "#555" }}>
          {label || "Total"}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
