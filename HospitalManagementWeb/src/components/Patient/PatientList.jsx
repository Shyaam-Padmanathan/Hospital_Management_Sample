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
import PatientForm from "./PatientForm";
import { ModalStyle } from "../Patient/PatientList";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const apiUrl = import.meta.env.VITE_API_URL;

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState({});

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleClose = () => {
    setOpenCreate(false);
    setOpenUpdate(false)
    setSelectedPatient({});
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${apiUrl}/Patient`);
      setPatients(response.data);
    } catch (error) {
      console.error("There was an error fetching the patients!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/Patient/${id}`);
      fetchPatients();
    } catch (error) {
      console.error("There was an error deleting the patients!", error);
    }
  };

  return (
    <>
      <Box width="100vw" padding="80px" height="100vh">
        <Box mb={4} display="flex" justifyContent="space-between">
          <Typography variant="h2">Patients</Typography>
          <Button
            onClick={handleOpenCreate}
            variant="outlined"
            size="small"
            color="primary"
          >
            Add Patient
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
              {patients.length == 0 ? (
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
                  {patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.name}</TableCell>
                      <TableCell>{patient.address}</TableCell>
                      <TableCell>{patient.country}</TableCell>
                      <TableCell>
                        <EditIcon
                          color="primary"
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            setSelectedPatient(patient);
                            handleOpenUpdate();
                          }}
                        />
                        <DeleteIcon
                          sx={{ marginLeft: "10px", cursor: "pointer" }}
                          color="error"
                          onClick={() => handleDelete(patient.id)}
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
          aria-labelledby="Add_Patient"
          aria-describedby="Add_Patient"
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
              Add Patient
            </Typography>
            <Box p={3}>
              <PatientForm
                onHandleCancel={handleClose}
                refresh={fetchPatients}
                type={"create"}
              />
            </Box>
          </Card>
        </Modal>
        <Modal
          open={openUpdate}
          onClose={handleClose}
          aria-labelledby="Edit_Patient"
          aria-describedby="Edit_Patient"
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
              Edit Patient
            </Typography>
            <Box p={3}>
              <PatientForm
                onHandleCancel={handleClose}
                refresh={fetchPatients}
                editPatientForm={selectedPatient}
                type={"edit"}
              />
            </Box>
          </Card>
        </Modal>
      </Box>
    </>
  );
};

export default PatientList;
