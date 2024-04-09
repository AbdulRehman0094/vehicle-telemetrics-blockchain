import React from "react";
import Navbar from "../Navbar";
import { Link } from 'react-router-dom';


function Dashboard() {
    return (
        <>
            <Navbar title={"Dashboard"} />
            <div className="flex">
                <div className="card1">
                    <Link to="/marketplace" className="comp">
                        <button className="card-button">Visit Marketpalce</button>
                    </Link>
                </div>

                <div className="card">
                    <Link to="/mygarage" className="comp">
                        <button className="card-button">My Garage</button>
                    </Link>
                </div>
                 
                <div className="card3">
                    <Link to="/addvehicle" className="comp">
                        <button className="card-button">Add Vechile</button>
                    </Link>
                </div>
              
            </div>


        </>
    );
}

export default Dashboard;