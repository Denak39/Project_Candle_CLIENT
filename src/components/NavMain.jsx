import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import Mood from "../components/Mood";

import "../styles/NavMain.css";
import UserContext from "./Auth/UserContext";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <nav className="NavMain">
        <NavLink exact to="/profile">
          <h3 className="logo">Profile</h3>
        </NavLink>
        <ul className="nav-list">
          {context.isLoggedIn && (
            <React.Fragment>
              <li>
                <NavLink to="/profile">
                  {context.user && context.user.email}
                </NavLink>
              </li>
              <li>
                <p onClick={handleLogout}>Logout</p>
              </li>
              <li>
                <h3 className="logo">Search</h3>
              </li>
              <li>
                <NavLink to="/favorites">
                  <h3 className="logo">Favorites</h3>
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {!context.isLoggedIn && (
            <React.Fragment>
              <li>
                <NavLink to="/signin">Log in</NavLink>
              </li>
              <li>
                <NavLink to="/signup">Create account</NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </nav>
      <div>
        <h1>Bonjour {context.user && context.user.name} !</h1>
      </div>
      <Mood />
    </div>
  );
};

export default withUser(NavMain);
