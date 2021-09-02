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
  const [faq, setFAQ] = useState('');
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: faq.title,
      text: faq.text,
    },
    onSubmit: (values) => {
      let newValues = {
        title: values.title || faq.title,
        text: values.faq || faq.text,
      };
      updateFAQ(newValues);
    },
  });

  // to fix updating with some null fields not working
  const updateFAQ = async (newFAQData) => {
    const faq = JSON.parse(localStorage.getItem('faq'));
    await firestore.collection('resources').doc(faq.id).update(newFAQData);
    router.push('resource-center');
  };

  useEffect(() => {
    setFAQ(JSON.parse(localStorage.getItem('faq')));
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
                <h4 className={styles.cardTitleWhite}>Edit Resource</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText={`Title:`}
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
                      aria-label="maximum height"
                      placeholder={formik.values.text}
                      defaultValue={formik.values.text}
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
