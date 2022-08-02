import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import firebase from "firebase";
import { firestore, auth } from "../firebase";
import { api } from "../lib/api.lib";
import { generateString } from "../lib/random.lib";

//import { storage } from "../lib/firebase.lib";

const initialValues = {
  firstname: "",
  lastname: "",
  phone: "",
  email: "",
  location: "",
  county: "",
  subCounty: "",
  category: "",
  categoryID: "",
  nationalID: "",
  profession: "",
  position: {},
  latitude: "",
  longitude: "",
};

const validationSchema = Yup.object({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const useAddProviderPage = () => {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [image, setImage] = useState(null);

  const onExit = () => router.push("service-providers");

  const onSetIsUserLoggedIn = (value) => setIsUserLoggedIn(value);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const uploadTask = await firebase
          .storage()
          .ref(`profile_pics/${Date.now()}`)
          .put(image);
        values.profileUrl = await uploadTask.ref.getDownloadURL();
        const password = generateString(16);
        await auth.createUserWithEmailAndPassword(values.email, password);
        await firestore.collection("users").add({
          ...values,
          isSP: true,
          isActive: true,
          isAdmin: false,
          isClient: false,
          isOccupied: false,
        });
        await api.post("/notifications/sms/service-provider", {
          mobile: values.phone,
          email: values.email,
          password,
        });
      } catch (error) {
        console.log("Error creating provider", error);
      }
    },
  });

  const onChangeUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("../login");
      } else onSetIsUserLoggedIn(true);
    });
    console.log("storage ref: ", firebase.storage().ref());
  }, []);

  return {
    isUserLoggedIn,
    onExit,
    formik,
    onChangeUpload,
  };
};
