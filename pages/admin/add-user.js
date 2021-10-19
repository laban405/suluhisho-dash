import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../../firebase';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import * as Yup from 'yup';
import geofire from 'geofire';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Admin from 'layouts/Admin.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
function AddUser() {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const SignupSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    firstname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    county: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    subcounty: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    phone: Yup.number().min(10, 'Too Short!').required('Required'),
    nationalID: Yup.number().required('Required'),
    location: Yup.string().required('Required'),
    phone: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    categoryID: Yup.number().required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      location: '',
      county: '',
      subcounty: '',
      category: '',
      categoryID: '',
      nationalID: '',
      profession: '',
      latitude: '',
      longitude: '',
    },
    // validationSchema: SignupSchema,
    onSubmit: (values) => {
      const hash = geofire.geohashForLocation([
        values.latitude,
        values.longitude,
      ]);
      values.geohash = hash;

      createUser(values);
    },
  });

  const createUser = async (newUserData) => {
    firestore
      .collection('users')
      .add(newUserData)
      .then(() => {
        alert('New user created!');
      })
      .then(() => {
        router.push('users');
      })
      .catch((error) => {
        console.log('could not create User...', error);
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
                <Stack direction="row" spacing={2}>
                  <Avatar
                    alt="User"
                    src="/static/images/avatar/3.jpg"
                    sx={{ width: 60, height: 60, float: 'right' }}
                  />
                </Stack>

                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`First Name:`}
                      id="firstname"
                      name="firstname"
                      onChange={formik.handleChange}
                      value={formik.values.firstname}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`Last Name:`}
                      id="lastname"
                      name="lastname"
                      onChange={formik.handleChange}
                      value={formik.values.lastname}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>

                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`Email:`}
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
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
                      id="county"
                      name="county"
                      onChange={formik.handleChange}
                      value={formik.values.county}
                      placeholder={formik.values.county}
                      labelText={'County:'}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      id="subcounty"
                      name="subcounty"
                      onChange={formik.handleChange}
                      value={formik.values.subcounty}
                      placeholder={formik.values.subcounty}
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
                      id="category"
                      name="category"
                      onChange={formik.handleChange}
                      value={formik.values.category}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`Category ID:`}
                      id="categoryID"
                      name="categoryID"
                      onChange={formik.handleChange}
                      value={formik.values.categoryID}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      id="nationaID"
                      name="nationaID"
                      onChange={formik.handleChange}
                      value={formik.values.nationaID}
                      placeholder={formik.values.nationaID}
                      labelText={'National ID or Passport No.'}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      id="profession"
                      name="profession"
                      onChange={formik.handleChange}
                      value={formik.values.profession}
                      placeholder={formik.values.profession}
                      labelText={'Profession'}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      id="latitude"
                      name="latitude"
                      onChange={formik.handleChange}
                      value={formik.values.latitude}
                      placeholder={formik.values.latitude}
                      labelText={'Location - Latitude'}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      id="longitude"
                      name="longitude"
                      onChange={formik.handleChange}
                      value={formik.values.longitude}
                      placeholder={formik.values.longitude}
                      labelText={'Location - Longitude'}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`Location/Address:`}
                      id="location"
                      name="location"
                      onChange={formik.handleChange}
                      value={formik.values.location}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <input
                      type="file"
                      id="profile"
                      name="profile"
                      accept="image/"
                      style={{ marginTop: 30 }}
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
                    router.push('users');
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
