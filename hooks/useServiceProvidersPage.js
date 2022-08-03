import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { firestore, auth } from "../firebase";

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
    router,
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
  };
};
