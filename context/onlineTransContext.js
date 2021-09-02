import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const OnlineTransContext = createContext();

export const OnlineTransProvider = (props) => {
  const [onlineTrans, setOnlineTrans] = useState([]);

  const fetchOnlineTrans = () => {
    const instance = axios.create({
      baseURL: 'http://localhost:4000',
      timeout: 1000,
    });

    instance
      .get('/v1/online')
      .then((response) => {
        const transactionsData = response.data.result;
        setOnlineTrans([...transactionsData]);
        return response.data;
      }).catch((err) => console.log(err))

  }
  
  useEffect(() => {
    fetchOnlineTrans()
  }, []);

  return (
    <OnlineTransContext.Provider value={{ onlineTrans, setOnlineTrans, fetchOnlineTrans }}>
      {props.children}
    </OnlineTransContext.Provider>
  );
};
