import React from 'react'
import Navbar from '../Navbar'
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className=''>
    <Navbar title="Vehicles Sale and Purchase" />
    <div className="hero-image">
      <div className="login-card">
        <h2>Login</h2>
        <form>
          <label>
            Enter User Address:
            <input type="text" name="userAddress" />
          </label>
          <Link to='/dashboard'><button type="submit">Login</button></Link>
        </form>
      </div>
    </div>
  </div>
  )
}

export default Homepage