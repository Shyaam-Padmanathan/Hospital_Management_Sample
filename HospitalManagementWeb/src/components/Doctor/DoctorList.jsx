import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
  Card,
  IconButton,
  Modal
} from "@mui/material";
import axios from "axios";
import DoctorForm from "./DoctorForm";
import { ModalStyle } from "../Patient/PatientList";
import CloseIcon from "@mui/icons-material/Close";

const DoctorList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      //const response = await axios.get('/api/hospitals'); // Replace with your API endpoint
      setHospitals([]);
    } catch (error) {
      console.error("There was an error fetching the hospitals!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/hospitals/${id}`); // Replace with your API endpoint
      fetchHospitals();
    } catch (error) {
      console.error("There was an error deleting the hospital!", error);
    }
  };

  return (
    <>
      <Box width="100vw" padding="80px" height="100vh">
        <Box mb={4} display="flex" justifyContent="space-between">
          <Typography variant="h2">Doctors</Typography>
          <Button
            onClick={handleOpen}
            variant="outlined"
            size="small"
            color="primary"
          >
            Add Doctors
          </Button>
        </Box>
        <Box
          width={"100%"}
          flexDirection="column"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Country</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              {hospitals.length ? (
                <TableBody>
                  {hospitals.map((hospital) => (
                    <TableRow key={hospital.id}>
                      <TableCell>{hospital.name}</TableCell>
                      <TableCell>{hospital.address}</TableCell>
                      <TableCell>{hospital.country}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary">
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(hospital.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <Box
                  sx={{
                    width: "inherit !important",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100px",
                  }}
                >
                  <Typography>No Data Found</Typography>
                </Box>
              )}
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableBackdropClick
      >
        <Card style={ModalStyle}>
          <IconButton
            onClick={handleClose}
            style={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Add Doctor
          </Typography>
          <Box p={3}>
            <DoctorForm onHandleCancel={handleClose} />
          </Box>
        </Card>
      </Modal>
    </>
  );
};

export default DoctorList;
