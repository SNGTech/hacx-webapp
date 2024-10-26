import React from "react";
import { Typography } from "@mui/material";
import { MaterialSymbol } from "react-material-symbols";

const Dashboard = () => {
  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <MaterialSymbol icon="monitor_heart" size={40} fill grade={-25} color={"var(--primary-colour)"}/>
        <Typography variant="h4">Operations Monitor Portal</Typography>
      </div>
      <Typography variant="h5" gutterBottom>
        Show summary data of alerts/alert counts, risky operations and current
        high-risk to AMS/Heat-stress officers or personnel
      </Typography>
      <Typography variant="h5" gutterBottom>
        Add/Edit Officer Details
      </Typography>
      <Typography variant="h5" gutterBottom>
        Modify Altered Mental State at-risk Thresholds as more data is collected
      </Typography>
    </div>
  );
};

export default Dashboard;
