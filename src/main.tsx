import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import { MsalProvider } from "@azure/msal-react";
 
import App from './App';
import msalConfig from './authProvider';
import Dashboard from "./routes/Dashboard";
import Officers from "./routes/Officers";
import Calibration from "./routes/Calibration";
import Operations from "./routes/Operations";
import OperationOverview from "./routes/OperationOverview";
import "./index.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { PublicClientApplication } from "@azure/msal-browser";


// Create an instance of PublicClientApplication
const msalInstance = new PublicClientApplication(msalConfig);

const router = createBrowserRouter([
  {
    element: <MsalProvider instance={msalInstance}><App /></MsalProvider>,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },
      {
        path: "/ops",
        element: <Operations />
      },
      {
        path: "/ops/overview",
        element: <OperationOverview />
      },
      {
        path: "/officers",
        element: <Officers />
      },
      {
        path: "/calibration",
        element: <Calibration />
      },
    ]
  }
]);

const theme = createTheme({
  cssVariables: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <AzureAD provider={authProvider} forceLogin={true}> */}
      <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
      </ThemeProvider>
    {/* </AzureAD> */}
  </StrictMode>
);
