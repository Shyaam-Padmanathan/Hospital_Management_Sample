import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const DoctorForm = ({ onHandleCancel }) => {
  const [hospital, setHospital] = useState({
    name: "",
    address: "",
    country: "",
  });

  const handleChange = (e) => {
    setHospital({
      ...hospital,
      [e.target.name]: e.target.value,
    });
  };
  const handleCancel = (e) => {
    e.preventDefault();
    onHandleCancel();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/hospitals", hospital); // Replace with your API endpoint
      // props.onFormSubmit();
    } catch (error) {
      console.error("There was an error saving the hospital!", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={hospital.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        name="address"
        value={hospital.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Country"
        name="country"
        value={hospital.country}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={handleCancel} variant="contained" color="info">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default DoctorForm;
