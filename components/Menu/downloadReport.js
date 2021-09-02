import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import GetApp from '@material-ui/icons/GetApp'
import MenuItem from '@material-ui/core/MenuItem';
import { CSVLink } from 'react-csv';


export default function SimpleMenu(props) {
  const { handleDownload, alertsData } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} variant="contained" style={{color:"#F1582C"}}>
      Reports <GetApp/> 
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {handleDownload(); handleClose()}}><GetApp/> PDF</MenuItem>
        <MenuItem onClick={handleClose}><CSVLink data={alertsData}> <GetApp/> CSV</CSVLink></MenuItem>
      </Menu>
    </div>
  );
}
