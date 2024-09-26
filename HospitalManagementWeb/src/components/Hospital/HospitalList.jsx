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
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import HospitalForm from "./HospitalForm";
import { ModalStyle } from "../Patient/PatientList";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const apiUrl = import.meta.env.VITE_API_URL;

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState({});
  const [loading, setLoading] = useState(false);


  const handleOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleOpenUpdate = () => {
    setOpenUpdate(true);
  };
  const handleClose = () => {
    setOpenCreate(false);
    setOpenUpdate(false);
    setSelectedHospital({});
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(`${apiUrl}/Hospital`);
      setHospitals(response.data);
    } catch (error) {
      console.error("There was an error fetching the hospitals!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${apiUrl}/Hospital/${id}`);
      setLoading(false);
      fetchHospitals();
    } catch (error) {
      console.error("There was an error deleting the hospital!", error);
    }
  };

  return (
    <>
      <Box width="100vw" padding="80px" height="100vh">
        <Box mb={4} display="flex" justifyContent="space-between">
          <Typography variant="h2">Hospitals</Typography>
          <Button
            onClick={handleOpenCreate}
            variant="outlined"
            size="small"
            color="primary"
          >
            Add Hospital
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
              {hospitals.length == 0 ? (
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
                  {hospitals.map((hospital) => (
                    <TableRow key={hospital.id}>
                      <TableCell>{hospital.name}</TableCell>
                      <TableCell>{hospital.address}</TableCell>
                      <TableCell>{hospital.country}</TableCell>
                      <TableCell>
                        <EditIcon
                          color="primary"
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            setSelectedHospital(hospital);
                            handleOpenUpdate();
                          }}
                        />
                        {loading ? (
                          <CircularProgress
                            sx={{ marginLeft: "10px", cursor: "pointer" }}
                            color="error"
                          />
                        ) : (
                          <DeleteIcon
                            sx={{ marginLeft: "10px", cursor: "pointer" }}
                            color="error"
                            onClick={() => handleDelete(hospital.id)}
                          />
                        )}
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
          aria-labelledby="Add_hospital"
          aria-describedby="Add_hospital"
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
              Add Hospital
            </Typography>
            <Box p={3}>
              <HospitalForm
                onHandleCancel={handleClose}
                refresh={fetchHospitals}
                type={"create"}
              />
            </Box>
          </Card>
        </Modal>
        <Modal
          open={openUpdate}
          onClose={handleClose}
          aria-labelledby="Edit_hospital"
          aria-describedby="Edit_hospital"
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
              Edit Hospital
            </Typography>
            <Box p={3}>
              <HospitalForm
                onHandleCancel={handleClose}
                refresh={fetchHospitals}
                editHospitalForm={selectedHospital}
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
