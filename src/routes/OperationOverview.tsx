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
import { models } from "powerbi-client";
import "../css/OperationOverview.css";
import { useEffect, useState } from "react";
import startEventReader from "../scripts/event_hub_reader";
import TemperatureChart from "../components/TemperatureChart";

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

  // const { instance, inProgress, accounts } = useMsal();
  // const isAuthenticated = useIsAuthenticated();
  const [accessToken, setAccessToken] = useState("");
  const [reactionTimeModBtnDisabled, setReactionTimeModBtnDisabled] = useState(false);

  const [telemetryData, setTelemtryData] = useState([{}]);

  // useEffect(() => {
  //   if (!isAuthenticated && inProgress === InteractionStatus.None) {
  //       instance.loginPopup();
  //   }
  // }, [isAuthenticated, inProgress, instance]);

  useEffect(() => {
    startEventReader((data: any) => {
      const payload = {
        "head_temperature": data.body["head_temperature"],
        "z_gait_left": data.body["z_gait_left"],
        "z_gait_right": data.body["z_gait_right"],
        "dilation_diameter": data.body["dilation_diameter"],
        "timestamp": data.enqueuedTimeUtc
      }

      setTelemtryData(oldTelemetry => [...oldTelemetry, payload])
    });
  }, []);

  // useEffect(() => {}, [isAuthenticated, accessToken]);
  // if (accessToken !== "") {
  //   return (<><Typography variant="h3">Loading Dashboard...</Typography></>);
  // }

  const triggerReactionTimeMod = async () => {
    fetch("https://reaction-time-mod-trigger.azurewebsites.net/api/reaction-time/deviceset0/1", {
      method: "POST",
      mode: "no-cors"
    })
    .then(() => {
      console.log("Triggered Reaction Time");
      setReactionTimeModBtnDisabled(true);
      setTimeout(() => {setReactionTimeModBtnDisabled(false)}, 5500);
    })
    .catch((err) => {
      console.log("Failed to trigger Reaction Time. Error:", err);
    });
  };

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
          <Button variant="contained" onClick={triggerReactionTimeMod} disabled={reactionTimeModBtnDisabled}>Start Reaction Time Test</Button>
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
          <Grid2 size="grow">
            <TemperatureChart data={telemetryData} />
            {/* <Box className="p-2 h-full" sx={{ border: "1px solid grey" }}>
            
            </Box> */}
          </Grid2>
        </Grid2>
      </div>
    </div>
  );
};

export default OperationOverview;
