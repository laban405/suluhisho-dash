import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../../firebase';
import firebase from 'firebase';
import * as Yup from 'yup';
import geofire from 'geofire';
import { motion } from 'framer-motion';
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
  const [downloadURL, setDownloadURL] = useState(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

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
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      location: '',
      county: '',
      subCounty: '',
      category: '',
      categoryID: '',
      nationalID: '',
      isSP: true,
      profession: '',
      isActive: true,
      isAdmin: false,
      isClient: false,
      isOccupied: false,
      position: {},
      latitude: '',
      longitude: '',
    },

    onSubmit: (values) => {
      values.name = `${values.firstname} ${values.lastname}`;
      // createUser(values);
    },
  });

  const handleUploadProfile = () => {
    let file = image;
    let storage = firebase.storage();
    let storageRef = storage.ref();
    let uploadTask = storageRef.child('profile_pics/' + file.name).put(file);
    let userValues = formik.values;

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        let progress =
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        throw error;
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          setDownloadURL(url);
          userValues.profileUrl = url;
          console.log('download url: ', console.log('user data: ', userValues));
          createUser(userValues);
        });
      }
    );
  };

  const handleChangeUpload = (e) => {
    e.preventDefault();
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

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
    console.log('storage ref: ', firebase.storage().ref());
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
                  <h4 className={styles.cardTitleWhite}>Add A New User</h4>
                </CardHeader>
                <CardBody>
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
                        id="subCounty"
                        name="subCounty"
                        onChange={formik.handleChange}
                        value={formik.values.subCounty}
                        placeholder={formik.values.subCounty}
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
                        id="nationalID"
                        name="nationalID"
                        onChange={formik.handleChange}
                        value={formik.values.nationalID}
                        placeholder={formik.values.nationalID}
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
                      <label>
                        Choose profile picture
                        <input
                          type="file"
                          id="file"
                          onChange={handleChangeUpload}
                        />
                      </label>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button
                    type="submit"
                    color="primary"
                    onClick={handleUploadProfile}
                  >
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

AddUser.layout = Admin;

export default AddUser;
