import React from 'react';
import './App.css';
import Homepage from './screens/Homepage';
import Dashboard from './screens/Dashboard';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Marketplace from './screens/Marketplace';
import MyGarage from './screens/MyGarage';
import AddVehicle from './screens/AddVehicle';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/marketplace" component={Marketplace} />
        <Route path="/mygarage" component={MyGarage} />
        <Route path="/addvehicle" component={AddVehicle} />
      </Switch>
    </Router>
  );
}

export default App;
