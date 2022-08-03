import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import firebase from "firebase";
import { useFormik } from "formik";
import { firestore, auth } from "../firebase";
import { generateString } from "../lib/random.lib";
import { api } from "../lib/api.lib";

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

export const useServiceProvidersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [lastVisibleData, setLastVisibleData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [image, setImage] = useState(null);

  const handleSearchUser = (e) => {
    e.preventDefault();
    let searchVal = e.target.value.toLowerCase();
    searchUserByName(searchVal);
  };

  const searchUserByName = async (searchValue) => {
    setPageLoading(false);
    const usersArr = [];
    firestore
      .collection("users")
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((user) => {
          let currentUser = user.data();
          currentUser.id = user.id;
          if (
            currentUser.name?.toLowerCase().includes(searchValue) &&
            currentUser.isSP
          )
            usersArr.push(currentUser);
        });
      })
      .then(() => {
        setPageLoading(false);
        setUsers(usersArr);
      });
  };

  const handleChangePage = (event, newPage) => {
    newPage > page ? fetchNextUsers() : fetchPreviousUsersList();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    fetchUsers();
  };

  const fetchNextUsers = async () => {
    const usersArr = [];
    setPageLoading(true);

    firestore
      .collection("users")
      .orderBy("name")
      .startAfter(lastVisibleData)
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((alert) => {
          let currentUser = alert.data();
          currentUser.id = alert.id;
          if (currentUser.isSP) {
            usersArr.push(currentUser);
          }
          setLastVisibleData(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      })
      .then(() => {
        setPageLoading(false);
        setUsers(usersArr);
      })
      .catch((error) => {
        console.error(error);
        setPageLoading(false);
      });
  };

  const fetchPreviousUsersList = async () => {
    const usersArr = [];
    setPageLoading(true);
    firestore
      .collection("users")
      .orderBy("name")
      .endBefore(lastVisibleData)
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((alert) => {
          let currentUser = alert.data();
          currentUser.id = alert.id;
          if (currentUser.isSP) {
            usersArr.push(currentUser);
          }
          setLastVisibleData(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      })
      .then(() => {
        setPageLoading(false);
        setUsers(usersArr);
      })
      .catch((error) => {
        console.error(error);
        setPageLoading(false);
      });
  };

  const fetchUsers = async () => {
    setPageLoading(true);
    const usersArr = [];
    firestore
      .collection("users")
      .orderBy("name")
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((user) => {
          let currentUser = user.data();
          currentUser.id = user.id;
          if (currentUser.isSP) {
            usersArr.push(currentUser);
          }
          setLastVisibleData(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      })
      .then(() => {
        setPageLoading(false);
        setTotalUsers(usersArr.length);
        setUsers(usersArr);
      });
  };

  const handleOpenAddDialog = () => setOpenAddDialog(true);

  const handleCloseAddDialog = () => setOpenAddDialog(false);

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
        const { user } = await auth.createUserWithEmailAndPassword(
          values.email,
          password
        );
        console.log("user", user.uid);
        await firestore.collection("users").add({
          ...values,
          uid: user.uid,
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

  const handleChangeUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    fetchUsers();
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push("../login");
      } else {
        setIsUserLoggedIn(true);
      }
    });
  }, []);

  return {
    isUserLoggedIn,
    rowsPerPage,
    pageLoading,
    users,
    totalUsers,
    page,
    handleSearchUser,
    handleChangePage,
    handleChangeRowsPerPage,
    fetchUsers,
    openAddDialog,
    handleOpenAddDialog,
    handleCloseAddDialog,
    formik,
    handleChangeUpload,
  };
};
