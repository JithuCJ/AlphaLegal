import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const backend = process.env.REACT_APP_BACKEND_URL;

export const UserProvider = ({ children }) => {
  const [customerId, setCustomerId] = useState(null);
  const [userDetails, setUserDetails] = useState({});

  // fetch customer ID
  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${backend}customer_id`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Fetched Customer ID Response:", response.data);
          setCustomerId(response.data.customer_id);
        }
      } catch (error) {
        console.error("Error fetching customer ID:", error);
      }
    };

    fetchCustomerId();
  }, []);

  // fetch a user Details

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${backend}user-details`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log("Fetched User Details Response:", response.data);
          setUserDetails(response.data.user_details);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [setUserDetails]);

  // update the userID and Password
  const updateUser = async (newPassword) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${backend}update-user`,
        { new_password: newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("User updated successfully:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider
      value={{
        customerId,
        setCustomerId,  
        userDetails,
        setUserDetails,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
