import { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { setDefaultThreshold, updateThresholdParameter, getThresholdParameters } from "../scripts/cosmo_db";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Calibration = () => {
  const [reactionTime, setReactionTime] = useState<number>(290);
  const [brainTemp, setBrainTemp] = useState<number>(38.2);
  const [minDilation, setMinDilation] = useState<number>(2.5);
  const [maxDilation, setMaxDilation] = useState<number>(5.0);

  // Function to fetch threshold parameters
  const fetchThresholdParameters = async () => {
    try {
      const parameters = await getThresholdParameters();
      setReactionTime(parameters.ReactionTime); // Set default if undefined
      setBrainTemp(parameters.BrainTemp);
      setMinDilation(parameters.MinDilation);
      setMaxDilation(parameters.MaxDilation);
    } catch (error) {
      console.error("Error fetching threshold parameters:", error);
    }
  };

  // Fetch parameters on component mount
  useEffect(() => {
    fetchThresholdParameters();
  }, []);

  // Function to handle updating specific parameters
  const handleUpdateThresholds = async () => {
    console.log("Updating thresholds:", {
      ReactionTime: reactionTime,
      BrainTemp: brainTemp,
      MinDilation: minDilation,
      MaxDilation: maxDilation,
    });

    try {
      await updateThresholdParameter({
        ReactionTime: reactionTime,
        BrainTemp: brainTemp,
        MinDilation: minDilation,
        MaxDilation: maxDilation,
      });
      toast.success("Thresholds updated successfully!", {
        position: "top-left", // Position of the toast
      }); // Show success notification
    } catch (error) {
      console.error("Error updating thresholds:", error);
      toast.error("Failed to update thresholds.", {
        position: "top-left", // Position of the toast
      }); // Show error notification
    }
  };

  // Function to reset thresholds to default values
  const handleResetThresholds = async () => {
    await setDefaultThreshold(); // Reset with default values
    fetchThresholdParameters(); // Fetch updated values
    toast.success("Thresholds reset to default values!", {
      position: "top-left", // Position of the toast
    }); // Show success notification
  };

  return (
    <div>
      <ToastContainer /> {/* Add ToastContainer to your component */}
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

          {/* Reaction Time Section */}
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
                type="number"
                size="small"
                fullWidth
                value={reactionTime}
                onChange={(e) => setReactionTime(parseFloat(e.target.value))} // Ensure a valid number
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
                label="Threshold (°C)"
                variant="outlined"
                type="number"
                size="small"
                fullWidth
                value={brainTemp}
                onChange={(e) => setBrainTemp(parseFloat(e.target.value))} // Ensure a valid number
              />
            </Box>
          </Box>

          {/* Dilation Section */}
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
                type="number"
                size="small"
                margin="normal"
                fullWidth
                value={minDilation}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*\.?\d*$/.test(value)) {
                    setMinDilation(value === '' ? 0 : parseFloat(value));
                  }
                }}
              />
              <TextField
                label="Max (mm)"
                type="number"
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
                value={maxDilation}
                onChange={(e) => setMaxDilation(parseFloat(e.target.value))} // Ensure a valid number
              />
            </Box>
          </Box>
        </Stack>
        
        {/* Update and Reset Buttons */}
        <Stack spacing={5} direction="row" className="mt-5">
          <Button variant="contained" color="warning" onClick={handleUpdateThresholds}>
            Update Thresholds
          </Button>
          <Button variant="contained" color="error" onClick={handleResetThresholds}>
            Reset Thresholds
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default Calibration;
