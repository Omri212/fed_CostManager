import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";

/**
 * Componnet for adding a new cost.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onAddCost - Callback function to handle adding a new cost.
 * @returns {JSX.Element} The rendered AddCost component.
 */
const AddCost = ({ onAddCost }) => {
  const [formData, setFormData] = useState({
    sum: "",
    category: "",
    description: "",
    date: "", // Stores the selecte month and year
  });

  /**
   * Handles chagnes in form fields and updates the state.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submittion and calls the `onAddCost` callback.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert the selected month-year to a full date
    const [year, month] = formData.date.split("-");
    const formattedDate = new Date(year, month - 1, 1); // First day of the selected month

    onAddCost({ 
      ...formData, 
      date: formattedDate 
    });

    // Reset the form
    setFormData({ sum: "", category: "", description: "", date: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h5" gutterBottom>
        Add Cost
      </Typography>
      <Stack spacing={2}>
        <TextField
          type="number"
          label="Sum"
          name="sum"
          value={formData.sum}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Categoty"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Descripton"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          required
        />
        <TextField
          type="month"
          label="Month & Year"
          name="date"
          value={formData.date}
          onChange={handleChange}
          fullWidth
          required
          InputLabelProps={{ shrink: true }} // Ensures lable is always visible
        />
        <Button variant="contained" type="submit" fullWidth>
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default AddCost;
