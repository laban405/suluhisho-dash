import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

export const OfflineTransContext = createContext();

export const OfflineTransProvider = (props) => {
  const [offlineTrans, setOfflineTrans] = useState([]);

  const fetchOfflineTrans = () => {
    const instance = axios.create({
      baseURL: 'http://localhost:4000',
      timeout: 30000,
    });

    instance
      .get('/v1/offline')
      .then((response) => {
        const transactionsData = response.data.result;
        setOfflineTrans([...transactionsData]);
        return response.data;
      }).catch((err) => console.log(err))

  }
  
  useEffect(() => {
    fetchOfflineTrans()
  }, []);

  return (
    <OfflineTransContext.Provider value={{ offlineTrans, setOfflineTrans, fetchOfflineTrans }}>
      {props.children}
    </OfflineTransContext.Provider>
  );
};
