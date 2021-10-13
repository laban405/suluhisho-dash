import React, {useState} from 'react'
import { useRouter } from 'next/router';
import Button from 'components/CustomButtons/Button.js';
import { MoreVert } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { firestore } from '../../firebase';

const useStyles = makeStyles({
  btn: {
    float: 'right'
  }
})

export default function HandleManageFAQData (props){
    const {fetchResources, resource} = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleEdit = (resource) => {
        localStorage.setItem('resource', JSON.stringify(resource));
        console.log('resource: ', resource);
        router.push('manage-resource');
        setAnchorEl(null);
    };
    
    const handleDelete = (resource) => {
        firestore
        .collection('resources')
        .doc(resource.id)
        .delete()
        .then(() => {
            alert('Resource deleted!');
            fetchResources();
        })
        .catch((error) => {
          alert('error deleting Resource!');
            console.log('error deleting Resource....', error);
            fetchResources();
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
        className={classes.btn}
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
        <MenuItem onClick={() => handleEdit(resource)}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDelete(resource)}>Delete</MenuItem>
      </Menu>
    </>
  )};
