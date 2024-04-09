import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { getForSaleVehicles } from '../contract';
import { buyVehicle } from '../contract';

const Marketplace = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const result = await getForSaleVehicles();
        setVehicles(result);
        console.log(result)
      } catch (error) {
        console.error('Error fetching vehicles:', error);
      }
    };

    fetchVehicles();
  }, []);

  const handleBuy = (id, price) => {
    buyVehicle(id,price,localStorage.getItem("userAddress"));
    alert('Bought Successful')
  };

  return (
    <>
      <Navbar title={"Market Place: Buy & Sell Vehicles"} />
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
            {vehicle.owner.toLowerCase() !== localStorage.getItem("userAddress").toLowerCase() && (
              <button onClick={() => handleBuy(vehicle.id, vehicle.price)} className='card-button-small'>Buy</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Marketplace;
