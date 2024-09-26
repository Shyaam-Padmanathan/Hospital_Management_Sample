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
  Modal,
} from "@mui/material";
import axios from "axios";
import DoctorForm from "./DoctorForm";
import { ModalStyle } from "../Patient/PatientList";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const apiUrl = import.meta.env.VITE_API_URL;

const HospitalList = () => {
  const [doctors, setDoctors] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState({});

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleClose = () => {
    setOpenCreate(false);
    setOpenUpdate(false);
    setSelectedDoctor({});
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${apiUrl}/Doctor`);
      setDoctors(response.data);
    } catch (error) {
      console.error("There was an error fetching the doctors!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/Doctor/${id}`);
      fetchDoctors();
    } catch (error) {
      console.error("There was an error deleting the doctors!", error);
    }
  };

  return (
    <>
      <Box width="100vw" padding="80px" height="100vh">
        <Box mb={4} display="flex" justifyContent="space-between">
          <Typography variant="h2">Doctors</Typography>
          <Button
            onClick={handleOpenCreate}
            variant="outlined"
            size="small"
            color="primary"
          >
            Add Doctor
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
                  <TableCell>Qualification</TableCell>
                  <TableCell>Job Specification</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Hospital</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              {doctors.length == 0 ? (
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
              ) : (
                <TableBody>
                  {doctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell>{doctor.name}</TableCell>
                      <TableCell>{doctor.qualification}</TableCell>
                      <TableCell>{doctor.jobSpecification}</TableCell>
                      <TableCell>{doctor.gender}</TableCell>
                      <TableCell>{doctor.hospital.name}</TableCell>
                      <TableCell>
                        <EditIcon
                          color="primary"
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            setSelectedDoctor(doctor);
                            handleOpenUpdate();
                          }}
                        />
                        <DeleteIcon
                          sx={{ marginLeft: "10px", cursor: "pointer" }}
                          color="error"
                          onClick={() => handleDelete(doctor.id)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
        </Box>
        <Modal
          open={openCreate}
          onClose={handleClose}
          aria-labelledby="Add_doctor"
          aria-describedby="Add_doctor"
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
              <DoctorForm
                onHandleCancel={handleClose}
                refresh={fetchDoctors}
                type={"create"}
              />
            </Box>
          </Card>
        </Modal>
        <Modal
          open={openUpdate}
          onClose={handleClose}
          aria-labelledby="Edit_doctor"
          aria-describedby="Edit_doctor"
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
              Edit Doctor
            </Typography>
            <Box p={3}>
              <DoctorForm
                onHandleCancel={handleClose}
                refresh={fetchDoctors}
                editDoctorForm={selectedDoctor}
                type={"edit"}
              />
            </Box>
          </Card>
        </Modal>
      </Box>
    </>
  );
};

export default HospitalList;
