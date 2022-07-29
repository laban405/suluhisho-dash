import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../../firebase';
import firebase from 'firebase';
import * as Yup from 'yup';
import geofire from 'geofire';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Admin from 'layouts/Admin.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import {
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import { useAddProviderPage } from '../../hooks/use-add-provider-page';

const theme = createTheme({});

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AddUser() {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const { counties, subCounties } = useAddProviderPage();

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

  const classes = useStyles();

  return isUserLoggedIn ? (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <form onSubmit={formik.handleSubmit}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardHeader color="primary">
                  <h4 className="cardTitleWhite">Add Service Provider</h4>
                </CardHeader>
                <CardBody>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        label="First name"
                        id="firstname"
                        name="firstname"
                        onChange={formik.handleChange}
                        required
                        value={formik.values.firstname}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        label="Last name"
                        id="lastname"
                        name="lastname"
                        onChange={formik.handleChange}
                        required
                        value={formik.values.lastname}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        id="email"
                        name="email"
                        onChange={formik.handleChange}
                        required
                        value={formik.values.email}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        label="Phone"
                        id="phone"
                        name="phone"
                        onChange={formik.handleChange}
                        required
                        value={formik.values.phone}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="county-select-label">County</InputLabel>
                        <Select
                          labelId="county-select-label"
                          label="County"
                          id="county"
                          name="county"
                          onChange={formik.handleChange}
                          value={formik.values.county}
                          variant="outlined"
                        >
                          {counties.map((county) => (
                            <MenuItem key={county.value} value={county.value}>
                              {county.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="sub-county-select-label">
                          Sub County
                        </InputLabel>
                        <Select
                          labelId="sub-county-select-label"
                          label="Sub County"
                          id="subCounty"
                          name="subCounty"
                          onChange={formik.handleChange}
                          value={formik.values.subCounty}
                          variant="outlined"
                        >
                          {subCounties.map((subCounty) => (
                            <MenuItem
                              key={subCounty.value}
                              value={subCounty.value}
                            >
                              {subCounty.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        fullWidth
                        label="Category"
                        id="category"
                        name="category"
                        onChange={formik.handleChange}
                        required
                        value={formik.values.category}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        label="National ID"
                        id="nationalID"
                        name="nationalID"
                        onChange={formik.handleChange}
                        required
                        value={formik.values.nationalID}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        label="Profession"
                        id="profession"
                        name="profession"
                        onChange={formik.handleChange}
                        required
                        value={formik.values.profession}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        label="Latitude"
                        id="latitude"
                        name="latitude"
                        onChange={formik.handleChange}
                        required
                        value={formik.values.latitude}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        label="Longitude"
                        id="longitude"
                        name="longitude"
                        onChange={formik.handleChange}
                        required
                        value={formik.values.longitude}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        fullWidth
                        label="Location"
                        id="location"
                        name="location"
                        onChange={formik.handleChange}
                        required
                        value={formik.values.location}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <label>
                        Choose profile picture
                        <input
                          type="file"
                          id="file"
                          onChange={handleChangeUpload}
                        />
                      </label>
                    </Grid>
                  </Grid>
                </CardBody>
                <CardFooter>
                  <Button
                    type="submit"
                    color="primary"
                    onClick={handleUploadProfile}
                  >
                    Create Service Provider
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      router.push('service-providers');
                    }}
                  >
                    exit
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </form>
      </ThemeProvider>
    </motion.main>
  ) : null;
}

AddUser.layout = Admin;

export default AddUser;
