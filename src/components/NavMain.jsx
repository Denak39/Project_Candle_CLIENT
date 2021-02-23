import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import Mood from "../components/Mood";
import dayjs from "dayjs";

import "../styles/NavMain.css";
import UserContext from "./Auth/UserContext";

const NavMain = (props) => {
  const { context } = props;
  let history = useHistory();

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

  const dateMood =
    context.user &&
    context.user.mood
      .map((mood) => mood.date.slice(0, 10))
      .includes(dayjs().format("YYYY-MM-DD"));

  const today = dayjs().format("YYYY-MM-DD");

  return (
    <div>
      <nav className="NavMain">
        {history.location.pathname.slice(0, -25) === "/activities" && (
          <button onClick={() => history.goBack()}>Précédent</button>
        )}
        {history.location.pathname.slice(0, -25) !== "/activities" && (
          <NavLink exact to="/profile">
            <h3 className="logo">Profile</h3>
          </NavLink>
        )}

        <ul className="nav-list">
          {context.isLoggedIn && (
            <React.Fragment>
              <li>
                <NavLink to="/profile">
                  {context.user && context.user.email}
                </NavLink>
              </li>

              <li>
                {/* <NavLink to="/signin"> */}
                <p onClick={handleLogout}>Logout</p>
                {/* </NavLink> */}
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
      {!dateMood && <Mood />}
    </div>
  );
};

export default withUser(NavMain);
