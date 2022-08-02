import axios from "axios";
import { baseURL } from "../config/api.config";

const instance = axios.create({ baseURL });

export const api = instance;
