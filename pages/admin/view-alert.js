import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../firebase';
import Admin from 'layouts/Admin.js';
import { ReactVideo } from 'reactjs-media';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import CardFooter from 'components/Card/CardFooter.js';
import MapModal from 'components/Map/incidentMap';
import moment from 'moment';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '150px',
    width: '50vw',
    margin: 'auto',
    maxWidth: 1000,
  },
  content: {
    flex: '1 0 auto',
  },
  playVidBtn: {
    float: 'right',
    marginBottom: '50px',
  },
  cover: {
    float: 'right',
    width: 151,
    color: 'red',
  },
}));
function AlertView() {
  const classes = useStyles();
  const router = useRouter();
  const [alert, setAlert] = useState('');
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [hasMedia, setHasMedia] = useState(false);

  const exitView = () => {
    localStorage.removeItem('alert');
    router.push('alerts');
  };

  const [open, setOpen] = useState(false);
  const [openMap, setOpenMap] = useState(false);

  const handleOpenMap = () => {
    setOpenMap(true);
  };

  const handleCloseMap = () => {
    setOpenMap(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // video modal
  const videoModal = (
    <Card className={classes.root}>
      <CardHeader title="Incident Video" subheader="September 14, 2021" />
      <div>
        <ReactVideo src={alert.media} primaryColor="red" />
      </div>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This is the video that was captured on this incident.
        </Typography>
      </CardContent>
    </Card>
  );

  const checkIfUserLoggedIn = (user) => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push('../login');
      } else {
        setIsUserLoggedIn(true);
        const currentAlert = JSON.parse(localStorage.getItem('alert'));
        setAlert(currentAlert);
        if (currentAlert.media.length > 0) {
          setHasMedia(true);
        }
      }
    });
  };

  useEffect(() => {
    checkIfUserLoggedIn();
  }, []);

  return isUserLoggedIn ? (
    <div>
      {console.log(alert)}
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="dark">
              <Button
                color="primary"
                onClick={handleOpenMap}
                style={{ float: 'right' }}
              >
                Show on map
              </Button>
              {hasMedia ? (
                <Button
                  className={classes.playVidBtn}
                  color="primary"
                  onClick={handleOpen}
                >
                  Open video
                </Button>
              ) : null}
              <h4 className={styles.cardTitleWhite}>View Incident</h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText={`Date:`}
                    value={
                      alert.date
                        ? moment(alert.date.seconds).format('LLL')
                        : 'Invalid date!'
                    }
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    style={{ color: 'black' }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText={`Location:`}
                    value={alert.location}
                    id="location"
                    name="location"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    style={{ color: 'black' }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText={`Sender: ${alert.senderName}`}
                    value={alert.senderName}
                    id="status"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    style={{ color: 'black' }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText={`Sender Number:`}
                    value={alert.senderNumber}
                    id="senderNumber"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    style={{ color: 'black' }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText={`Status:`}
                    value={alert.status}
                    id="status"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    style={{ color: 'black' }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText={`Message:`}
                    value={`${
                      alert.message
                        ? alert.message.substr(0, 50) + '...'
                        : 'No message!'
                    }`}
                    id="severity"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    style={{ color: 'black' }}
                    inputProps={{
                      disabled: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                {videoModal}
              </Modal>
              <Modal
                open={openMap}
                onClose={handleCloseMap}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
              >
                <MapModal alert={alert} />
              </Modal>
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={exitView}>
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
