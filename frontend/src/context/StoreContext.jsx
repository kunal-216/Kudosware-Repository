import React, { createContext, useContext, useEffect, useState } from 'react'
import { toast } from "react-toastify"
import axios from "axios"

const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {

    const url = import.meta.env.VITE_API_URI
    const [token, setToken] = useState(null);
    const [profileData, setProfileData] = useState(null)

    const fetchData = async () => {
        try {
            const response = await axios.get(`${url}/api/user/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setProfileData(response.data.data);
            } else if (response.data.tokenExpired) {
                setToken(null);
                localStorage.removeItem('token');
                toast.error('Session expired. Please log in again.');
            } else {
                toast.error('Failed to fetch the profile data.');
            }

        } catch (error) {
            if (error.response && error.response.status === 401) {
                setToken(null);
                localStorage.removeItem('token');
                toast.error('Session expired. Please log in again.');
            } else {
                console.error('Error fetching data:', error);
                toast.error('An error occurred while fetching the profile data.');
            }
        }
    };

    useEffect(()=>{
        const loadData = () => {
            const Storedtoken = localStorage.getItem("token")
            if(Storedtoken){
                setToken(Storedtoken);
            }
        }
        loadData();
    },[])

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token])

    const logout = () => {
        setToken(null)
        setProfileData(null)
        localStorage.removeItem("token")
    }

    return (
        <StoreContext.Provider value={{ token, setToken, profileData, setProfileData, url, logout }}>
            {children}
        </StoreContext.Provider>
    )
}

export const useContextProvider = () => useContext(StoreContext);