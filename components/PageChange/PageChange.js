import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

// core components
import { primaryColor, whiteColor, title } from "assets/jss/nextjs-material-dashboard.js";
// import { primaryColor, whiteColor } from "../../assets/jss/nextjs-material-dashboard";

const styles = {
  progress: {
    color: primaryColor[0],
    width: "6rem !important",
    height: "6rem !important",
  },
  wrapperDiv: {
    // backgroundColor:whiteColor,
    // margin: "100px auto",
    padding: "0px",
    maxWidth: "360px",
    textAlign: "center",
    position: "relative",
    zIndex: "9999",
    top: "0",
  },
  iconWrapper: {
    display: "block",
  },
  title: {
    ...title,
    color: primaryColor[0],
  },
};

export default function PageChange(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <div>
      <div className={classes.wrapperDiv}>
        <div className={classes.iconWrapper}>
          <CircularProgress className={classes.progress} />
        </div>
        <h4 className={classes.title}>
          Loading...
        </h4>
      </div>
    </div>
  );
}
