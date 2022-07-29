import React from 'react';
import Admin from 'layouts/Admin.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import { CssBaseline } from '@material-ui/core';
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from '@material-ui/core/styles';
import { useAddProviderPage } from './useAddProviderPage';
import SuTextField from '../../../components/Inputs/SuTextField';
import SuFormControl from '../../../components/Inputs/SuFormControl';
import SuGrid from '../../../components/Layout/SuGrid';
import SuInputLabel from '../../../components/Inputs/SuInputLabel';
import SuMenuItem from '../../../components/Navigation/SuMenuItem';
import SuSelect from '../../../components/Inputs/SuSelect';

const theme = createTheme({});

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
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
        <SuGrid container spacing={2}>
          <SuGrid item xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="primary">
                <h4 className="cardTitleWhite">Add Service Provider</h4>
              </CardHeader>
              <CardBody>
                <SuGrid container spacing={3}>
                  <SuGrid item xs={12} sm={12} md={6}>
                    <SuTextField
                      fullWidth
                      label="First name"
                      id="firstname"
                      name="firstname"
                      onChange={formik.handleChange}
                      required
                      value={formik.values.firstname}
                      variant="outlined"
                    />
                  </SuGrid>
                  <SuGrid item xs={12} sm={12} md={6}>
                    <SuTextField
                      fullWidth
                      label="Last name"
                      id="lastname"
                      name="lastname"
                      onChange={formik.handleChange}
                      required
                      value={formik.values.lastname}
                      variant="outlined"
                    />
                  </SuGrid>
                  <SuGrid item xs={12} sm={12} md={6}>
                    <SuTextField
                      fullWidth
                      label="Email"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      required
                      value={formik.values.email}
                      variant="outlined"
                    />
                  </SuGrid>
                  <SuGrid item xs={12} sm={12} md={6}>
                    <SuTextField
                      fullWidth
                      label="Phone"
                      id="phone"
                      name="phone"
                      onChange={formik.handleChange}
                      required
                      value={formik.values.phone}
                      variant="outlined"
                    />
                  </SuGrid>
                  <SuGrid item xs={12} sm={12} md={6}>
                    <SuFormControl fullWidth className={classes.formControl}>
                      <SuInputLabel id="county-select-label">
                        County
                      </SuInputLabel>
                      <SuSelect
                        labelId="county-select-label"
                        label="County"
                        id="county"
                        name="county"
                        onChange={formik.handleChange}
                        value={formik.values.county}
                        variant="outlined"
                      >
                        {counties.map((county) => (
                          <SuMenuItem key={county.value} value={county.value}>
                            {county.label}
                          </SuMenuItem>
                        ))}
                      </SuSelect>
                    </SuFormControl>
                  </SuGrid>
                  <SuGrid item xs={12} sm={12} md={6}>
                    <SuFormControl fullWidth className={classes.formControl}>
                      <SuInputLabel id="sub-county-select-label">
                        Sub County
                      </SuInputLabel>
                      <SuSelect
                        labelId="sub-county-select-label"
                        label="Sub County"
                        id="subCounty"
                        name="subCounty"
                        onChange={formik.handleChange}
                        value={formik.values.subCounty}
                        variant="outlined"
                      >
                        {subCounties.map((subCounty) => (
                          <SuMenuItem
                            key={subCounty.value}
                            value={subCounty.value}
                          >
                            {subCounty.label}
                          </SuMenuItem>
                        ))}
                      </SuSelect>
                    </SuFormControl>
                  </SuGrid>
                  <SuGrid item xs={12} sm={12} md={12}>
                    <SuFormControl fullWidth className={classes.formControl}>
                      <SuInputLabel id="category-select-label">
                        Category
                      </SuInputLabel>
                      <SuSelect
                        labelId="category-select-label"
                        label="Category"
                        id="category"
                        name="category"
                        onChange={formik.handleChange}
                        value={formik.values.category}
                        variant="outlined"
                      >
                        {categories.map((category) => (
                          <SuMenuItem
                            key={category.value}
                            value={category.value}
                          >
                            {category.label}
                          </SuMenuItem>
                        ))}
                      </SuSelect>
                    </SuFormControl>
                  </SuGrid>
                  <SuGrid item xs={12} sm={12} md={6}>
                    <SuTextField
                      fullWidth
                      label="National ID"
                      id="nationalID"
                      name="nationalID"
                      onChange={formik.handleChange}
                      required
                      value={formik.values.nationalID}
                      variant="outlined"
                    />
                  </SuGrid>
                  <SuGrid item xs={12} sm={12} md={6}>
                    <SuTextField
                      fullWidth
                      label="Profession"
                      id="profession"
                      name="profession"
                      onChange={formik.handleChange}
                      required
                      value={formik.values.profession}
                      variant="outlined"
                    />
                  </SuGrid>
                  <SuGrid item xs={12} sm={12} md={6}>
                    <SuTextField
                      fullWidth
                      label="Latitude"
                      id="latitude"
                      name="latitude"
                      onChange={formik.handleChange}
                      required
                      value={formik.values.latitude}
                      variant="outlined"
                    />
                  </SuGrid>
                  <SuGrid item xs={12} sm={12} md={6}>
                    <SuTextField
                      fullWidth
                      label="Longitude"
                      id="longitude"
                      name="longitude"
                      onChange={formik.handleChange}
                      required
                      value={formik.values.longitude}
                      variant="outlined"
                    />
                  </SuGrid>
                  <SuGrid item xs={12} sm={12} md={12}>
                    <SuTextField
                      fullWidth
                      label="Location"
                      id="location"
                      name="location"
                      onChange={formik.handleChange}
                      required
                      value={formik.values.location}
                      variant="outlined"
                    />
                  </SuGrid>
                  <SuGrid item xs={12} sm={12} md={12}>
                    <label>
                      Choose profile picture
                      <input type="file" id="file" onChange={onChangeUpload} />
                    </label>
                  </SuGrid>
                </SuGrid>
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
          </SuGrid>
        </SuGrid>
      </form>
    </ThemeProvider>
  ) : null;
}

AddUser.layout = Admin;

export default AddUser;
