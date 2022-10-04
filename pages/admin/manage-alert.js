import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { firestore, auth } from '../../firebase';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Admin from 'layouts/Admin.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

function AlertEdit() {
  const [alert, setAlert] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      date: alert.date,
      senderName: alert.senderName,
      senderNumber: alert.senderNumber,
      status: alert.status,
      location: alert.location,
      recipients: alert.recipients,
      message: alert.message,
    },
    onSubmit: (values) => {
      console.log('submitted edit!...', JSON.stringify(values, null, 2));
      let newValues = {
        date: alert.date,
        senderName: values.senderName || alert.senderName,
        senderNumber: values.senderNumber || alert.senderNumber,
        status: values.status || alert.status,
        location: values.location || alert.location,
        recipients: values.recipients || alert.recipients,
        message: values.message || alert.message,
      };
      updateAlert(newValues);
      console.log('new values..', newValues);
    },
  });

  const updateAlert = async (updatedAlert) => {
    const alert = JSON.parse(localStorage.getItem('alert'));
    await firestore.collection('sms').doc(alert.id).update(updatedAlert);
    router.push('alerts');
  };

  useEffect(() => {
    setAlert(JSON.parse(localStorage.getItem('alert')));
    auth.onAuthStateChanged(async (user) => {
      const { isAdmin } = JSON.parse(localStorage.getItem('user'));

      if (!user || !isAdmin) {
        router.push('../login');
      } else {
        setIsUserLoggedIn(true);
      }
    });
  }, []);

  return isUserLoggedIn ? (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="dark">
                <h4 className={styles.cardTitleWhite}>View or Edit Alert</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText={`Date: Inactive`}
                      id="company-disabled"
                      value={
                        formik.values.date ||
                        `${moment(
                          alert.date ? alert.date.seconds : alert.date
                        ).format('LLL')}`
                      }
                      formControlProps={{
                        fullWidth: true,
                      }}
                      style={{ color: 'black' }}
                      inputProps={{
                        disabled: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText={`Sender Name:`}
                      id="senderName"
                      name="senderName"
                      onChange={formik.handleChange}
                      value={formik.values.senderName || alert.senderName}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={`Sender Number:`}
                      id="senderNumber"
                      onChange={formik.handleChange}
                      value={formik.values.senderNumber || alert.senderNumber}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText={`Location:`}
                      id="location"
                      onChange={formik.handleChange}
                      value={formik.values.location || alert.location}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText={`Recipients:`}
                      id="recipients"
                      onChange={formik.handleChange}
                      value={formik.values.recipients || alert.recipients}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText={`Status:`}
                      id="status"
                      onChange={formik.handleChange}
                      value={formik.values.status || alert.status}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText={`Message:`}
                      id="message"
                      onChange={formik.handleChange}
                      value={
                        formik.values.message ||
                        `${
                          alert.message
                            ? alert.message.substr(0, 50)
                            : alert.message
                        }...`
                      }
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary">
                  Update Alert
                </Button>
                <Button color="primary" onClick={() => router.push('alerts')}>
                  exit
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    </div>
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
