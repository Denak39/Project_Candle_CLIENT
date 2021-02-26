import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import apiHandler from "../api/apiHandler";
export default function Favorites() {
  let history = useHistory();
  const [user, setUser] = useState("");
  useEffect(() => {
    apiHandler.getOneUserFav().then((data) => {
      console.log("data", data);
      setUser(data);
    });
  }, []);
  console.log("user", user.favoritesActivities);
  const handleFavorites = (activity) => {
    apiHandler.takeOffFavorite(activity).then((data) => {});
    apiHandler.getOneUserFav().then((data) => {
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
                  <div
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundImage: `url(${activity.image})`,
                    }}
                  >
                    {/* <img src="" alt=""/> */}
                    <i
                      className="fas fa-heart"
                      onClick={() => handleFavorites(activity._id)}
                    ></i>
                  </div>
                  <div>
                    <h2>{activity.title}</h2>
                    <p>
                      {activity.subcategories} - {activity.duration} min
                    </p>
                  </div>
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
                <div
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${activity.image})`,
                  }}
                >
                  {/* <img src="" alt=""/> */}
                  <i
                    className="fas fa-heart"
                    onClick={() => handleFavorites(activity._id)}
                  ></i>
                </div>
                <div>
                  <h2>{activity.title}</h2>
                  <p>
                    {activity.subcategories} - {activity.duration} min
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
