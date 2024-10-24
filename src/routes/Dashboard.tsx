import React from 'react'
import { Typography } from '@mui/material';

const Dashboard = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h5" gutterBottom>
        Show summary data of alerts/alert counts, risky operations and current high-risk to AMS/Heat-stress officers or personnel
      </Typography>
    </div>
  )
}

export default Dashboard;