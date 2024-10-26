import {
  CardContent,
  Grid2,
  Stack,
  Typography,
  Box,
  Card,
  Button,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import "../css/OperationOverview.css";
import { useEffect, useState } from "react";
import startEventReader from "../scripts/event_hub_reader";
import TemperatureChart from "../components/TemperatureChart";
import ZGaitChart from "../components/ZGaitChart";
import { MaterialSymbol } from "react-material-symbols";
import TempEyeImage from "../imgs/eye.png";
import HashLoader from "react-spinners/HashLoader";
import { getThresholdParameters } from "../scripts/cosmo_db";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));


const OperationOverview = () => {
  const location = useLocation();
  console.log(location);
  const { operation } = location.state;

  const [reactionTimeModBtnDisabled, setReactionTimeModBtnDisabled] = useState(false);

  const [telemetryData, setTelemetryData] = useState({});
  const [temperatureData, setTemperatureData] = useState([{}]);
  const [gaitData, setGaitData] = useState([{}]); 

  //Under comparison with threshold
  const [isBrainTempHigh, setIsBrainTempHigh] = useState<boolean>(false); 
  const [isReactionTimeSlow, setIsReactionTimeSlow] = useState<boolean>(false);
  const [isDilationOutOfRange, setDilationOutOfRange] = useState<boolean>(false);

  const [brainTempThresh, setBrainTempThresh] = useState<number>(0);
  const [reactionTimeThresh, setReactionTimeThresh] = useState<number>(0);
  const [dilationThresh, setDilationThresh] = useState<number>(0);

  // Function to fetch threshold parameters
  const fetchThresholdParameters = async () => {
    try {
      const parameters = await getThresholdParameters(); 
      setBrainTempThresh(parameters.BrainTemp);
      setReactionTimeThresh(parameters.ReactionTime);
      setDilationThresh(parameters.MaxDilation - parameters.MinDilation)
    } catch (error) {
      console.error("Error fetching threshold parameters:", error);
    }
  };

  useEffect(() => {
    fetchThresholdParameters(); // Call to fetch threshold when component mounts
  }, []);

  useEffect(() => {
    startEventReader((data: any) => {
      const payload = {
        head_temperature: data.body["head_temperature"],
        z_gait_left: data.body["z_gait_left"],
        z_gait_right: data.body["z_gait_right"],
        dilation_diameter: data.body["dilation_diameter"],
        last_reaction_time_ms: data.body["last_reaction_time_ms"],
        last_reaction_timestamp: data.body["last_reaction_timestamp"],
        timestamp: data.enqueuedTimeUtc.toLocaleTimeString("it-IT"),
      };
      setTemperatureData((telemetry) => {
        var newTelemetry = telemetry;
        if (telemetry.length >= 50) {
          newTelemetry = newTelemetry.filter((_, i) => i !== 0);
        }
        newTelemetry = [...newTelemetry, payload];
        return newTelemetry;
      });
      setGaitData((telemetry) => {
        var newTelemetry = telemetry;
        if (telemetry.length >= 200) {
          newTelemetry = newTelemetry.filter((_, i) => i !== 0);
        }
        newTelemetry = [...newTelemetry, payload];
        return newTelemetry;
      });
      setTelemetryData(payload);

      
      // Check if head temperature exceeds threshold
      const isTempHigh = payload.head_temperature > brainTempThresh;
      setIsBrainTempHigh(isTempHigh); // Update the state with the result

      //Check if Reaction Time exceeds threshold
      const isLongReactionTime = payload.last_reaction_time_ms > reactionTimeThresh;
      setIsReactionTimeSlow(isLongReactionTime);

      //Check if Dilation exceeds threshold
      const isDilationOutOfRange = (payload.dilation_diameter) > dilationThresh ;
      setDilationOutOfRange(isDilationOutOfRange);
    });
  }, [brainTempThresh, reactionTimeThresh, dilationThresh]);

  

  // useEffect(() => {}, [isAuthenticated, accessToken]);
  // if (accessToken !== "") {
  //   return (<><Typography variant="h3">Loading Dashboard...</Typography></>);
  // }

  const triggerReactionTimeMod = async () => {
    fetch(
      "https://reaction-time-mod-trigger.azurewebsites.net/api/reaction-time/deviceset0/1",
      {
        method: "POST",
        mode: "no-cors",
      }
    )
      .then(() => {
        console.log("Triggered Reaction Time");
        setReactionTimeModBtnDisabled(true);
        setTimeout(() => {
          setReactionTimeModBtnDisabled(false);
        }, 5500);
      })
      .catch((err) => {
        console.log("Failed to trigger Reaction Time. Error:", err);
      });
  };
  if (Object.keys(telemetryData).length === 0) {
    return (
      <div className="flex flex-col flex-grow">
        <div className="flex flex-col items-center justify-center mt-72">
          <HashLoader
            color="#eb815b"
            loading={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <div className="mb-14"></div>
          <Typography variant="h4" fontWeight={500}>
            Waiting for Device Sets to Connect...
          </Typography>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col flex-grow">
        <div>
          <Stack
            direction="row"
            spacing={5}
            sx={{
              alignItems: "center",
            }}
            className="mb-4"
          >
            <Typography variant="h4" gutterBottom>
              {operation.title}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              Overview
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              TRIGGER
            </Typography>
            <Button
              variant="contained"
              onClick={triggerReactionTimeMod}
              disabled={reactionTimeModBtnDisabled}
            >
              Start Reaction Time Test (ALL)
            </Button>
            <Button
              variant="contained"
              onClick={triggerReactionTimeMod}
              disabled={reactionTimeModBtnDisabled}
            >
              Start Reaction Time Test (Alice Hua)
            </Button>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Item>{operation.department}</Item>
            <Item>{operation.opcode}</Item>
          </Stack>
        </div>
        <div className="flex-grow mt-6" style={{ height: "75vh" }}>
          <Grid2 container spacing={10} style={{ height: "75vh" }}>
            <Grid2 size={3}>
              <Stack spacing={3}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{ color: "text.secondary", fontSize: 14 }}
                    >
                      Department
                    </Typography>
                    <Typography variant="h5">Alice Hua</Typography>
                  </CardContent>
                </Card>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      sx={{ color: "text.secondary", fontSize: 14 }}
                    >
                      Department
                    </Typography>
                    <Typography variant="h5">Noah Lim</Typography>
                  </CardContent>
                </Card>
              </Stack>
            </Grid2>
            <Grid2 container size="grow" spacing={1}>
              <Grid2 size="grow">
                <Stack className="h-full">
                  <Typography variant="h5" fontWeight={500}>
                    Inspecting: Alice Hua
                  </Typography>
                  <div className="flex items-center gap-4 text-red-500 mt-4">
                    <MaterialSymbol
                      icon="mode_heat"
                      size={40}
                      fill
                      grade={-25}
                    />
                    <p className="sensor-data">
                      {parseFloat(telemetryData.head_temperature).toFixed(2)}{" "}
                      deg. Cel.
                    </p>
                  </div>
                  {isBrainTempHigh ? (
                      <div className="alerts-container warn mb-6">
                        <p>
                          Warning: Brain temperature is above normal! Please rest in a cool environment.
                        </p>
                      </div>
                    ) : (
                      <div className="alerts-container no-warning mb-6">
                        <p>Normal: Brain Temperature within normal range.</p> {/* This line remains unchanged */}
                      </div>
                  )}
                  <Typography
                    variant="h5"
                    fontWeight={500}
                    marginBottom={"0.5rem"}
                  >
                    Pupil Dilation
                  </Typography>
                  <Typography variant="h6" fontWeight={400}>
                    Real-time Image Captured
                  </Typography>
                  <img src={TempEyeImage} width="120px" className="mt-2"></img>
                  <div className="flex items-center gap-4 mt-4">
                    <MaterialSymbol
                      icon="visibility"
                      size={40}
                      fill
                      grade={-25}
                    />
                    <p className="sensor-data">
                      Dilation Diameter:{" "}
                      {parseFloat(telemetryData.dilation_diameter).toFixed(2)}cm
                    </p>
                  </div>
                  {isDilationOutOfRange ? (
                    <div className="alerts-container warn mb-6">
                      <p>
                      Warning: Eye dilation diameter out of range
                      </p>
                    </div>
                    ): (  <div className="alerts-container no-warning mb-6">
                      <p>Normal: Eye dilation diameter within normal range</p>
                    </div>
                    )
                  }
                  
                  <Typography
                    variant="h5"
                    fontWeight={500}
                    marginBottom={"0.5rem"}
                  >
                    Reaction Time
                  </Typography>
                  <Typography variant="h6" fontWeight={400}>
                    Last Reaction Time: {telemetryData.last_reaction_timestamp}
                  </Typography>
                  <div className="flex items-center gap-4 mt-4">
                    <MaterialSymbol icon="pace" size={40} fill grade={-25} />
                    <p className="sensor-data">
                      Reaction Time:{" "}
                      {parseInt(telemetryData.last_reaction_time_ms)}ms
                    </p>
                  </div>
                  {isReactionTimeSlow ? (
                    <div className="alerts-container warn mb-6">
                    <p>
                      Warning: Reaction Time slow (Above Threshold)
                    </p>
                    </div>) : (<div className="alerts-container no-warning mb-6">
                      <p>Normal: Reaction Time within normal range</p>
                    </div>
                  )}
                </Stack>
              </Grid2>
              <Grid2 size={7}>
                <div className="flex flex-col h-full">
                  <TemperatureChart data={temperatureData} />
                  <ZGaitChart data={gaitData} />
                  <div className="ml-8">
                    <Typography variant="h6" fontWeight={400}>
                      Gait Distance (z-acceleration)
                    </Typography>
                    <div className="flex items-center gap-4 mt-4">
                      <MaterialSymbol
                        icon="footprint"
                        size={40}
                        fill
                        grade={-25}
                      />
                      <p className="sensor-data mr-4">
                        Left: {parseInt(telemetryData.z_gait_left)}m
                      </p>
                      <p className="sensor-data">
                        Right: {parseInt(telemetryData.z_gait_right)}m
                      </p>
                    </div>
                    <div className="alerts-container warn mb-6">
                      <p>Warning: Gait is abnormal!</p>
                    </div>
                  </div>
                </div>
              </Grid2>
            </Grid2>
          </Grid2>
        </div>
      </div>
    );
  }
};

export default OperationOverview;