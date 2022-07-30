import React from 'react';
import Admin from 'layouts/Admin.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import { CssBaseline } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { useAddProviderPage } from '../../../hooks/useAddProviderPage';
import SuGrid from '../../../components/Layout/SuGrid';
import AddUserForm from '../../../components/AddUserForm';
import Button from '../../../components/CustomButtons/Button';

const theme = createTheme({});

function AddProvider() {
  const { isUserLoggedIn, onExit, formik, onChangeUpload } =
    useAddProviderPage();

  return isUserLoggedIn ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SuGrid container spacing={2}>
        <SuGrid item xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="dark">
              <h4 className={styles.cardTitleWhite}>Add Service Provider</h4>
            </CardHeader>
            <CardBody>
              <AddUserForm formik={formik} onChangeUpload={onChangeUpload} />
            </CardBody>
            <CardFooter>
              <Button variant="outlined" onClick={onExit}>
                exit
              </Button>
            </CardFooter>
          </Card>
        </SuGrid>
      </SuGrid>
    </ThemeProvider>
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

AddProvider.layout = Admin;

export default AddProvider;
