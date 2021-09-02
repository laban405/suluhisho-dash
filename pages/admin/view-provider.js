import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../firebase';
import Admin from 'layouts/Admin.js';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

function AlertView() {
  const router = useRouter();
  const [provider, setProvider] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    setProvider(JSON.parse(localStorage.getItem('provider')));
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('../login');
      } else {
        setIsUserLoggedIn(true);
      }
    });
  }, []);

  return isUserLoggedIn ? (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="dark">
              <h4 className={styles.cardTitleWhite}>View User</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText={`Category:`}
                    style={{ color: 'black' }}
                    value={provider.category}
                    inputProps={{
                      disabled: true,
                    }}
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText={`Phone:`}
                    style={{ color: 'black' }}
                    value={provider.phone}
                    inputProps={{
                      disabled: true,
                    }}
                    id="phone"
                    name="phone"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText={` Location:`}
                    style={{ color: 'black' }}
                    value={provider.locationName}
                    inputProps={{
                      disabled: true,
                    }}
                    id="nationalID"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText={`Email:`}
                    style={{ color: 'black' }}
                    value={provider.email}
                    inputProps={{
                      disabled: true,
                    }}
                    id="county"
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CustomInput
                  labelText={`Location Name:`}
                  style={{ color: 'black' }}
                  value={provider.name}
                  inputProps={{
                    disabled: true,
                  }}
                  id="subCounty"
                  formControlProps={{
                    fullWidth: true,
                  }}
                />
              </GridItem>
            </CardBody>
            <CardFooter>
              <Button
                color="primary"
                onClick={() => router.push('service-providers')}
              >
                exit
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
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
  customInputs: {
    backgroundColor: '#000 ',
  },
};

AlertView.layout = Admin;

export default AlertView;
