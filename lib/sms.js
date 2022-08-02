import axios from "axios";
import { apikey, baseURL } from "../config/sms.config";

const instance = axios.create({ baseURL });

instance.interceptors.request.use(
  (config) => ({
    ...config,
    data: {
      ...config.data,
      apikey,
      partnerID: "3587",
      shortcode: "SULUHISHO",
      clientsmsid: "3587",
      pass_type: "plain",
    },
  }),
  (error) => Promise.reject(error)
);

export const sms = instance;
