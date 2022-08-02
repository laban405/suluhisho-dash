import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import firebase from "firebase";
import { firestore, auth } from "../firebase";
import { sms } from "../lib/sms";

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
  isSP: true,
  profession: "",
  isActive: true,
  isAdmin: false,
  isClient: false,
  isOccupied: false,
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
  const [downloadURL, setDownloadURL] = useState(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const onExit = () => router.push("service-providers");

  const onSetIsUserLoggedIn = (value) => setIsUserLoggedIn(value);

  const createServiceProvider = (values) => {
    let file = image;
    let storageRef = firebase.storage().ref();
    let uploadTask = storageRef.child(`profile_pics/${file.name}`).put(file);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        throw error;
      },
      async () => {
        try {
          const url = await uploadTask.snapshot.ref.getDownloadURL();
          setDownloadURL(url);
          values.profileUrl = url;
          const res = await firestore.collection("users").add(values);
          await sms.post("/api/services/sendsms/", {
            mobile: values.phone,
            message:
              "Welcome to SuluHisho. Your account has been created successfully.",
          });
        } catch (error) {
          console.log("Error creating provider", error);
        }
      }
    );
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => createServiceProvider(values),
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
    downloadURL,
    image,
    progress,
    onExit,
    onSetIsUserLoggedIn,
    formik,
    onChangeUpload,
  };
};
