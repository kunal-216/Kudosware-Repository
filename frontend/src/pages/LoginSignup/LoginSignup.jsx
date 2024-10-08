import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContextProvider } from '../../context/StoreContext';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { assets } from '../../assets/assets';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { setToken, url } = useContextProvider();

  const [currState, setCurrState] = useState('Sign Up');
  const [img, setImg] = useState(null);
  const [resume, setResume] = useState(null);
  const [data, setData] = useState({
    bio: '',
    name: '',
    email: '',
    gender: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const changeFileHandler = (e) => {
    const { name, files } = e.target;
    if (name === 'file') {
      setImg(files[0]);
    } else if (name === 'resume') {
      setResume(files[0]);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }

    const formData = new FormData();
    if (img) formData.append('image', img);
    if (resume) formData.append('resume', resume);
    formData.append('name', data.name);
    formData.append('gender', data.gender);
    formData.append('bio', data.bio);
    formData.append('email', data.email);
    formData.append('password', data.password);

    try {
      let response;
      if (currState === 'Login') {
        response = await axios.post(newUrl, {
          email: data.email,
          password: data.password,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        response = await axios.post(newUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      if (response.status === 200) {
        setData({
          name: "",
          email: "",
          password: "",
          gender: "",
          bio: "",
        });
        setImg(null);
        setResume(null);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success('Successfully logged in!');
        navigate('/');
      } else {
        toast.error(response.data.message || 'Something went wrong.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const passwordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center my-3">
      <form
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md"
        onSubmit={submitHandler}
      >
        <h2 className="text-2xl font-bold text-center mb-6">{currState}</h2>
        {currState !== 'Login' &&
          <div className="add-img-upload flex-col mb-3">
            <p>Upload Profile Picture</p>
            <label htmlFor="image">
              <img src={img ? URL.createObjectURL(img) : assets.upload_area} alt="Upload" />
            </label>
            <input onChange={changeFileHandler} type="file" name="file" id="image" hidden required />
          </div>
        }
        <div className="mb-4 relative">
          {currState === 'Sign Up' && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Enter your Name"
                className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={onChangeHandler}
                value={data.name}
                required
              />
              <select
                name="gender"
                className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={onChangeHandler}
                value={data.gender}
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Enter your Email"
            className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={onChangeHandler}
            value={data.email}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Enter your Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              onChange={onChangeHandler}
              value={data.password}
              required
            />
            <div
              onClick={passwordToggle}
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>
        {currState === 'Sign Up' && (
          <>
            <textarea
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
              name="bio"
              placeholder="Enter your Bio"
              onChange={onChangeHandler}
              value={data.bio}
              required
            ></textarea>
            <div className="mb-4 flex-col">
              <p className='text-gray-500'>Upload Resume</p>
              <input
                type="file"
                name="resume"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={changeFileHandler}
                required
              />
            </div>
          </>
        )}
        <div className="mb-6 flex items-start">
          <input
            type="checkbox"
            className="mr-2 mt-1 leading-tight"
            required
          />
          <p className="text-sm text-gray-600">
            By continuing, I agree to the{' '}
            <a href="#" className="text-blue-500 hover:underline">
              terms of use
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-500 hover:underline">
              privacy policy
            </a>.
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {currState === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>
        {currState === 'Login' ? (
          <p
            className="mt-4 text-center text-sm text-gray-600 cursor-pointer"
            onClick={() => setCurrState('Sign Up')}
          >
            Create a new Account?{' '}
            <span className="text-blue-500 hover:underline">
              Click Here
            </span>
          </p>
        ) : (
          <p
            className="mt-4 text-center text-sm text-gray-600 cursor-pointer"
            onClick={() => setCurrState('Login')}
          >
            Already have an Account?{' '}
            <span className="text-blue-500 hover:underline">
              Login Here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginSignup;
