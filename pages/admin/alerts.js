import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../../firebase';
import moment from 'moment';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import Admin from 'layouts/Admin.js';
import Divider from '@material-ui/core/Divider';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import FilterAlerts from 'components/Menu/filterDataMenu';
import DownloadReport from 'components/Menu/downloadReport';
import Table from 'components/Table/Table.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import ManageAlert from 'components/Menu/viewAlertsMenu.js';
import { useRouter } from 'next/router';
import PageLoad from 'components/PageLoad/PageLoad.js';

export default function Reports() {
  const useStyles = makeStyles(styles);
  const router = useRouter();
  const classes = useStyles();
  const [alerts, setAlerts] = useState([]);
  const [lastVisibleData, setLastVisibleData] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalAlerts, setTotalAlerts] = useState(0);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // PDF report
  const alertsReport = new jsPDF();
  const headRows = () => [
    [
      'Sender Name',
      'Sender Number',
      'Location',
      'Message',
      'Longitude',
      'Latitude',
      'Incident Type',
    ],
  ];

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

  const bodyRows = () =>
    alerts &&
    alerts.map((alert) => [
      alert.senderName,
      alert.senderNumber,
      alert.location,
      alert.incidentType,
      alert.message,
      alert.lng,
      alert.lat,
    ]);

  alertsReport.autoTable({
    theme: 'striped',
    head: headRows(),
    body: bodyRows(),
    margin: { top: 20 },
    styles: {
      lineWidth: 1,
    },
    headStyles: {
      fillColor: [0, 0, 0],
      fontSize: 15,
    },
    footStyles: {
      fillColor: [241, 196, 15],
      fontSize: 15,
    },
  });

  const handleDownload = () => alertsReport.save();

  const handleChangePage = (event, newPage) => {
    newPage > page ? fetchNextAlerts() : fetchPreviousAlerts();
    setPage(newPage);
  };

  const fetchOldAlerts = () => {
    const alertsArr = [];
    firestore
      .collection('sms')
      .orderBy('date', 'desc')
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((alert) => {
          let currentAlertData = alert.data();
          currentAlertData.id = alert.id;
          alertsArr.push(currentAlertData);
          setLastVisibleData(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      })
      .then(() => {
        setAlerts(alertsArr);
      });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    fetchAlerts();
  };

  const alertsSize = () => {
    firestore
      .collection('sms')
      .get()
      .then((snap) => {
        setTotalAlerts(snap.size);
      });
  };

  const fetchAlerts = async () => {
    const alertsArr = [];

    firestore
      .collection('sms')
      .orderBy('date')
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((alert) => {
          let currentAlertData = alert.data();
          currentAlertData.id = alert.id;
          alertsArr.push(currentAlertData);
          setLastVisibleData(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      })
      .then(() => {
        setAlerts(alertsArr);
        console.log('alets array: ' + alertsArr);
      });
  };

  const fetchNextAlerts = async () => {
    const alertsArr = [];

    firestore
      .collection('sms')
      .orderBy('date')
      .startAfter(lastVisibleData)
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((alert) => {
          let currentAlertData = alert.data();
          currentAlertData.id = alert.id;
          alertsArr.push(currentAlertData);
          setLastVisibleData(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      })
      .then(() => {
        setAlerts(alertsArr);
      });
  };

  // to fix fetch previous alerts
  const fetchPreviousAlerts = async () => {
    const alertsArr = [];

    firestore
      .collection('sms')
      .orderBy('date')
      .endBefore(lastVisibleData)
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((alert) => {
          let currentAlertData = alert.data();
          currentAlertData.id = alert.id;
          alertsArr.push(currentAlertData);
          setLastVisibleData(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      })
      .then(() => {
        setAlerts(alertsArr);
      });
  };

  useEffect(() => {
    fetchAlerts();
    alertsSize();
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
                  <h4 className={classes.cardTitleWhite}>Incidents</h4>
                  <p className={classes.cardCategoryWhite}>
                    View and Manage all incidents.
                  </p>
                </GridItem>

                <GridItem xs={12} sm={12} md={2}></GridItem>
              </GridContainer>
            </CardHeader>
            <Divider />
            {alerts.length === 0 ? <PageLoad /> : null}
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                  <FilterAlerts
                    fetchOldAlerts={fetchOldAlerts}
                    fetchNewAlerts={fetchAlerts}
                  />
                </GridItem>
                <div style={{ float: 'right', marginLeft: '55px' }}>
                  <DownloadReport
                    handleDownload={handleDownload}
                    alertsData={alerts}
                  />
                </div>
              </GridContainer>
              <Paper style={classes.root}>
                <Table
                  tableHeaderColor="primary"
                  tableHead={[
                    'Date',
                    'Sender name',
                    'Sender Number.',
                    'Location',
                    'Recipients',
                    'Status',
                    'Message',
                    'Action',
                  ]}
                  tableData={alerts.map((data) => [
                    moment(data.date.seconds).format('LLL'),
                    data.senderName,
                    data.senderNumber,
                    data.location,
                    data.recipients,
                    data.status,
                    data.message,
                    <ManageAlert alertsData={data} fetchAlerts={fetchAlerts} />,
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
    printReport: {
      float: 'right',
    },
  },
  pagination: {
    padding: '10px',
  },
};

Reports.layout = Admin;
