import React from 'react';
import './App.css';
import Homepage from './screens/Homepage';
import Dashboard from './screens/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Marketplace from './screens/Marketplace';
import MyGarage from './screens/MyGarage';
import AddVehicle from './screens/AddVehicle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/mygarage" element={<MyGarage />}/>
        <Route path="/addvehicle" element={<AddVehicle />}/>


      </Routes>
    </Router>
  );
}

export default App;
