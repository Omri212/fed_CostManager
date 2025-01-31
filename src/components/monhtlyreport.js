import React, { useState } from "react";
import { Typography, Box, Button, MenuItem, Select } from "@mui/material";

/**
 * Component to display the monthly report of costs.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.costs - List of costs for the month.
 * @param {Function} props.onFetchCosts - Function to fetch costs for a specific month and year.
 */
const MonthlyReport = ({ costs, onFetchCosts }) => {
  const currentMonth = new Date().getMonth() + 1; // Current month (1-12)
  const currentYear = new Date().getFullYear(); // Current year

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleFetch = () => {
    onFetchCosts(selectedMonth, selectedYear);
  };

  const filteredCosts = costs.filter((cost) => {
    const costDate = new Date(cost.date);
    return (
      costDate.getMonth() + 1 === selectedMonth &&
      costDate.getFullYear() === selectedYear
    );
  });

  return (
    <Box sx={{ width: "100%", textAlign: "center", p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          sx={{ mr: 2 }}
        >
          {[...Array(12).keys()].map((month) => (
            <MenuItem key={month + 1} value={month + 1}>
              {new Date(0, month).toLocaleString("default", { month: "long" })}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {[
            currentYear - 5,
            currentYear - 4,
            currentYear - 3,
            currentYear - 2,
            currentYear - 1,
            currentYear,
          ].map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {filteredCosts.length === 0 ? (
        <Typography variant="body1" sx={{ mb: 2 }}>
          No costs found for the selected month and year.
        </Typography>
      ) : (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Monthly Report for{" "}
            {new Date(0, selectedMonth - 1).toLocaleString("default", {
              month: "long",
            })}{" "}
            {selectedYear}
          </Typography>
          <ul>
            {filteredCosts.map((cost, index) => (
              <li key={index}>
                {new Date(cost.date).toLocaleDateString()} : {cost.description}{" "}
                - {cost.sum} ({cost.category})
              </li>
            ))}
          </ul>
        </Box>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleFetch}
        sx={{ mt: 2 }}
      >
        Refresh Report
      </Button>
    </Box>
  );
};

export default MonthlyReport;
