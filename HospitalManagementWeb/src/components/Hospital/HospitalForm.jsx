import { useEffect, useState } from "react";
import { TextField, Button, Box, CircularProgress } from "@mui/material";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// eslint-disable-next-line react/prop-types
const HospitalForm = ({ onHandleCancel, refresh, editHospitalForm, type }) => {
  const [hospital, setHospital] = useState({
    name: "",
    address: "",
    country: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    setErrors({
      ...errors,
      [e.target.name]: "", // Clear error when user types
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!hospital.name) newErrors.name = "Name is required";
    if (!hospital.address) newErrors.address = "Address is required";
    if (!hospital.country) newErrors.country = "Country is required";
    return newErrors;
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onHandleCancel();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setLoading(true);
      if (type == "create") {
        await axios.post(`${apiUrl}/Hospital`, hospital);
      } else {
        await axios.put(`${apiUrl}/Hospital/${hospital.id}`, hospital);
      }
      refresh();
      onHandleCancel();
      setLoading(false);
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
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Address"
        name="address"
        value={hospital.address}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.address}
        helperText={errors.address}
      />
      <TextField
        label="Country"
        name="country"
        value={hospital.country}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.country}
        helperText={errors.country}
      />
      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        {!loading ? (
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        ) : (
          <Button variant="contained" color="primary" disabled>
            <CircularProgress color="white"/>
          </Button>
        )}
        <Button onClick={handleCancel} variant="contained" color="info">
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default HospitalForm;
