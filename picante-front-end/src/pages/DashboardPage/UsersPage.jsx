import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Stack,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Switch,
  Grid
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import WcIcon from '@mui/icons-material/Wc';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import BadgeIcon from '@mui/icons-material/Badge';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers, createUser, updateUser } from '../../services/UserService';
import { useNavigate } from 'react-router-dom';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 800,
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  boxShadow: 10,
  p: 4,
  borderRadius: 3
};

const UsersPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem('type');
    if (userType !== 'admin') {
      navigate('/dashboard');
    }
  }, [navigate]);

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
    address: '',
    type: 'viewer',
    isActive: true
  });

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchUsers();
      const withDisplayName = data.users.map(u => ({
        ...u,
        name: `${u.firstName || ''} ${u.lastName || ''}`.trim()
      }));
      setUsers(withDisplayName);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOpen = () => {
    setIsEditing(false);
    setNewUser({
      firstName: '',
      lastName: '',
      age: '',
      gender: '',
      contactNumber: '',
      email: '',
      username: '',
      password: '',
      address: '',
      type: 'viewer',
      isActive: true
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditUserId(null);
  };

  const handleEdit = (id) => {
    const userToEdit = users.find(u => u._id === id);
    if (userToEdit) {
      setNewUser({ ...userToEdit, password: '' });
      setEditUserId(id);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleSaveUser = async () => {
    try {
      if (isEditing) {
        const updatedUser = { ...newUser };
        if (!updatedUser.password) delete updatedUser.password;
        await updateUser(editUserId, updatedUser);
      } else {
        await createUser(newUser);
      }
      loadUsers();
      handleClose();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await updateUser(id, { isActive: !isActive });
      loadUsers();
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const iconField = (icon, component) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {React.cloneElement(icon, { sx: { color: '#9e9e9e' } })}
      {component}
    </Box>
  );

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'age', headerName: 'Age', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'contactNumber', headerName: 'Contact', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: params => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => handleEdit(params.row._id)}
            sx={{
              backgroundColor: '#6d4c41',
              color: 'white',
              '&:hover': { backgroundColor: '#5d3e33' },
            }}
          >
            Edit
          </Button>
          <Switch
            checked={params.row.isActive}
            onChange={() => handleToggleActive(params.row._id, params.row.isActive)}
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#8d6e63', 
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                backgroundColor: '#bcaaa4',
              },
              '& .MuiSwitch-track': {
                backgroundColor: '#d7ccc8',
              }
            }}
          />
        </Box>
      )
    }
  ];

  return (
    <>
      <Stack direction="row" sx={{ mb: 5, justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h3" fontWeight="bold">Users</Typography>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={handleOpen}
          sx={{
            position: 'fixed',
            right: 20,
            top: 100,
            zIndex: 1000,
            backgroundColor: '#6d4c41',
            color: 'white',
            '&:hover': { backgroundColor: '#5d3e33' },
          }}
        >
          Add User
        </Button>
      </Stack>

      <Modal keepMounted open={open} onClose={handleClose} aria-labelledby="add-user-modal">
        <Box sx={modalStyle}>
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: '#6d4c41' }}>
            {isEditing ? 'Edit User' : 'Add User'}
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                {iconField(<AccountCircleIcon />, (
                  <TextField label="First Name" fullWidth value={newUser.firstName}
                    onChange={e => setNewUser({ ...newUser, firstName: e.target.value })} />
                ))}
              </Grid>
              <Grid item xs={12} sm={4}>
                {iconField(<AccountCircleIcon />, (
                  <TextField label="Last Name" fullWidth value={newUser.lastName}
                    onChange={e => setNewUser({ ...newUser, lastName: e.target.value })} />
                ))}
              </Grid>
              <Grid item xs={12} sm={4}>
                {iconField(<CalendarTodayIcon />, (
                  <TextField label="Age" fullWidth value={newUser.age}
                    onChange={e => setNewUser({ ...newUser, age: e.target.value })} />
                ))}
              </Grid>
              <Grid item xs={12} sm={4}>
                {iconField(<WcIcon />, (
                  <FormControl fullWidth>
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      label="Gender"
                      value={newUser.gender}
                      onChange={e => setNewUser({ ...newUser, gender: e.target.value })}>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                ))}
              </Grid>
              <Grid item xs={12} sm={4}>
                {iconField(<PhoneIcon />, (
                  <TextField label="Mobile" fullWidth value={newUser.contactNumber}
                    onChange={e => setNewUser({ ...newUser, contactNumber: e.target.value })} />
                ))}
              </Grid>
              <Grid item xs={12} sm={4}>
                {iconField(<HomeIcon />, (
                  <TextField label="Address" fullWidth value={newUser.address}
                    onChange={e => setNewUser({ ...newUser, address: e.target.value })} />
                ))}
              </Grid>
              <Grid item xs={12} sm={4}>
                {iconField(<EmailIcon />, (
                  <TextField label="Email" fullWidth value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
                ))}
              </Grid>
              <Grid item xs={12} sm={4}>
                {iconField(<PersonIcon />, (
                  <TextField label="Username" fullWidth value={newUser.username}
                    onChange={e => setNewUser({ ...newUser, username: e.target.value })} />
                ))}
              </Grid>
              <Grid item xs={12} sm={4}>
                {iconField(<LockIcon />, (
                  <TextField label="Password" type="password" fullWidth value={newUser.password}
                    onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
                ))}
              </Grid>
              <Grid item xs={12}>
                {iconField(<BadgeIcon />, (
                  <FormControl sx={{ width: 224 }}>
                    <InputLabel id="user-type-label">User Type</InputLabel>
                    <Select
                      labelId="user-type-label"
                      value={newUser.type}
                      label="User Type"
                      onChange={(e) => setNewUser({ ...newUser, type: e.target.value })}
                    >
                      <MenuItem value="admin">Admin</MenuItem>
                      <MenuItem value="editor">Editor</MenuItem>
                      <MenuItem value="viewer">Viewer</MenuItem>
                    </Select>
                  </FormControl>
                ))}
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
              <Button
                variant="outlined"
                onClick={handleClose}
                sx={{
                  color: '#6d4c41',
                  borderColor: '#6d4c41',
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: '#f1e6e1',
                    borderColor: '#5d3e33',
                  },
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSaveUser}
                sx={{
                  backgroundColor: '#6d4c41',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#5d3e33',
                  },
                }}
              >
                {isEditing ? 'Save Changes' : 'Add User'}
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>

      <Box sx={{ height: 500, width: '100%', mb: 5 }}>
        <DataGrid
          rows={users}
          columns={columns}
          getRowId={(row) => row._id}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          disableSelectionOnClick
        />
      </Box>
    </>
  );
};

export default UsersPage;
