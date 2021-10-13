import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../../firebase';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Admin from 'layouts/Admin.js';
import { TextareaAutosize } from '@material-ui/core';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';

function AlertEdit() {
  const [resource, setResource] = useState('');
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      text: '',
    },
    onSubmit: (values) => {
      let newValues = {
        title: values.title || resource.title,
        text: values.text || resource.text,
      };
      updateResource(newValues);
    },
  });

  // to fix updating with some null fields not working
  const updateResource = async (newResourceData) => {
    const resource = JSON.parse(localStorage.getItem('resource'));
    console.log('resource id: ' + resource.id);
    await firestore
      .collection('resources')
      .doc(resource.id)
      .update(newResourceData);
    router.push('resource-center');
    console.log(newResourceData);
  };

  const checkIfUserLoggedIn = () => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push('../login');
      } else {
        setIsUserLoggedIn(true);
      }
    });
  };

  useEffect(() => {
    checkIfUserLoggedIn();
    setResource(JSON.parse(localStorage.getItem('resource')));
  }, []);

  return isUserLoggedIn ? (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <Card>
              <CardHeader color="dark">
                <h4 className={styles.cardTitleWhite}>Edit Resource</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText={`Title: ${resource.title}`}
                      onChange={formik.handleChange}
                      id="title"
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextareaAutosize
                      maxRows={7}
                      minRows={4}
                      onChange={formik.handleChange}
                      id={'text'}
                      aria-label="maximum height"
                      placeholder={formik.values.text}
                      defaultValue={formik.values.text || resource.text}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary">
                  Update Resource
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    router.push('resource-center');
                    localStorage.removeItem('resource');
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
