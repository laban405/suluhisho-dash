import axios from "axios";
import { smsData, baseURL } from "../config/sms.config";

const instance = axios.create({ baseURL });

instance.interceptors.request.use(
  (config) => ({
    ...config,
    data: {
      ...config.data,
      ...smsData,
    },
  }),
  (error) => {
    return Promise.reject(error);
  }
);

export const sms = instance;
