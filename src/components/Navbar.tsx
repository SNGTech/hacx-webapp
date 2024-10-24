import "../css/Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar p-5 flex flex-row justify-between items-center">
      <div className="">
        <h1 className="hacx">HacX Portal</h1>
      </div>
      <nav className="flex flex-row w-4/12 justify-between">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/ops">Operations</NavLink>
        <NavLink to="/officers">Officers</NavLink>
        <NavLink to="/calibration">Calibration</NavLink>
      </nav>
    </div>
  );
};

export default Navbar;
