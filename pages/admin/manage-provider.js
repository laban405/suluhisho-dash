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
  const [provider, setProvider] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const formik = useFormik({
    initialValues: {
      category: provider.category,
      phone: provider.phone,
      email: provider.email,
      location: provider.locationName,
      locationName: provider.name,
    },
    onSubmit: (values) => {
      let newValues = {
        name: values.category || provider.category,
        phone: values.phone || provider.phone,
        email: values.email || provider.email,
        location: values.locationName || provider.locationName,
        locationName: values.name || provider.name,
      };
      updateProvider(newValues);
    },
  });

  const updateProvider = async (newProviderValues) => {
    const provider = JSON.parse(localStorage.getItem('provider'));

    await firestore
      .collection('locations')
      .doc(provider.id)
      .update(newProviderValues);
    alert('provider updated!');
    router.push('service-providers');
  };

  useEffect(() => {
    setProvider(JSON.parse(localStorage.getItem('provider')));
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
                <h4 className={styles.cardTitleWhite}>Edit Provider</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`Category:`}
                      id="name"
                      onChange={formik.handleChange}
                      value={formik.values.category || provider.category}
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
                      value={formik.values.phone || provider.phone}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`Email:`}
                      id="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={`Location:`}
                      id="locationName"
                      onChange={formik.handleChange}
                      value={formik.values.locationName}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText={`Location Name:`}
                      id="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary">
                  Update Provider
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    router.push('service-providers');
                    localStorage.removeItem('provider');
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
