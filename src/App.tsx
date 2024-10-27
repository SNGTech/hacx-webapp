import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import "./variables.css";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import 'react-material-symbols/rounded';

function App() {
  return (
    <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
    <div className="">
      <Navbar />
      <div className="container-lg mx-auto p-6 py-5">
        <Outlet />
      </div>
    </div>
    </MsalAuthenticationTemplate>
  );
}

export default App;
