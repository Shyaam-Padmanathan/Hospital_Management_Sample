import { useEffect, useState } from "react";
import { TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// eslint-disable-next-line react/prop-types
const DoctorForm = ({ onHandleCancel, refresh, editDoctorForm, type }) => {
  const [doctor, setDoctor] = useState({
    name: "",
    qualification: "",
    jobSpecification: "",
    gender: "",
    hospitalId: "", 
  });
  const [errors, setErrors] = useState({});
  const [hospitals, setHospitals] = useState([]); // State for hospitals


  useEffect(() => {
    if (editDoctorForm) {
      setDoctor(editDoctorForm);
    }
  }, [editDoctorForm]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get(`${apiUrl}/Hospital`);
        setHospitals(response.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    fetchHospitals();
  }, []);

  const handleChange = (e) => {
    setDoctor({
      ...doctor,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "", // Clear error when user types
    });
  };
  const validate = () => {
    const newErrors = {};
    if (!doctor.name) newErrors.name = "Name is required";
    if (!doctor.qualification) newErrors.qualification = "Qualification is required";
    if (!doctor.jobSpecification) newErrors.jobSpecification = "Job Specification is required";
    if (!doctor.gender) newErrors.gender = "Gender selection is required";
    if (!doctor.hospitalId) newErrors.hospitalId = "Hospital selection is required";
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
      if (type == "create") {
      const data=  await axios.post(`${apiUrl}/Doctor`, doctor);
      console.log('data',data);
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
        error={!!errors.name}
        helperText={errors.name}
      />
      <TextField
        label="Qualification"
        name="qualification"
        value={doctor.qualification}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.qualification}
        helperText={errors.qualification}
      />
      <TextField
        label="Job Specification"
        name="jobSpecification"
        value={doctor.jobSpecification}
        onChange={handleChange}
        fullWidth
        margin="normal"
        error={!!errors.jobSpecification}
        helperText={errors.jobSpecification}
      />
      <FormControl fullWidth margin="normal" error={!!errors.gender}>
        <InputLabel id="gender-select-label">Gender</InputLabel>
        <Select
          labelId="gender-select-label"
          name="gender"
          value={doctor.gender}
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
          value={doctor.hospitalId}
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
        {errors.hospitalId && <FormHelperText>{errors.hospitalId}</FormHelperText>}
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

export default DoctorForm;
