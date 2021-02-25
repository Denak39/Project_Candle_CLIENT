import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import apiHandler from "../api/apiHandler";

export default function Favorites() {
  let history = useHistory();

  const [user, setUser] = useState("");

  useEffect(() => {
    apiHandler.getOneUser().then((data) => {
      console.log("data", data);
      setUser(data);
    });
  }, []);

  console.log("user", user.favoritesActivities);

  const handleFavorites = (activity) => {
    apiHandler.takeOffFavorite(activity).then((data) => {});
    apiHandler.getOneUser().then((data) => {
      console.log("data", data);
      setUser(data);
    });
  };

  return (
    <div>
      <header>
        <button onClick={() => history.goBack()}>Précédent</button>
        <h1>Mes favoris</h1>
      </header>
      <div>
        <h1>Récents</h1>
        {user &&
          [...user.favoritesActivities]
            .splice(-5)
            .reverse()
            .map((activity, id) => {
              return (
                <div key={id}>
                  <h2>{activity.title}</h2>

                  <i
                    class="fas fa-heart"
                    onClick={() => handleFavorites(activity._id)}
                  ></i>
                </div>
              );
            })}
      </div>
      <div>
        <h1>Tous mes favoris</h1>
        {user &&
          user.favoritesActivities.reverse().map((activity, id) => {
            return (
              <div key={id}>
                <h2>{activity.title}</h2>
              </div>
            );
          })}
      </div>
    </div>
  );
}
