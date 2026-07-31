import React from 'react'
import { NavLink } from 'react-router-dom'
import "../css/Navbar.css"

const Navbar = () => {
  return (
    <nav className='navbar'>
       <div className='header'>
         <div className='logo'>LOGO</div>
         <div className='nav-links'>
             <ul>
                <li><NavLink to='/'>Home</NavLink></li>

                <li><NavLink to='/login'>Login</NavLink></li>

                <li><NavLink to='/register'>Register</NavLink></li>
             
                <li><NavLink to='/gen-report'>Generate Reports</NavLink></li>  
               
                <li><NavLink to='/past-report'>Past Reports</NavLink></li> 
          </ul>
         </div>
          
      </div>
  </nav>
   
  )
}

export default Navbar
