import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

//  Redux imports
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../app/features/authSlice';

const Navbar = () => {
    // accessing the user via useSelector
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    // logout handler
    const logoutUser = () => {
        navigate('/')
        dispatch(logout());
        localStorage.removeItem('token'); // removing the token on logout button click
    }

  return (
    <div className='shadow bg-white'>
        
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
            {/* resume logo - going back to home page */}
            <Link to='/'>
                <img src="/logo.svg" alt="logo" className='h-11 w-auto' />
            </Link>

            {/* user, logout */}
            <div className='flex items-center gap-4 text-sm'>
                <p className='max-sm:hidden'> Hi, {user?.name} </p>
                
                <button onClick={logoutUser} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'> Logout </button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar