import React, {useState, useEffect} from "react";
import classNames from "classnames";
import firebase from 'firebase/app';
import {useRouter} from 'next/router';
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from '@mui/material/Tooltip';
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import RateReview from '@material-ui/icons/RateReview'
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Button from "components/CustomButtons/Button.js";
import useWindowSize from "components/Hooks/useWindowSize.js";
import Alert from '@material-ui/lab/Alert';
import AddAlert from '@material-ui/icons/AddAlert'
import { firestore } from "../../firebase";

import styles from "assets/jss/nextjs-material-dashboard/components/headerLinksStyle.js";
// import Menu from "react-select/src/components/Menu";

export default function AdminNavbarLinks() {
  const size = useWindowSize();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [openNotification, setOpenNotification] = useState(null);
  const [openProfile, setOpenProfile] = useState(null);
  const router = useRouter();
  const [signedOut, setSignedOut] = useState(false)
  const [signedOutError, setSignedOutError] = useState(false);
  const [lastVisibleData, setLastVisibleData] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [showTooltip, setShowTooltip] = useState(true)

  
  const handleClickNotification = (event) => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };

  const handleSendPushNotification = (event) => {
    router.push('./send-push-notificaton')
  }
  
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  
  const handleSignoutUser = async () => {
    await firebase.auth().signOut().then(function() {
      setSignedOut(true);
      setOpenProfile(null);
      router.push('/login');
    }).catch(function(error) {
      setSignedOutError(true)
      console.log('error on signout..!', error);
    });
  }

  const fetchAlerts = async () => {
    const alertsArr = [];
    firestore
      .collection('sms')
      .orderBy('date')
      .limit(5)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((alert) => {
          let currentAlertData = alert.data();
          currentAlertData.id = alert.id;
          alertsArr.push(currentAlertData);
          setLastVisibleData(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      })
      .then(() => {
        setAlerts(alertsArr);
      });
  };

  const MenuItems = () => (
    <div>
    {alerts.length > 0 && alerts.map(alert => (
       <MenuItem
       onClick={handleCloseNotification}
       className={classes.dropdownItem}
     >
       {`${alert.message.substring(0, 15)}...`}
     </MenuItem>
    ))}
    </div>
  );

  useEffect(() => {
    fetchAlerts();
  }, []);
  
  return (
    <div>
    <Tooltip title="Send Push Notification">
      <div className={classes.manager}>
          <Button
            color={size.width > 959 ? "transparent" : "white"}
            justIcon={size.width > 959}
            simple={!(size.width > 959)}
            aria-owns={openProfile ? "profile-menu-list-grow" : null}
            aria-haspopup="true"
            onClick={handleSendPushNotification}
            className={classes.buttonLink}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <RateReview className={classes.icons} />
          </Button>
        </div>
        </Tooltip>
      
      <div className={classes.manager}>
        <Button
          color={size.width > 959 ? "transparent" : "white"}
          justIcon={size.width > 959}
          simple={!(size.width > 959)}
          aria-owns={openNotification ? "notification-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          <span className={classes.notifications}>5</span>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              Notification
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openNotification }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    <MenuItems/>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      <div className={classes.manager}>
        <Button
          color={size.width > 959 ? "transparent" : "white"}
          justIcon={size.width > 959}
          simple={!(size.width > 959)}
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({ [classes.popperClose]: !openProfile }) +
            " " +
            classes.popperNav
          }
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <Divider light />
                    <MenuItem
                      onClick={handleSignoutUser}
                      className={classes.dropdownItem}
                    >
                   {!signedOut ?  'Logout' :  (<Alert severity="success">Success Sign Out!</Alert>) }
                   {signedOutError ? <Alert severity="error">Failed Sign Out!</Alert> : null}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
