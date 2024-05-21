// UserContext.js
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [customerId, setCustomerId] = useState();

  useEffect(() => {
    const fetchCustomerId = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/questions/customer_id"
        ); // Replace with your API endpoint
        setCustomerId(response.data.customerId);
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
