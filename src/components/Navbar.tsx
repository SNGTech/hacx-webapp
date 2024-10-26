import "../css/Navbar.css";
import { NavLink } from "react-router-dom";
import Icon from "../imgs/icon.png";

const Navbar = () => {
  return (
    <div className="navbar p-5 flex flex-row justify-between items-center">
      <div className="flex items-center gap-4">
        <img src={Icon} width={"50px"}></img>
        <h1 className="hacx">A.R.G.U.S Monitor</h1>
      </div>
      <nav className="flex flex-row w-4/12 justify-between">
        {/* <NavLink to="/">Dashboard</NavLink> */}
        <NavLink to="/ops">Operations</NavLink>
        <NavLink to="/officers">Officers</NavLink>
        <NavLink to="/calibration">Calibration</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
