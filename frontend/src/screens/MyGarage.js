import React from 'react'
import Navbar from '../Navbar'

const MyGarage = ({make,model,varient,price,milage,kilometer}) => {
  return (
    <>
    <Navbar title={"My Garage"} />
    <div className='flex'>
        <div className='card2'>
            <nav className='decoration'>
                <li>Make: {make}</li>
                <li>Model: {model}</li>
                <li>Varient:{varient}</li>
                <li>Price:{price}</li>
                <li>Millage:{varient} Km/L</li>
                <li>Kilometers Travelled:{varient}km</li>
            </nav>
        </div>
      
    </div>
    </>
  )
}

export default MyGarage