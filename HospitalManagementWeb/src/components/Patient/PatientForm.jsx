import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// eslint-disable-next-line react/prop-types
const PatientForm = ({ onHandleCancel, refresh, editPatientForm, type }) => {
  const [patient, setPatient] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    hospitalId: "",
    doctorId: "", // Add this field to store the selected doctor ID
  });
  const [errors, setErrors] = useState({});
  const [hospitals, setHospitals] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (editPatientForm) {
      setPatient(editPatientForm);
    }
  }, [editPatientForm]);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(`${apiUrl}/Hospital`);
      setHospitals(response.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };
  const fetchDoctorsByHospital = async (hospitalId) => {
    try {
      const response = await axios.get(
        `${apiUrl}/Doctor/hospital/${hospitalId}`
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);
  useEffect(() => {
    if (patient.hospitalId) {
      fetchDoctorsByHospital(patient.hospitalId);
      setPatient((prev) => ({ ...prev, doctorId: "" }));
    } else {
      setDoctors([]);
    }
  }, [patient.hospitalId]);

  const handleChange = (e) => {
    setPatient({
      ...patient,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "", // Clear error when user types
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!patient.firstName) newErrors.firstName = "First Name is required";
    if (!patient.lastName) newErrors.lastName = "Last Name is required";
    if (!patient.age) newErrors.age = "Age is required";
    if (!patient.gender) newErrors.gender = "Gender selection is required";
    if (!patient.hospitalId)
      newErrors.hospitalId = "Hospital selection is required";
    if (!patient.doctorId) newErrors.doctorId = "Doctor selection is required"; // Validate doctor selection
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
      patient.doctor = null;
      patient.hospital = null;
      if (type === "create") {
        await axios.post(`${apiUrl}/Patient`, patient);
      } else {
        await axios.put(`${apiUrl}/Patient/${patient.id}`, patient);
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
        label="First Name"
        name="firstName"
        value={patient.firstName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.firstName}
        helperText={errors.firstName}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={patient.lastName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.lastName}
        helperText={errors.lastName}
      />
      <TextField
        label="Age"
        name="age"
        type="number"
        value={patient.age}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.age}
        helperText={errors.age}
      />
      <FormControl fullWidth margin="normal" error={!!errors.gender}>
        <InputLabel id="gender-select-label">Gender</InputLabel>
        <Select
          labelId="gender-select-label"
          name="gender"
          value={patient.gender}
          onChange={handleChange}
        >
          <MenuItem value="" disabled>
            Select Gender
          </MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
      </FormControl>
      <FormControl fullWidth margin="normal" error={!!errors.hospitalId}>
        <InputLabel id="hospital-select-label">Hospital</InputLabel>
        <Select
          labelId="hospital-select-label"
          name="hospitalId"
          value={patient.hospitalId}
          onChange={handleChange}
        >
          <MenuItem value="" disabled>
            Select a Hospital
          </MenuItem>
          {hospitals.map((hospital) => (
            <MenuItem key={hospital.id} value={hospital.id}>
              {hospital.name}
            </MenuItem>
          ))}
        </Select>
        {errors.hospitalId && (
          <FormHelperText>{errors.hospitalId}</FormHelperText>
        )}
      </FormControl>
      <FormControl fullWidth margin="normal" error={!!errors.doctorId}>
        <InputLabel id="doctor-select-label">Doctor</InputLabel>
        <Select
          labelId="doctor-select-label"
          name="doctorId"
          value={patient.doctorId}
          onChange={handleChange}
          disabled={!patient.hospitalId}
        >
          <MenuItem value="" disabled>
            Select a Doctor
          </MenuItem>
          {doctors.map((doctor) => (
            <MenuItem key={doctor.id} value={doctor.id}>
              {doctor.name}
            </MenuItem>
          ))}
        </Select>
        {errors.doctorId && <FormHelperText>{errors.doctorId}</FormHelperText>}
      </FormControl>
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
