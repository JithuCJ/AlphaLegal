import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

const backend = process.env.REACT_APP_BACKEND_URL;

export const UserProvider = ({ children }) => {
  const [customerId, setCustomerId] = useState(null);

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

  const updateUser = async (newCustomerId, newPassword) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${backend}update-user`,
        { new_customer_id: newCustomerId, new_password: newPassword },
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
    <UserContext.Provider value={{ customerId, setCustomerId, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
