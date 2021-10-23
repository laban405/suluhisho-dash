import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../../firebase';
import axios from 'axios';
import moment from 'moment';
import { motion } from 'framer-motion';
import firebase from 'firebase';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Admin from 'layouts/Admin.js';
import GridItem from 'components/Grid/GridItem.js';
import Send from '@material-ui/icons/Send';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

function AlertEdit() {
  const router = useRouter();
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

  const formik = useFormik({
    initialValues: {
      title: '',
      text: '',
      dateCreated: moment().format('MMMM Do YYYY, h:mm:ss a'),
      topic: 'messaging',
    },
    onSubmit: (values) => {
      createIncident(values);
      axios.post(
        process.env.NEXT_PUBLIC_PUSH_NOTIFICATION_URL_REMOTE,
        {
          title: values.title,
          text: values.text,
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
    },
  });

  const getUser = () => {
    return firebase.auth().currentUser.email;
  };

  const createIncident = async (newFAQData) => {
    newFAQData.incidentType = 'push notification';
    newFAQData.senderEmail = getUser();
    newFAQData.status = 'sent';

    firestore
      .collection('notifications')
      .add(newFAQData)
      .then(() => {
        alert('Push notification sent!');
      })
      .then(() => {
        router.push('dashboard');
      })
      .catch((error) => {
        console.log('could not create FAQ...', error);
      });
  };

  useEffect(() => {
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
        <form onSubmit={formik.handleSubmit}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="dark">
                  <h4 className={styles.cardTitleWhite}>
                    Send New Push Notification
                  </h4>
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText={`Title:`}
                        id="title"
                        name="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        id="text"
                        name="text"
                        onChange={formik.handleChange}
                        value={formik.values.text}
                        placeholder={formik.values.text}
                        labelText={'Add new text....'}
                        formControlProps={{
                          fullWidth: true,
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button type="submit" color="primary">
                    <Send />
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      router.push('dashboard');
                    }}
                  >
                    exit
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </form>
      </div>
    </motion.main>
  ) : null;
}

const styles = {
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
};

AlertEdit.layout = Admin;

export default AlertEdit;
