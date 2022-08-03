import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Admin from 'layouts/Admin.js';
import { motion } from 'framer-motion';
import Divider from '@material-ui/core/Divider';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import SearchComponent from 'components/Search/Search.js';
import ManageUser from 'components/Menu/viewUserMenu.js';
import PageLoad from 'components/PageLoad/PageLoad.js';
import { useServiceProvidersPage } from '../../../hooks/useServiceProvidersPage';

const useStyles = makeStyles({
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
});

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

function ServiceProviders() {
  const classes = useStyles();
  const {
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
  } = useServiceProvidersPage();

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
                  <h4 className={classes.cardTitleWhite}>Users</h4>
                  <p className={classes.cardCategoryWhite}>
                    View and Manage Service Providers.
                  </p>
                </GridItem>

                <GridItem xs={12} sm={12} md={2}>
                  <Button
                    variant="contained"
                    onClick={() => router.push('add-provider')}
                  >
                    Add Provider
                  </Button>
                </GridItem>
              </GridContainer>
            </CardHeader>
            <Divider />
            {pageLoading ? <PageLoad /> : null}
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <SearchComponent handleSearch={handleSearchUser} />
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
                    'Profile Pic',
                    'Action',
                  ]}
                  tableData={users.map((userData) => [
                    userData.name,
                    userData.phone,
                    userData.nationalID,
                    userData.email,
                    userData.county,
                    userData.subCounty,
                    userData.profileUrl ? (
                      <a href={userData.profileUrl} target="_blank">
                        {' '}
                        view profile{' '}
                      </a>
                    ) : (
                      'No profile picture available'
                    ),
                    userData.profilePicture,
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
    </motion.main>
  ) : null;
}

ServiceProviders.layout = Admin;

export default ServiceProviders;
