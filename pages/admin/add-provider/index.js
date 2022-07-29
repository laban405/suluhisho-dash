import React from 'react';
import Admin from 'layouts/Admin.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import { CssBaseline } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { useAddProviderPage } from './useAddProviderPage';
import SuGrid from '../../../components/Layout/SuGrid';
import AddUserForm from '../../../components/AddUserForm';
import Button from '../../../components/CustomButtons/Button';

const theme = createTheme({});

function AddUser() {
  const { isUserLoggedIn, onExit, formik, onChangeUpload } =
    useAddProviderPage();

  return isUserLoggedIn ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SuGrid container spacing={2}>
        <SuGrid item xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className="cardTitleWhite">Add Service Provider</h4>
            </CardHeader>
            <CardBody>
              <AddUserForm
                formik={formik}
                onChangeUpload={onChangeUpload}
                onExit={onExit}
              />
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

AddUser.layout = Admin;

export default AddUser;
