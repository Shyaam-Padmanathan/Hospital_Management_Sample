import { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// eslint-disable-next-line react/prop-types
const HospitalForm = ({ onHandleCancel, refresh, editHospitalForm, type }) => {
  const [hospital, setHospital] = useState({
    name: "",
    address: "",
    country: "",
  });

  useEffect(() => {
    if (editHospitalForm) {
      setHospital(editHospitalForm);
    }
  }, [editHospitalForm]);

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
      if (type == "create") {
        await axios.post(`${apiUrl}/Hospital`, hospital);
      } else {
        await axios.put(`${apiUrl}/Hospital/${hospital.id}`, hospital);
      }
      refresh();
      onHandleCancel();
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

export default HospitalForm;
