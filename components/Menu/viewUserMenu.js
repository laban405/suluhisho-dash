import React, {useState} from 'react'
import { useRouter } from 'next/router';
import Button from 'components/CustomButtons/Button.js';
import { MoreVert } from '@material-ui/icons';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { firestore } from '../../firebase';



export default function HandleManageUserData (props){
    const {userData, fetchUsers} = props;
    const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const open = Boolean(anchorEl);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const handleView = (user) => {
        console.log('user...', user);
        const userData = JSON.stringify(user);
        localStorage.setItem('user', userData);
        router.push('view-user');
        setAnchorEl(null);
    };
    
    const handleEdit = (user) => {
        console.log('user..', user);
        localStorage.setItem('user', JSON.stringify(user));
        router.push('manage-user');
        setAnchorEl(null);
    };
    
    const handleDelete = (user) => {
        firestore
        .collection('users')
        .doc(user.id)
        .delete()
        .then(() => {
            console.log('User deleted successfully!');
            alert('user deleted!');
            fetchUsers();
        })
        .catch((error) => {
          alert('error deleting user!');
            console.log('error deleting user....', error);
            fetchUsers();
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
        <MenuItem onClick={() => handleView(userData)}>View</MenuItem>
        <MenuItem onClick={() => handleEdit(userData)}>
          Edit
        </MenuItem>
        <MenuItem onClick={() => handleDelete(userData)}>Delete</MenuItem>
      </Menu>
    </>
  )};
