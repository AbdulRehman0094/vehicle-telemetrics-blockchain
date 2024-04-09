import React from 'react'
import { useState, useEffect } from 'react';
import Marketplace from './Marketplace';

//getVehiclebyowner  getforsalevehicle..
//
const RenderVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            // const result = await getAllVehicles();
        //  const userAddress= localStorage.getItem("userAddress");
        //     const filteredProducts = result.filter(product => vehicle.usrAddress===userAddress.toString());
        // setVehicles(result);
          } catch (error) {
            console.error('Error occured Vehicle Fetch', error);
          }
        };
    
        fetchProducts();
      }, []); 
    

  return (
    <>
    <div className='cardsmap'>
      {vehicles.map((vehicle, index) => (
        <Marketplace
          key={index}
          id={vehicle.vehicleId.toString()}
          make={vehicle.vehicleMake}
          model={vehicle.vehicleModel.toString()}
          price={vehicle.vehiclePrice.toString()}
          varient={vehicle.varient}
          
        />
      ))}
    </div>
  </>  )
}

export default RenderVehicles