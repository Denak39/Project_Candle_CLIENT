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
    allActivities: [],
  };

  componentDidMount() {
    apiHandler.getOneUser().then((data) => {
      this.setState({ user: data });
    });
    apiHandler.getAllActivities().then((data) => {
      this.setState({ allActivities: data });
    });
  }

  message(value) {
    if (value === "Jardinage") {
      return "Retour à l'essentiel avec des activités de jardinage en pleine terre et en appartement pour garder la main verte";
    } else if (value === "Mercerie") {
      return "Du fil, une aiguille et c'est parti pour débuter vos premières créations";
    } else if (value === "Bricolage") {
      return "On ne naît pas tous bricoleur, mais on peut le devenir avec ces projets simples que nous vous proposons";
    } else if (value === "Peinture") {
      return "Qui a dit qu’il fallait être Dali pour peindre une toile ? Découvrez des tutoriels simples et efficaces !";
    } else if (value === "Modelage") {
      return "Pas besoin d'aimer Patrick Swayze pour mettre les mains à la pâte et manier l'argile à la maison";
    } else if (value === "Petits plaisirs") {
      return "Pas besoin de savoir cuisiner comme un chef pour se faire plaisir à la maison. Par ici la douceur !";
    } else if (value === "Confort") {
      return "Rien de mieux qu'une ambiance cosy et comfortable pour se relaxer : on vous le montre en quelques activités";
    } else if (value === "Dessin") {
      return "Un stylo et une feuille de papier vous suffisent pour vous lancer";
    } else if (value === "Organisation") {
      return "Pas de Marie Kondo, mais des activités simples à faire à la maison pour trouver de la relaxation à travers un peu d'organisation";
    } else if (value === "Chat") {
      return "Lancez-vous dans des activités à faire pour votre petite boule de poile préférée";
    } else if (value === "Chien") {
      return "Parce qu'on ne peut rien leur refuser, découvrez des activités DIY simples pour le bonheur des toutous";
    } else if (value === "Activité de groupe") {
      return "Besoin de s'occuper entre amis ou en famille ? Ces activités sont faites pour vous";
    } else if (value === "Organisation") {
      return "Pas de Marie Kondo, mais des activités simples à faire à la maison pour trouver de la relaxation à travers un peu d'organisation";
    } else if (value === "Décoration") {
      return "Découvrez des projets simples et modernes pour redécorer votre intérieur ";
    } else if (value === "Art du papier") {
      return "Origami, collage et décoration, vous ne verrez plus votre papier de la même façon !";
    } else if (value === "Ecriture") {
      return "Un carnet et un stylo, c'est tout ce qu'il vous faut pour vous lancer à l'écriture";
    } else if (value === "Activité en plein air") {
      return "Rien de mieux qu'un grand bol d'air frais pour profiter de sa journée !";
    }
  }

  render() {
    if (!this.state.user) {
      return <div>User is loading...</div>;
    }

    const interest = this.state.user.interest;
    const reco = this.state.allActivities.filter((activity) =>
      interest.includes(activity.subcategories)
    );

    // function getCount(str) {
    //   let vowels = ["a", "e", "i", "o", "u"];
    //   return str.split("").filter((el) => vowels.includes(el)).length;
    // }
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
          <div>
            {reco.map((value, index) => {
              return (
                <div key={index}>
                  <img src={value.image} alt={value.image} />
                  <h1>{value.title}</h1>
                  <p>
                    {value.subcategories}
                    {value.duration}
                  </p>
                </div>
              );
            })}
          </div>
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
