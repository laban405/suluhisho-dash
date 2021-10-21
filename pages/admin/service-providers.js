import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Admin from 'layouts/Admin.js';
import Divider from '@material-ui/core/Divider';
import { motion } from 'framer-motion';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import SearchComponent from 'components/Search/Search.js';
import Button from 'components/CustomButtons/Button.js';
import { MoreVert } from '@material-ui/icons';
import { useRouter } from 'next/router';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function Reports() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const router = useRouter();
  const [serviceProviders, setServiceProviders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalAlerts, setTotalAlerts] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const containerVariants = {
    hidden: {
      opacity: 0.5,
      scale: 1.1,
      y: 10,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { delay: 0, duration: 0.5 },
    },
  };

  const handleChangePage = (event, newPage) => {
    newPage > page ? fetchNextAlerts() : fetchPreviousAlerts();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    fetchAlerts();
  };

  const providersSize = () => {
    firestore
      .collection('locations')
      .get()
      .then((snap) => {
        setTotalAlerts(snap.size);
      });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleView = (provider) => {
    setAnchorEl(null);
    const currentProvider = JSON.stringify(provider);
    localStorage.setItem('provider', currentProvider);
    router.push('view-provider');
    console.log('stored provider...', localStorage.getItem('provider'));
  };

  const handleEdit = (provider) => {
    setAnchorEl(null);
    localStorage.setItem('provider', JSON.stringify(provider));
    router.push('manage-provider');
  };

  const handleDelete = (provider) => {
    setAnchorEl(null);
    firestore
      .collection('locations')
      .doc(provider.id)
      .delete()
      .then(() => {
        console.log('data deleted successfully!');
        fetchServiceProviders();
      })
      .catch((error) => {
        console.log('error deleting provider!');
        console.log('error deleting doc....', error);
      });
  };

  const handleSearch = () => {
    let providersRef = firestore.collection('locations');
    let query = providersRef.where('senderName', '==', 'Laban');
    setServiceProviders(query);
    handleSearch();
  };

  const fetchServiceProviders = async () => {
    const serviceProviderArr = [];
    firestore
      .collection('locations')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((serviceProvider) => {
          let currentProvider = serviceProvider.data();
          currentProvider.id = serviceProvider.id;
          serviceProviderArr.push(currentProvider);
        });
      })
      .then(() => {
        setServiceProviders(serviceProviderArr);
      });
  };

  useEffect(() => {
    fetchServiceProviders();
    providersSize();
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push('../login');
      } else {
        setIsUserLoggedIn(true);
      }
    });
  }, []);

  return isUserLoggedIn ? (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader>
              <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                  <h4 className={classes.cardTitleWhite}>Service Providers</h4>
                  <p className={classes.cardCategoryWhite}>
                    View and Manage all Service Providers.
                  </p>
                </GridItem>

                <GridItem xs={12} sm={12} md={2}></GridItem>
              </GridContainer>
            </CardHeader>
            <Divider />
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <SearchComponent
                    handleSearch={handleSearch}
                    placeholder={'Search category...'}
                  />
                </GridItem>
              </GridContainer>
              <Paper style={classes.root}>
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    'Name',
                    'Email',
                    'Location',
                    'Location Name',
                    'Phone',
                    'Action',
                  ]}
                  tableData={serviceProviders.map((data) => [
                    data.category,
                    data.email,
                    data.locationName,
                    data.name,
                    data.phone,
                    <div>
                      <Button
                        size="sm"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                      >
                        <MoreVert />
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleView(data)}>
                          View
                        </MenuItem>
                        <MenuItem onClick={() => handleEdit(data)}>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete(data)}>
                          Delete
                        </MenuItem>
                      </Menu>
                    </div>,
                  ])}
                />
              </Paper>
            </CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={10} container justify="center">
                <TablePagination
                  component="div"
                  count={totalAlerts}
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
    </motion.main>
  ) : null;
}

// styles
const styles = {
  cardCategoryWhite: {
    color: '#434444',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
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
