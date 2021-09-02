import React, {useState} from 'react'
import { useRouter } from 'next/router';
import Button from 'components/CustomButtons/Button.js';
import { MoreVert } from '@material-ui/icons';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { firestore } from '../../firebase';



export default function HandleManageUserData (props){
    const {alertsData, fetchAlerts} = props;
    const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const open = Boolean(anchorEl);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleView = (alert) => {
        const alertsData = JSON.stringify(alert);
        localStorage.setItem('alert', alertsData);
        router.push('view-alert');
        setAnchorEl(null);
    };
    
    const handleEdit = (alert) => {
        localStorage.setItem('alert', JSON.stringify(alert));
        router.push('manage-alert');
        setAnchorEl(null);
    };
    
    const handleDelete = (alertData) => {
        firestore
        .collection('sms')
        .doc(alertData.id)
        .delete()
        .then(() => {
            alert('alert deleted!');
            fetchAlerts()
        })
        .catch((error) => {
            console.log('error deleting alert....', error);
        });
        setAnchorEl(null);
    };
    
    
    
    
    return(
    <>
      <Button
        size="sm"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleView(alertsData)}>View</MenuItem>
        <MenuItem onClick={() => handleEdit(alertsData)}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDelete(alertsData)}>Delete</MenuItem>
      </Menu>
    </>
  )};
