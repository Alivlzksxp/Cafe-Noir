import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';  
import { BarChart, PieChart } from '@mui/x-charts';
import { DataGrid } from '@mui/x-data-grid';
import { fetchUsers } from '../../services/UserService';
import '../../styles/DashboardPage.css';

const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  const loadUsers = async () => {
    try {
      setLoading(true);
      const { data } = await fetchUsers();
      const userList = data.users.map(u => ({
        ...u,
        name: `${u.firstName || ''} ${u.lastName || ''}`.trim(),
      }));
      setUsers(userList);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    const userType = localStorage.getItem('type');

    if (userType !== 'admin' && userType !== 'editor') {
      navigate('/login');  
      return;
    }

    loadUsers();
  }, [navigate]);

  const totalUsers = users.length;
  const averageAge =
    users.reduce((sum, user) => sum + (parseFloat(user.age) || 0), 0) / (totalUsers || 1);

  const genderData = users.reduce(
    (acc, user) => {
      const gender = user.gender?.toLowerCase();
      if (gender === 'male') acc.male++;
      else if (gender === 'female') acc.female++;
      else acc.other++;
      return acc;
    },
    { male: 0, female: 0, other: 0 }
  );

  const pieData = [
    { id: 0, value: genderData.male, label: 'Male' },
    { id: 1, value: genderData.female, label: 'Female' },
    { id: 2, value: genderData.other, label: 'Other' },
  ];

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'age', headerName: 'Age', flex: 1 },
    { field: 'gender', headerName: 'Gender', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'contactNumber', headerName: 'Contact', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'address', headerName: 'Address', flex: 1 },
  ];

  return (
    <Box className="dashboard-page">
      <Box className="dashboard-header">
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>Admin Dashboard</Typography>
      </Box>

      <Box className="dashboard-stats">
        <Box className="stat-card">
          <Typography variant="subtitle1">Total Users</Typography>
          <Typography variant="h5">{totalUsers}</Typography>
        </Box>
        <Box className="stat-card">
          <Typography variant="subtitle1">Average Age</Typography>
          <Typography variant="h5">{averageAge.toFixed(1)}</Typography>
        </Box>
      </Box>

      <Box className="dashboard-charts">
        <Paper className="chart-card">
          <PieChart
            series={[{ data: pieData }]}
            width={300}
            height={280}
          />
        </Paper>
      </Box>

      <Box className="dashboard-users">
        <Typography variant="h6" gutterBottom>
          User Details
        </Typography>
        <div className="users-table">
          <DataGrid
            rows={users.map((user, index) => ({ ...user, id: user._id || index }))}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            loading={loading}
          />
        </div>
      </Box>
    </Box>
  );
};

export default DashboardPage;
