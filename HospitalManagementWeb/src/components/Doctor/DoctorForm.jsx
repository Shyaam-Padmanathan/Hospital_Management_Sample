import { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// eslint-disable-next-line react/prop-types
const DoctorForm = ({ onHandleCancel, refresh, editDoctorForm, type }) => {
  const [doctor, setDoctor] = useState({
    name: "",
    address: "",
    country: "",
  });

  useEffect(() => {
    if (editDoctorForm) {
      setDoctor(editDoctorForm);
    }
  }, [editDoctorForm]);

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
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
        await axios.post(`${apiUrl}/Doctor`, doctor);
      } else {
        await axios.put(`${apiUrl}/Doctor/${doctor.id}`, doctor);
      }
      refresh();
      onHandleCancel();
    } catch (error) {
      console.error("There was an error saving the doctor!", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={doctor.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Address"
        name="address"
        value={doctor.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Country"
        name="country"
        value={doctor.country}
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
