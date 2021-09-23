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

/*
    /*
    - update
    ----------------------------------------------------------------
    -> service priders -> fetch users where isSP === true
    -> 
      "isActive":true,
      "isOccupied":false,
      "isAdmin": false,
      "isClient": false,
      "isSP": true,
      "name": name.text.trim(),
      "id": userId, -> from auth registration
      "email": email.text.trim(),
      "nationalID": nationalID.text.trim(),
      "phone": phone.text.trim(),
      "county": county,
      "subCounty": subCounty.text.trim(),
      "category": 'socialwork',
      'categoryID': "4",
      'position': myLocation.data -> geopoint datatype,

    */

function AddUser() {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      text: '',
      dateCreated: new Date(),
      category: 'general',
    },
    onSubmit: (values) => {
      createFAQ(values);
    },
  });

  // to fix updating with some null fields not working
  const createFAQ = async (newFAQData) => {
    firestore
      .collection('resources')
      .add(newFAQData)
      .then(() => {
        alert('Resource created!');
      })
      .then(() => {
        router.push('resource-center');
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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="dark">
                <h4 className={styles.cardTitleWhite}>Add A New User</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`Name:`}
                      id="name"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`Phone:`}
                      id="phone"
                      name="phone"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      id="text"
                      name="text"
                      onChange={formik.handleChange}
                      value={formik.values.text}
                      placeholder={formik.values.text}
                      labelText={'County:'}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      id="text"
                      name="text"
                      onChange={formik.handleChange}
                      value={formik.values.text}
                      placeholder={formik.values.text}
                      labelText={'Sub-County:'}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`Category:`}
                      id="title"
                      name="title"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`Category ID:`}
                      id="title"
                      name="title"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      id="text"
                      name="text"
                      onChange={formik.handleChange}
                      value={formik.values.text}
                      placeholder={formik.values.text}
                      labelText={'National ID'}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      id="text"
                      name="text"
                      onChange={formik.handleChange}
                      value={formik.values.text}
                      placeholder={formik.values.text}
                      labelText={'Position'}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary">
                  Create User
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    router.push('resource-center');
                    localStorage.removeItem('faq');
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

AddUser.layout = Admin;

export default AddUser;
