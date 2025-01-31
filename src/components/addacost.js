import React, { useState } from "react";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";

/**
 * Component for adding a new cost.
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
  });

  /**
   * Handles changes in form fields and updates the state.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission and calls the `onAddCost` callback.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCost({ ...formData, date: new Date() });
    setFormData({ sum: "", category: "", description: "" });
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
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          required
        />
        <Button variant="contained" type="submit" fullWidth>
          Add
        </Button>
      </Stack>
    </Box>
  );
};

export default AddCost;
