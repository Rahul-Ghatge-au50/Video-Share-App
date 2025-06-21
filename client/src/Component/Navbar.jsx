import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();


    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    }

  return (
    <div className='w-full border-b-1 h-12 flex justify-between p-2 sticky top-0 bg-white' >
        {
            location.pathname !== '/dashboard' ? <NavLink to='/dashboard' className='text-lg' >Dashboard</NavLink>
            :
            <NavLink to='/upload' className='text-lg' >Upload</NavLink>

        }
        
        <div>
            <button className='cursor-pointer text-lg' onClick={handleLogout}>Logout</button> 
        </div>
    </div>
  )
}

export default Navbar
