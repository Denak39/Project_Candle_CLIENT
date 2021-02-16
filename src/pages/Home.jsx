import React from "react";
import UserContext from "../components/Auth/UserContext";
import NavMain from "../components/NavMain";
import apiHandler from "../api/apiHandler";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

class Home extends React.Component {
  static contextType = UserContext;
  state = {
    user: "",
    value: "",
  };

  componentDidMount() {
    apiHandler.getOneUser().then((data) => {
      this.setState({ user: data });
    });
  }

  message(value) {
    if (value === "Jardinage") {
      return "J'aime jardiner";
    } else if (value === "Mercerie") {
      return "J'aime coudre";
    } else if (value === "Bricolage") {
      return "J'aime bricoler";
    } else if (value === "Peinture") {
      return "J'aime peindre";
    } else if (value === "Modelage") {
      return "J'aime créer";
    } else {
      return "too bad";
    }
  }

  render() {
    if (!this.state.user) {
      return <div>User is loading...</div>;
    }

    const interest = this.state.user.interest;

    return (
      <div>
        <NavMain />
        <Link to="/discover">
          <div>
            <img src="" alt="" />
            <h2>En panne d'inspiration ?</h2>
            <p>Découvrez une activité aléatoire</p>
          </div>
        </Link>
        <div>
          <h2>Nos recommendations pour vous</h2>
          <div></div>
        </div>
        <div>
          <h2>Vos activités préférées</h2>
          <div>
            <ul>
              {interest.map((value, index) => {
                return (
                  <li key={index}>
                    <h1>{value}</h1>
                    <p>{this.message(value)}</p>
                    {/* <img src="" alt={value} /> */}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
