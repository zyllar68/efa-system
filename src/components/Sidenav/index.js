import "./style.scss";
import Logo from "@images/logo.jpg";
import { NavLink } from 'react-router-dom';
import {  ReactComponent as BoxIcon } from "@icons/box.svg";
import {  ReactComponent as SettingsIcon } from "@icons/settings.svg";

const Sidenav = () => {
  return (
    <div className="Sidenav">
      <div className="Sidenav__header">
        <img src={Logo} alt="logo" />
        <h4>EFA</h4>
        <p>Tracking System</p>
      </div>
      <div className="Sidenav__links">
        <NavLink
         activeClassName="active-link" to="/" className="Sidenav__links-item">
          <BoxIcon />
          <p>Parcels</p>
        </NavLink>
        <NavLink
         activeClassName="active-link" to="/settings" className="Sidenav__links-item">
          <SettingsIcon />
          <p>Settings</p>
        </NavLink>
      </div>
    </div>  
  )
}

export default Sidenav;
