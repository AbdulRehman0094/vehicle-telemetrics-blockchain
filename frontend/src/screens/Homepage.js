import React, { useState } from 'react';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { isAddressValid } from '../contract';

const Homepage = () => {
  const [userAddress, setUserAddress] = useState('');
  const[flag,setflag]=useState(true);

  const handleInputChange = async (e) => {
    setUserAddress(e.target.value);
    const result = await isAddressValid(e.target.value); 
    setflag(result); 
  };

  const handleSubmit = () => {
   
      localStorage.setItem('userAddress', userAddress);
   };

  return (
    <div className=''>
      <Navbar title="Vehicles Sale and Purchase" />
      <div className="hero-image">
        <div className="login-card">
          <h2>Login</h2>
          <form >
            <label>
              Enter User Address:
              <input
                type="text"
                name="userAddress"
                value={userAddress}
                onChange={handleInputChange}
              />
            </label>
            <Link to='/dashboard'><button type="submit"  disabled={!flag} onClick={handleSubmit}>Login</button></Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Homepage;