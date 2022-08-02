import firebase from "firebase";
import { config } from "../config/firebase.config";
firebase.initializeApp(config);
export const storage = firebase.storage();
