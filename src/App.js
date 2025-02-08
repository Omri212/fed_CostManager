import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AddCost from "./components/addacost";
import MonthlyReport from "./components/monhtlyreport";
import PieChart from "./components/piecharts";
import { addingCost, getMonthlyCosts, getCostsByCategory } from "./utils/idb";

/**
 * Main application component for managing costs.
 *
 * @returns {JSX.Element} The rendered App component.
 */
const App = () => {
  const [costs, setCosts] = useState([]);
  const [chartData, setChartData] = useState({});
  const DB_NAME = "CostManagerDB";
  const STORE_NAME = "Costs";

  /**
   * Handles adding a new cost to the database.
   *
   * @param {Object} costItem - The cost item to be added, including sum, category, description, and date.
   */
  const handleAddCost = async (costItem) => {
    await addingCost(DB_NAME, STORE_NAME, costItem);
    alert("Cost Added Successfully");
  };

  /**
   * Handles fetching costs for a specific month and year and updates the state.
   *
   * @param {number} month - The month for which costs are fetched (1-12).
   * @param {number} year - The year for which costs are fetched.
   */
  const handleFetchCosts = async (month, year) => {
    const data = await getMonthlyCosts(DB_NAME, STORE_NAME, month, year);
    setCosts(data || []); // Ensure costs is always an array

    const chartData = await getCostsByCategory(
      DB_NAME,
      STORE_NAME,
      month,
      year
    );
    setChartData(chartData || {});
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Cost Manager
      </Typography>

      <Grid container spacing={3}>
        {/* Center column for AddCost form */}
        <Grid
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <AddCost onAddCost={handleAddCost} />
        </Grid>

        {/* Left column for Monthly Report */}
        <Grid
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <MonthlyReport costs={costs || []} onFetchCosts={handleFetchCosts} />
        </Grid>

        {/* Right column for PieChart */}
        <Grid
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <PieChart chartData={chartData || {}} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
