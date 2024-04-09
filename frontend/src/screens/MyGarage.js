import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { getVehiclesByOwnerAddress } from '../contract';

const MyGarage = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const result = await getVehiclesByOwnerAddress(localStorage.getItem("userAddress"));
        setVehicles(result);
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  return (
    <>
      <Navbar title={"My Garage"} />
      <div className='parent'>
        {vehicles.map(vehicle => (
          <div key={vehicle.id} className='newcard'>
          <div className='card-content'>
            <div className='card-key'>Make:</div>
            <div className='card-value'>{vehicle.make}</div>
          </div>
          <div className='card-content'>
            <div className='card-key'>Model:</div>
            <div className='card-value'>{vehicle.model}</div>
          </div>
          <div className='card-content'>
            <div className='card-key'>Variant:</div>
            <div className='card-value'>{vehicle.variant}</div>
          </div>
          <div className='card-content'>
            <div className='card-key'>Price:</div>
            <div className='card-value'>{vehicle.price.toString()}</div>
          </div>
          <div className='card-content'>
            <div className='card-key'>Millage:</div>
            <div className='card-value'>{vehicle.milage.toString()} Kms/L</div>
          </div>
          <div className='card-content'>
            <div className='card-key'>Kilometers Travelled:</div>
            <div className='card-value'>{vehicle.totalKilometers.toString()} km</div>
          </div>
          <div className='card-content'>
            <div className='card-key'>Vehicle Owner:</div>
            <div className='card-value small'>{vehicle.owner}</div>
          </div>
         
        </div>
        ))}
      </div>
    </>
  );
};

export default MyGarage;
