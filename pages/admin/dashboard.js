import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { firestore, auth } from '../../firebase';
import Icon from '@material-ui/core/Icon';
import {motion} from 'framer-motion'
import Store from '@material-ui/icons/Store';
import Admin from 'layouts/Admin.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardIcon from 'components/Card/CardIcon.js';
import CardFooter from 'components/Card/CardFooter.js';
import styles from 'assets/jss/nextjs-material-dashboard/views/dashboardStyle.js';
import { useRouter } from 'next/router';

function Dashboard() {
  const useStyles = makeStyles(styles);
  const router = useRouter();
  const classes = useStyles({
    root: {
      width: '100%',
    },
  });

  const [totalAlerts, setTotalAlerts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalServiceProviders, setTotalServiceProviders] = useState(0);
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

  
  const alertsSize = () => {
    firestore
      .collection('sms')
      .get()
      .then((snap) => {
        setTotalAlerts(snap.size);
      });
  };

  const usersSize = () => {
    firestore
      .collection('users')
      .get()
      .then((snap) => {
        setTotalUsers(snap.size);
      });
  };

  const serviceProvidersSize = () => {
    firestore
      .collection('serviceProviders')
      .get()
      .then((snap) => {
        setTotalServiceProviders(snap.size);
      });
  };

  useEffect(() => {
    alertsSize();
    usersSize();
    serviceProvidersSize();
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

    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Reported Incidents</p>
              <h3 className={classes.cardTitle}>{totalAlerts}</h3>
            </CardHeader>
            <CardFooter stats></CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="dark" stats icon>
              <CardIcon color="dark">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Total Users</p>
              <h3 className={classes.cardTitle}>{totalUsers}</h3>
            </CardHeader>
            <CardFooter stats></CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Service Providers</p>
              <h3 className={classes.cardTitle}>{5}</h3>
            </CardHeader>
            <CardFooter stats></CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer></GridContainer>
    </div>
    </motion.main>
  ) : null;
}
Dashboard.layout = Admin;

export default Dashboard;
