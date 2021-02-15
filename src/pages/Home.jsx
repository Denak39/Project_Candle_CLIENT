import React from "react";
import NavMain from "../components/NavMain";
import { Link } from "react-router-dom";

class Home extends React.Component {
  render() {
    return (
      <div>
        <NavMain />
        <h1>Home Page ∆</h1>
        <Link to="/">
          <div>
            <img src="" alt="" />
            <h2>En panne d'inspiration ?</h2>
            <p>Découvrez une activité aléatoire</p>
          </div>
        </Link>
      </div>
    );
  }
}

export default Home;
