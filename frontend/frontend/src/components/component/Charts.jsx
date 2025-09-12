import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ data, total }) => {
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
  };

  return (
    <div style={{ width: "250px", margin: "20px" }}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: "relative",
          top: "-140px",
          textAlign: "center",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {total}
        <div style={{ fontSize: "12px", fontWeight: "normal" }}>
          Total Amount
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
