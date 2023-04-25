import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
<nav className='nav'>
    <Link to='/' className='link' ><li>Home</li></Link>
    <Link to='/appointment'className='link' ><li>Appointment</li></Link>
    <Link to='/adminlogin'className='link' ><li>AdminLogin</li></Link>

</nav>
       
    </div>
  )
}

export default Header