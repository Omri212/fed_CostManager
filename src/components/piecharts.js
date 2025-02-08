import React from "react";
import { Pie } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Manually register the necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

/**
 * Component to display a pie chart for visualizing cost distribution by category.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.chartData - An object where keys are cost categories
 *  and values are the total costs for those categories.
 * @returns {JSX.Element} The rendered PieChart component.
 */
const PieChart = ({ chartData }) => {
  const data = {
    labels: Object.keys(chartData),
    datasets: [
      {
        label: "Costs by Category",
        data: Object.values(chartData),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <Box
      sx={{
        width: "240px",
        height: "240px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Cost Distribution
      </Typography>
      <Pie data={data} />
    </Box>
  );
};

export default PieChart;
