import React from 'react';
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
import { useAddProviderPage } from './hooks/use-add-provider-page';

const theme = createTheme({});

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AddUser() {
  const {
    counties,
    subCounties,
    categories,
    isUserLoggedIn,
    onExit,
    formik,
    onChangeUpload,
  } = useAddProviderPage();

  const classes = useStyles();

  return isUserLoggedIn ? (
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
                    <FormControl fullWidth className={classes.formControl}>
                      <InputLabel id="category-select-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="category-select-label"
                        label="Category"
                        id="category"
                        name="category"
                        onChange={formik.handleChange}
                        value={formik.values.category}
                        variant="outlined"
                      >
                        {categories.map((category) => (
                          <MenuItem key={category.value} value={category.value}>
                            {category.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                      <input type="file" id="file" onChange={onChangeUpload} />
                    </label>
                  </Grid>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary">
                  Create Service Provider
                </Button>
                <Button color="primary" onClick={onExit}>
                  exit
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    </ThemeProvider>
  ) : null;
}

AddUser.layout = Admin;

export default AddUser;
