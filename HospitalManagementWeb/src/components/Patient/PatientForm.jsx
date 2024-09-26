import { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// eslint-disable-next-line react/prop-types
const PatientForm = ({ onHandleCancel, refresh, editPatientForm, type }) => {
  const [patient, setPatient] = useState({
    name: "",
    address: "",
    country: "",
  });

  useEffect(() => {
    if (editPatientForm) {
      setPatient(editPatientForm);
    }
  }, [editPatientForm]);

  const handleChange = (e) => {
    setPatient({
      ...patient,
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
      // eslint-disable-next-line no-debugger
      debugger;
      if (type == "create") {
        await axios.post(`${apiUrl}/patient`, patient);
      } else {
        await axios.put(`${apiUrl}/patient/${patient.id}`, patient);
      }
      refresh();
      onHandleCancel();
    } catch (error) {
      console.error("There was an error saving the patient!", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={patient.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        name="address"
        value={patient.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Country"
        name="country"
        value={patient.country}
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

export default PatientForm;
