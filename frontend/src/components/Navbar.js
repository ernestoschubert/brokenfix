import React from 'react'
import '../styles/Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="nav-container">
      <Link to='/'>
          <img src="./assets/logo.svg" alt="logo" className="nav-logo" />
      </Link>
      <div className="nav-menu">
          <Link to="/" className='navbar-links'>
            Home
          </Link>
          <Link to="/services" className='navbar-links'>
            Services
          </Link>
          <Link to='/contact' className='navbar-links'>
            Contact Us
          </Link>
      </div>
      <div className='cont-log-sign'>
        <Link to="register" className='navbar-links'>
          Sign Up
        </Link>
        <Link to="/login" className='navbar-links'>
          Log In
        </Link>
      </div>
    </div>
  )
}

export default Navbar
