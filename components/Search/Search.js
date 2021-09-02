import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import useWindowSize from "components/Hooks/useWindowSize.js";

import styles from "assets/jss/nextjs-material-dashboard/components/headerLinksStyle.js";


export default function SearchComponent(props) {
    const size = useWindowSize()
    const useStyles = makeStyles(styles);
    const classes = useStyles()

    const {handleSearch, placeholder} = props;
    
    return (
        <div>
        <div className={classes.searchWrapper}>
        <Button color="white" aria-label="edit" justIcon round>
            <Search />
          </Button>
          <CustomInput
            formControlProps={{
              className: classes.margin + " " + classes.search,
            }}
            inputProps={{
              placeholder: placeholder || "Search...",
              inputProps: {
                "aria-label": "Search",
              },
            }}
            onChange={handleSearch}
          />
        </div>
      </div>
  
  
    )
}