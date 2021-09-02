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

function ManageFaq() {
  const router = useRouter();
  const [faq, setFAQ] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      text: '',
    },
    onSubmit: (values) => {
      let newValues = {
        title: values.title || faq.title,
        text: values.text || faq.text,
      };
      updateFAQ(newValues);
    },
  });

  // to fix updating with some null fields not working
  const updateFAQ = async (newFAQData) => {
    const faq = JSON.parse(localStorage.getItem('faq'));
    await firestore.collection('faqs').doc(faq.id).update(newFAQData);
    router.push('faqs');
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
                <h4 className={styles.cardTitleWhite}>Edit FAQ</h4>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText={`Title: ${faq.title}`}
                      onChange={formik.handleChange}
                      value={formik.values.title}
                      id="title"
                      // name="title"
                      style={{ color: 'black' }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextareaAutosize
                      maxRows={7}
                      minRows={4}
                      id={'text'}
                      onChange={formik.handleChange}
                      aria-label="maximum height"
                      placeholder={formik.values.text}
                      defaultValue={formik.values.text || faq.text}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button type="submit" color="primary">
                  Update FAQ
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

ManageFaq.layout = Admin;

export default ManageFaq;
