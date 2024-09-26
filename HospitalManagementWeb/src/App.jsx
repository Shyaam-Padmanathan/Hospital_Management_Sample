import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import HospitalList from './components/Hospital/HospitalList';
import HospitalForm from './components/Hospital/HospitalForm';
import PatientList from './components/Patient/PatientList';
import DoctorList from './components/Doctor/DoctorList';
import { CssBaseline } from '@mui/material';

const App = () => {
    return (
        <Router>
          <CssBaseline/>
            <Navigation />
            <Routes>
                <Route path="/" element={<Navigate to="/hospitals" replace />} />
                <Route path="/hospitals" element={<HospitalList />} />
                <Route path="/patients" element={<PatientList />} />
                <Route path="/doctors" element={<DoctorList />} />
                <Route path="/hospitals/new" element={<HospitalForm />} />
            </Routes>
        </Router>
    );
};

export default App;
