import { useCallback, useEffect, useState } from "react";
import { firestore } from "../firebase";

export const useFetchServiceProviders = () => {
  const [serviceProviders, setServiceProviders] = useState([]);

  const fetchServiceProviders = useCallback(async () => {
    const data = [];
    const res = await firestore
      .collection("users")
      .where("isSP", "==", true)
      .get();

    res.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
    setServiceProviders(data);
  }, []);

  useEffect(() => {
    fetchServiceProviders();
  }, []);

  return {
    serviceProviders,
  };
};
