import React from 'react'
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useContextProvider } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Navbar = () => {

  const { token, setToken, profileData, url } = useContextProvider();
  const navigate = useNavigate();

  const LogoutHandler = () => {
    try {
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
      toast.success('Successfully logged out!');
    } catch (error) {
      toast.error(error.message || 'Logout failed. Please try again.');
    }
  };

  return (
    <nav className='flex justify-between items-center p-4 bg-gray-800 text-white h-[80px]'>
      <Link to="/" className='flex justify-center items-center gap-[15px]'>
        <img src={assets.logo} alt="Logo" className='h-15 w-12 text-white' />
        <div className='text-4xl font-semibold'>YourHR</div>
      </Link>
      <div className='flex space-x-6 relative right-5'>
        <Link to="/" className='hover:text-gray-400 text-xl'>Home</Link>
        {token ? <></>: <Link to="/user" className='hover:text-gray-400 text-xl'>Sign Up</Link>}
        <Link to="/contact" className='hover:text-gray-400 text-xl'>Contact Us</Link>
      </div>
      <div className='flex space-x-4'>
        {token ?
          <>
            <Link to="/profile" className='flex items-center'>
              {profileData?.image ? (
                <img
                  src={`${url}/images/${profileData.image}`}
                  alt='Profile'
                  className='rounded-full w-8 h-8 object-cover'
                />
              ) : (
                <FaUserCircle className='w-10 h-10 rounded-full' />
              )}
            </Link>
            <button onClick={LogoutHandler} className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>Logout</button>
          </>
          :
          <>
            <Link to="/user" className='flex items-center'>
              <FaUserCircle className='w-10 h-10 rounded-full' />
            </Link>
            <Link to="/user" className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'>Sign Up</Link>
          </>}
      </div>
    </nav>
  )
}

export default Navbar
