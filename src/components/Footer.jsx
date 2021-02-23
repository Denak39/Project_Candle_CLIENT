import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";

const Footer = (props) => {
  return (
    <div>
      <nav className="Footer">
        <NavLink exact to="/profile">
          <h3 className="logo">Pour vous</h3>
        </NavLink>
        <NavLink exact to="/activities/PleinAir">
          <h3 className="logo">Plein Air</h3>
        </NavLink>
        <NavLink exact to="/activities/DIY">
          <h3 className="logo">DIY</h3>
        </NavLink>
        <NavLink exact to="/activities/Cosy">
          <h3 className="logo">Cosy</h3>
        </NavLink>
        <NavLink exact to="/discover">
          <h3 className="logo">Découvrir</h3>
        </NavLink>
      </nav>
    </div>
  );
};

export default Footer;
