import { useRouter } from "next/router";
import { useState } from "react";

export const useServiceProvidersPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [lastVisibleData, setLastVisibleData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  return {
    isUserLoggedIn,
    setPageLoading,
    rowsPerPage,
    setIsUserLoggedIn,
    pageLoading,
    users,
    totalUsers,
    page,
    setLastVisibleData,
    setTotalUsers,
    setUsers,
    setRowsPerPage,
    setPage,
  };
};
