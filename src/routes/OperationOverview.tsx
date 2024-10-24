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
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import "../css/OperationOverview.css";
import { useEffect, useState } from "react";

const REACT_APP_POWERBI_TOKEN = "eyJ0eXAk1jN2wzSXo5M2c3dXdnTmVFbW13X1dZR1BrbyJ9.eyJhdWQiOiJoLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYWMyMGFkZDEtZmZkYS00NWMxLWFkYzUtMTZhMGRiMTU4MTBmLyIsImlhdCI6MTcyODkzMzI0OCwibmJmIjoxNzI4OTMzMjQ4LCJleHAiOjE3Mjg5Mzg0NzYsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84WUFBQUFyRVhXdnBzNmgxNVJPTENQUVBVWExaMjRvbWlVZEFFa3ZpcWs4NWFjTENhQ09mZW1YU1BRYms1ZHBRZzViNEk1IiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6ImNjODBmODllLTUwOTAtNGIwNi1iOWU5LWFlYTY4OTc3MzYyOCIsImFwcGlkYWNyIjoiMSIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjExNS42Ni45LjE4NCIsIm5hbWUiOiJoYWN4dXNlcjE5Iiwib2lkIjoiNjQ2MGQwZTctMDI0NC00MTVkLTkxYzktZGVkZTY3NDdkMDNlIiwicHVpZCI6IjEwMDMyMDAzQjRDREJFRjQiLCJyaCI6IjAuQVZVQTBhMGdyTnJfd1VXdHhSYWcyeFdCRHdrQUFBQUFBQUFBd0FBQUFBQUFBQUNJQU13LiIsInNjcCI6IkFwcC5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkLkFsbCBDYXBhY2l0eS5SZWFkV3JpdGUuQWxsIENvbnRlbnQuQ3JlYXRlIERhc2hib2FyZC5SZWFkLkFsbCBEYXNoYm9hcmQuUmVhZFdyaXRlLkFsbCBEYXRhZmxvdy5SZWFkLkFsbCBEYXRhZmxvdy5SZWFkV3JpdGUuQWxsIERhdGFzZXQuUmVhZC5BbGwgRGF0YXNldC5SZWFkV3JpdGUuQWxsIEdhdGV3YXkuUmVhZC5BbGwgR2F0ZXdheS5SZWFkV3JpdGUuQWxsIFJlcG9ydC5SZWFkLkFsbCBSZXBvcnQuUmVhZFdyaXRlLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkLkFsbCBTdG9yYWdlQWNjb3VudC5SZWFkV3JpdGUuQWxsIFdvcmtzcGFjZS5SZWFkLkFsbCBXb3Jrc3BhY2UuUmVhZFdyaXRlLkFsbCIsInN1YiI6IjcyZ2dYSDVVa3JCSXJFckd5OHRMQng3YXR1R0pEbHZOTnIwM2RiajhQQWciLCJ0aWQiOiJhYzIwYWRkMS1mZmRhLTQ1YzEtYWRjNS0xNmEwZGIxNTgxMGYiLCJ1bmlxdWVfbmFtZSI6ImhhY3h1c2VyMTlAaHR4c2FuZHBpdC5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJoYWN4dXNlcjE5QGh0eHNhbmRwaXQub25taWNyb3NvZnQuY29tIiwidXRpIjoiLVFubXZaTXRjMFM0U19sT3VoUXpBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19pZHJlbCI6IjEgMTAifQ.Yz6jtHMuzw5RfA1ThvlmU4i-4AtO880Rx1UQCOJvoH9xRniWk5YynGhPb1Srk-PPU-5cS_vMzQ1dmG7t0uYE55E0sUFWwfoRjfZ9d9fAzI6lPloS-8HMjMFsz5lIrNgPUY5W9FAJBcz0wm9SUBgfPwKyPCTl0J8_XOQMajcfFYRiOXntv0YuY3OST3vyXPx5kDyXZXUEXw-sKJy3vfh6BD4U-o8UlR1caAcDVlej0BNVMHmdlow69zsT6wfUGpPaOwn5DukFl6N75aykpwC62sOsVynEMVy103YNwzfpQvPbkhxb6uLLCUrHHKZg6imGENBzEyenhAjyGkk6NDUJ5g"
// import {
//   InteractionRequiredAuthError,
//   InteractionStatus,
// } from "@azure/msal-browser";
// import { AuthenticatedTemplate, useIsAuthenticated, useMsal } from "@azure/msal-react";

