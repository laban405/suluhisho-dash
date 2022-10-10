import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../../firebase';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
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
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [textValue, setTextValue] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      dateCreated: new Date(),
      category: 'general',
    },
    onSubmit: (values) => {
      values.text = textValue;
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
      const { isAdmin } = JSON.parse(localStorage.getItem('user'));

      if (!user || !isAdmin) {
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
                <h4 className={styles.cardTitleWhite}>Create New A Resource</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText={`Title:`}
                      id="title"
                      name="title"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <ReactQuill value={textValue} onChange={setTextValue} />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary">
                  Create Resource
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

AlertEdit.layout = Admin;

export default AlertEdit;
