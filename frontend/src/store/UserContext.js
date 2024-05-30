import axios from "axios";
import React, { createContext,  useContext,  useEffect, useState } from "react";

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

  return (
    <UserContext.Provider value={{ customerId, setCustomerId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
