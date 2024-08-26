import React from 'react';
import { FaLinkedin, FaInstagramSquare, FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { useContextProvider } from '../../context/StoreContext';

const Footer = () => {

  const { token } = useContextProvider();

  return (
    <footer className="bg-[#1F2937] text-white py-8 sticky mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center border-t border-gray-800">
          <div className="text-center text-gray-400">
            <p className="mb-2">1234 Job Bridge Avenue, Job City, 56789</p>
            <p className="mb-2">Phone: +91 123-456-7890</p>
            <p>Email: support@yourhr.com</p>
          </div>

          <div className="text-center flex mt-7">
            <a href="https://facebook.com" className="text-gray-400 hover:text-white">
              <FaFacebook className='h-6 w-6 mx-2' />
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white">
              <FaTwitterSquare className='h-6 w-6 mx-2' />
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white">
              <FaLinkedin className='h-6 w-6 mx-2' />
            </a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-white">
              <FaInstagramSquare className='h-6 w-6 mx-2' />
            </a>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2024 YourHR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
