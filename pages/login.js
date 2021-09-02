import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useRouter } from 'next/router';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth } from '../firebase';
import firebase from '../firebase';
import { uiConfig } from '../config/firebaseAuthUI.config';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Suluhisho
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  if (loading) return <CircularProgress color="primary" />;
  else if (error) return <Alert severity="error">Error signing in!</Alert>;
  else if (user) {
    router.push('/');
  }
  const authConfig = uiConfig(firebase);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in to Suluhisho
        </Typography>
        <form className={classes.form} noValidate>
          <StyledFirebaseAuth
            uiConfig={authConfig}
            firebaseAuth={auth}
            className={classes.styledAuth}
          />
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
