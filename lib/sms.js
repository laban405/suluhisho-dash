import axios from "axios";
import { baseURL } from "../config/sms.config";

const instance = axios.create({ baseURL });

export const sms = instance;
