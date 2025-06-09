import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { LineChart, PieChart } from '@mui/x-charts';
import '../../styles/DashboardPage.css';

const lineData = {
  xAxis: [{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], scaleType: 'band' }],
  series: [
    {
      data: [20, 45, 80, 60, 90, 120],
      label: 'Reports Submitted',
    },
  ],
};

const pieData = {
  series: [{
    data: [
      { id: 0, value: 55, label: 'Verified Reports' },
      { id: 1, value: 45, label: 'Unverified Reports' },
    ],
  }],
};

const ReportsPage = () => (
  <Box
    sx={{
      p: 4,
      display: 'flex',
      justifyContent: 'center',
      minHeight: '100vh',
    }}
  >
    <Box sx={{ width: '100%'}}>
      <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
        Reports & Visualizations
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sx={{ width: '55%' }}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#444', fontWeight: 'bold' }}>
                Monthly Reports Submitted
              </Typography>
              <Box sx={{ width: '100%', height: 300 }}>
                <LineChart
                  xAxis={lineData.xAxis}
                  series={lineData.series}
                  height={300}
                  sx={{ width: '100%' }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: '#444', fontWeight: 'bold' }}>
                Report Verification Status
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <PieChart
                  series={pieData.series}
                  width={300}
                  height={300}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  </Box>
);

export default ReportsPage;
