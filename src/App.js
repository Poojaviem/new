import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import Home from './pages/Home';
import PatientDashboard from './pages/PatientDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from './pages/AdminLogin';
import Slot from './pages/Slot';
import Appointment from './pages/Appointment';
import Edit from './pages/Edit';
import { useState } from 'react';
import Adminappointment from './pages/Adminappointment';
import PatientDelete from './pages/PatientDelete';

function App() {
  const [patientId, setPatientId] = useState();

  const getPatientIdHandler = (id) => {
    // console.log('the id is edited: ', id);
    setPatientId(id);
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/slot" element={<Slot />} />
        <Route path="/edit" element={<Edit id={patientId} setPatientId={setPatientId} />} />
        <Route path="/patientDashboard" element={<PatientDashboard  getPatientId={getPatientIdHandler} />} />
        <Route path='/adminAppointment' element={<Adminappointment/>}/>
        <Route path='/patientDelete' element={<PatientDelete/>}/>

      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
