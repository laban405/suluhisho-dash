import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Admin from 'layouts/Admin.js';
import Divider from '@material-ui/core/Divider';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import SearchComponent from 'components/Search/Search.js';
import ManageUser from 'components/Menu/viewUserMenu.js';
import { useRouter } from 'next/router';

export default function Reports() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [lastVisibleData, setLastVisibleData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const handleSearch = (e) => {
    let searchVal = e.target.value.toLowerCase();
    searchUserByName(searchVal);
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

  const usersTotal = () => {
    firestore
      .collection('users')
      .get()
      .then((snap) => {
        setTotalUsers(snap.size);
      });
  };

  const fetchNextUsers = async () => {
    const usersArr = [];

    firestore
      .collection('users')
      .orderBy('name')
      .startAfter(lastVisibleData)
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((alert) => {
          let currentUser = alert.data();
          currentUser.id = alert.id;
          usersArr.push(currentUser);
          setLastVisibleData(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      })
      .then(() => {
        setUsers(usersArr);
      });
  };

  const fetchPreviousUsersList = async () => {
    const usersArr = [];
    firestore
      .collection('users')
      .orderBy('name')
      .endBefore(lastVisibleData)
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((alert) => {
          let currentUser = alert.data();
          currentUser.id = alert.id;
          usersArr.push(currentUser);
          setLastVisibleData(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      })
      .then(() => {
        setUsers(usersArr);
      });
  };

  const fetchUsers = async () => {
    const usersArr = [];
    firestore
      .collection('users')
      .orderBy('name')
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((user) => {
          let currentUser = user.data();
          currentUser.id = user.id;
          usersArr.push(currentUser);
          setLastVisibleData(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      })
      .then(() => setUsers(usersArr));
  };

  const searchUserByName = (searchValue) => {
    const usersArr = [];
    firestore
      .collection('users')
      .orderBy('name')
      .startAt(searchValue.toLowerCase())
      .endAt(searchValue.toLowerCase() + '\uf8ff')
      .get()
      .then((snap) => {
        snap.forEach((user) => {
          let currentUser = user.data();
          currentUser.id = user.id;
          usersArr.push(currentUser);
          setLastVisibleData(snap.docs[snap.docs.length - 1]);
        });
      })
      .then(() => setUsers(usersArr));
  };

  useEffect(() => {
    fetchUsers();
    usersTotal();
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push('../login');
      } else {
        setIsUserLoggedIn(true);
      }
    });
  }, []);

  return isUserLoggedIn ? (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader>
            <GridContainer>
              <GridItem xs={12} sm={12} md={10}>
                <h4 className={classes.cardTitleWhite}>Users</h4>
                <p className={classes.cardCategoryWhite}>
                  View and Manage all users.
                </p>
              </GridItem>

              <GridItem xs={12} sm={12} md={2}></GridItem>
            </GridContainer>
          </CardHeader>
          <Divider />
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <SearchComponent handleSearch={handleSearch} />
              </GridItem>
            </GridContainer>
            <Paper style={classes.root}>
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  'Name',
                  'Phone',
                  'NationalID',
                  'Email',
                  'County',
                  'Sub-County',
                  'Action',
                ]}
                tableData={users.map((userData) => [
                  userData.name,
                  userData.phone,
                  userData.nationalID,
                  userData.email,
                  userData.county,
                  userData.subCounty,
                  <ManageUser userData={userData} fetchUsers={fetchUsers} />,
                ])}
              />
            </Paper>
          </CardBody>
          <GridContainer>
            <GridItem xs={12} sm={12} md={10} container justify="center">
              <TablePagination
                component="div"
                count={totalUsers}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={2} container></GridItem>
          </GridContainer>
        </Card>
      </GridItem>
    </GridContainer>
  ) : null;
}

// styles
const styles = {
  cardCategoryWhite: {
    '&,& a,& a:hover,& a:focus': {
      color: '#434444',
      margin: '0',
      fontSize: '14px',
      marginTop: '0',
      marginBottom: '0',
    },
    '& a,& a:hover,& a:focus': {
      color: '#FFFFFF',
    },
  },
  cardTitleWhite: {
    color: '#434444',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '500',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  pagination: {
    padding: '10px',
  },
};

Reports.layout = Admin;
