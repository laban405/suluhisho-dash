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
    const {fetchFAQs, faq} = props;
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
    
    const handleEdit = (faq) => {
        localStorage.setItem('faq', JSON.stringify(faq));
        router.push('manage-resource');
        setAnchorEl(null);
    };
    
    const handleDelete = () => {
        firestore
        .collection('resources')
        .doc(faq.id)
        .delete()
        .then(() => {
            alert('user deleted!');
            fetchFAQs();
        })
        .catch((error) => {
          alert('error deleting user!');
            console.log('error deleting user....', error);
            fetchFAQs();
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
        <MenuItem onClick={() => handleEdit(faq)}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDelete(faq)}>Delete</MenuItem>
      </Menu>
    </>
  )};
