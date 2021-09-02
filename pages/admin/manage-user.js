import React, { useEffect, useState } from 'react';
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
  const router = useRouter();
  const [user, setUser] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: user.name,
      phone: user.phone,
      email: user.email,
      nationalID: user.nationalID,
      county: user.county,
      subCounty: user.subCounty,
    },
    onSubmit: (values) => {
      let newValues = {
        name: values.name || user.name,
        phone: values.phone || user.phone,
        email: values.email || user.email,
        nationalID: values.nationalID || user.nationalID,
        county: values.county || user.county,
        subCounty: values.subCounty || user.subCounty,
      };
      updateUser(newValues);
      console.log('udate user values..', newValues);
    },
  });

  const updateUser = async (newUserValues) => {
    const user = JSON.parse(localStorage.getItem('user'));
    await firestore.collection('users').doc(user.id).update(newUserValues);
    router.push('users');
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
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
                <h4 className={styles.cardTitleWhite}>Edit User</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText={`Name:`}
                      id="name"
                      onChange={formik.handleChange}
                      value={formik.values.name || user.name}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText={`Phone:`}
                      id="phone"
                      name="phone"
                      onChange={formik.handleChange}
                      value={formik.values.phone || user.phone}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={`Email:`}
                      id="email"
                      onChange={formik.handleChange}
                      value={formik.values.email || user.email}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`National ID:`}
                      id="nationalID"
                      onChange={formik.handleChange}
                      value={formik.values.nationalID || user.nationalID}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`County:`}
                      id="county"
                      onChange={formik.handleChange}
                      value={formik.values.county || user.county}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText={`SubCounty:`}
                      id="subCounty"
                      onChange={formik.handleChange}
                      value={formik.values.subCounty || user.subCounty}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary">
                  Update User
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    router.push('users');
                    localStorage.removeItem('user');
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
