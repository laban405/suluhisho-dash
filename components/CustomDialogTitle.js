import React from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { Typography, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  },
  title: {
    display: 'flex',
    alignItems: 'center'
  },
  closeButton: {
    marginLeft: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  header: {
    flexGrow: 1,
    marginLeft: 5
  }
});

const CustomDialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div className={classes.title}>
        <Typography variant="h5" className={classes.header}>
          {children}
        </Typography>
        {onClose ? (
          <IconButton
            size="small"
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </div>
    </MuiDialogTitle>
  );
});

export default CustomDialogTitle;