// const accessTokenHeader = {
//   client_id: "cc80f89e-5090-4b06-b9e9-aea689773628",
//   scope: "openid",
//   resource: "https://analysis.windows.net/powerbi/api",
//   username: "hacxuser19@htxsandpit.onmicrosoft.com",
//   password: "s17116901337I",
//   grant_type: "password",
//   client_secret: "j0W8Q~WU7xEzzRAmncGaXBwj5cj6C~Hl5qvCNbKg",
// };

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

  // useEffect(() => {
  //   if (!isAuthenticated && inProgress === InteractionStatus.None) {
  //       instance.loginPopup();
  //   }
  // }, [isAuthenticated, inProgress, instance]);

  useEffect(() => {
  //   const accessTokenRequest = {
  //     scopes: ["user.read"],
  //     account: accounts[0],
  //   };
  //   console.log("Retrieving access token...");
  //   instance
  //   .acquireTokenSilent(accessTokenRequest)
  //   .then((accessTokenResponse) => {
  //     // Acquire token silent success
  //     let accessToken = accessTokenResponse.accessToken;
  //     console.log("Retrieved token:", accessToken);
  //     // Call your API with token
  //     setAccessToken(accessToken);
  //   }).catch((error) => {
  //     if (error instanceof InteractionRequiredAuthError) {
  //       instance.acquireTokenRedirect(accessTokenRequest);
  //     }
  //     console.log(error);
  //   });
  // }
    let headersList = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*"
    };

    let bodyContent =
      "client_id=dd5f9554-dc08-44b6-8efe-8426c96b8cb1&scope=https://analysis.windows.net/powerbi/api/Dashboard.ReadWrite.All&username=hacxuser19@htxsandpit.onmicrosoft.com&password=s17116901337I&grant_type=password&client_secret=Yis8Q~QOJKEVaxJaninuL7ghLJsZeCpJjoqi4b80";

    fetch("https://login.microsoftonline.com/ac20add1-ffda-45c1-adc5-16a0db15810f/oauth2/v2.0/token", {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAccessToken(data.access_token);
        console.log("Set access token for PowerBI to:", accessToken);
      })
      .catch((err) => {
        console.log(err.message);
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
            <Box className="p-2 h-full" sx={{ border: "1px solid grey" }}>
            
              <PowerBIEmbed
                embedConfig={{
                  type: "dashboard", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
                  id: "db2182d3-db8b-4720-bcbc-4752922a22d7",
                  embedUrl:
                    "https://app.powerbi.com/dashboardEmbed?dashboardId=db2182d3-db8b-4720-bcbc-4752922a22d7&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUVBU1QtQVNJQS1CLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7fX0%3d",
                  accessToken: REACT_APP_POWERBI_TOKEN,
                  tokenType: models.TokenType.Aad,
                  settings: {
                    panes: {
                      filters: {
                        expanded: false,
                        visible: false,
                      },
                    },
                    background: models.BackgroundType.Transparent,
                  },
                }}
                eventHandlers={
                  new Map([
                    [
                      "loaded",
                      function () {
                        console.log("Dashboard loaded");
                      },
                    ],
                    [
                      "rendered",
                      function () {
                        console.log("Dashboard rendered");
                      },
                    ],
                    [
                      "error",
                      function (event) {
                        console.log(event!.detail);
                      },
                    ],
                    ["visualClicked", () => console.log("visual clicked")],
                    ["pageChanged", (event) => console.log(event)],
                  ])
                }
                cssClassName={"dashboard-container"}
              />
            </Box>
          </Grid2>
        </Grid2>
      </div>
    </div>
  );
};

export default OperationOverview;
