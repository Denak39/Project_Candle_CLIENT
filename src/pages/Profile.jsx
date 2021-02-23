import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import dayjs from "dayjs";
import Galerie from "../components/ProfileCompo/Galerie";
import Stat from "../components/ProfileCompo/Stat";
import Pref from "../components/ProfileCompo/Pref";

const Profile = (props) => {
  const menu = ["Galerie", "Statistiques", "Préférences"];
  const [compo, setCompo] = useState("Galerie");
  const { context } = props;
  const memberDate = dayjs(context.user.created_at).format("MMMM YYYY");
  let history = useHistory();

  return (
    <div>
      <h1>Protected profile</h1>
      <nav>
        <div style={{ display: "flex" }}>
          <button onClick={() => history.goBack()}>Précédent</button>
          <h2>Mon espace</h2>
          <button>Réglages</button>
        </div>
        <div style={{ display: "flex" }}>
          {/* <img src={context.user.image} alt={context.user.name} /> */}
          <div>
            <h2>{context.user.name}</h2>
            <p>Membre depuis {memberDate}</p>
          </div>
        </div>
      </nav>
      {menu.map((compo) => (
        <button onClick={() => setCompo(compo)} key={compo}>
          {compo}
        </button>
      ))}
      {compo === "Galerie" && <Galerie />}
      {compo === "Statistiques" && <Stat mood={context.user.mood} />}
      {compo === "Préférences" && <Pref />}
    </div>
  );
};

export default withUser(Profile);
