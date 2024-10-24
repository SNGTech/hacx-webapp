import React from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";

const Calibration = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Calibration
      </Typography>

      {/* Gait Analysis Section */}
      <Stack sx={{ alignItems: "center" }}>
        <Stack spacing={5} direction="row">
          <Box sx={{ marginBottom: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Gait Analysis
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Variable
            </Typography>
            <Box
              sx={{
                border: "2px solid",
                borderRadius: "16px",
                padding: "16px",
                width: "200px",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              <Button variant="contained">Change Gait</Button>
            </Box>
          </Box>

          {/* Eye Section */}
          <Box sx={{ marginBottom: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Reaction Time
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Greater than:
            </Typography>
            <Box
              sx={{
                border: "2px solid",
                borderRadius: "16px",
                padding: "16px",
                width: "200px",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              <TextField
                label="Threshold (ms)"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
          </Box>
        </Stack>
        {/* Brain Temperature Section */}
        <Stack spacing={5} direction="row">
          <Box sx={{ marginBottom: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Brain Temperature
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Greater than:
            </Typography>
            <Box
              sx={{
                border: "2px solid",
                borderRadius: "16px",
                padding: "16px",
                width: "200px",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              <TextField
                label="Threshold (deg. Cel)"
                variant="outlined"
                size="small"
                fullWidth
              />
            </Box>
          </Box>

          {/* Cognitive Test Section */}
          <Box sx={{ marginBottom: "16px" }}>
            <Typography variant="h6" gutterBottom>
              Dilation Diameter
            </Typography>
            <Box
              sx={{
                border: "2px solid",
                borderRadius: "16px",
                padding: "16px",
                width: "200px",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              <TextField
                label="Min (mm)"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
              />
              <TextField
                label="Max (mm)"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
              />
            </Box>
          </Box>
        </Stack>
        <Stack spacing={5} direction="row" className="mt-5">
          <Button variant="contained" color="warning">
            Update Thresholds
          </Button>
          <Button variant="contained" color="error">
            Reset Thresholds
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default Calibration;
