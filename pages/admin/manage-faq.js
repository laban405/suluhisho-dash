import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../../firebase';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import 'react-quill/dist/quill.snow.css';
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

function ManageFaq() {
  const router = useRouter();
  const [faq, setFAQ] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [textValue, setTextValue] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      text: '',
    },
    onSubmit: (values) => {
      let newValues = {
        title: values.title || faq.title,
        text: textValue,
      };
      updateFAQ(newValues);
    },
  });

  const updateFAQ = async (newFAQData) => {
    const faq = JSON.parse(localStorage.getItem('faq'));
    await firestore.collection('faqs').doc(faq.id).update(newFAQData);
    router.push('faqs');
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
    setFAQ(JSON.parse(localStorage.getItem('faq')));
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
                      style={{ color: 'black' }}
                      formControlProps={{
                        fullWidth: true,
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={12}>
                    <ReactQuill
                      value={textValue}
                      onChange={setTextValue}
                      placeholder={'Enter some text..'}
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
