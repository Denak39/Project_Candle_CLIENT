import React from "react";
import { withRouter, Link } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";

class MasterForm extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      email: "",
      name: "",
      password: "",
      genre: "",
      profileImage: "",
      interest: [],
      animals: [],
      activities: [],
      disabled: true,
      habits: [],
      needs: [],
    };
  }
  componentDidMount() {
    apiHandler.getAllActivities().then((data) => {
      this.setState({ activities: data });
    });
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    this.setState({
      disabled: false,
    });
    console.log(this.state.disabled);
  };

  handleClick = (event) => {
    const { name, value } = event.target;
    const animalsCopy = [...this.state.animals];
    animalsCopy.push(value);
    this.setState({
      [name]: animalsCopy,
    });
  };
  handleClick3 = (event) => {
    const { name, value } = event.target;
    const animalsCopy = [...this.state.habits];
    animalsCopy.push(value);
    this.setState({
      [name]: animalsCopy,
    });
    this.setState({
      disabled: false,
    });
  };
  handleClick4 = (event) => {
    const { name, value } = event.target;
    const animalsCopy = [...this.state.needs];
    animalsCopy.push(value);
    this.setState({
      [name]: animalsCopy,
    });
    this.setState({
      disabled: false,
    });
  };
  handleClick2 = (event) => {
    const { name, value } = event.target;
    const interestCopy = [...this.state.interest];
    const interestIndex = interestCopy.findIndex(
      (interest) => interest === value
    );
    if (event.target.checked === true) {
      interestCopy.push(value);
    } else {
      interestCopy.splice(interestIndex, 1);
    }
    this.setState({
      [name]: interestCopy,
    });
    this.setState({
      disabled: false,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 5 ? 6 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
      disabled: true,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };
  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary"
          type="button"
          onClick={this._prev}
        >
          Previous
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 6) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={this._next}
          disabled={this.state.disabled}
        >
          Suivant
        </button>
      );
    }
    return null;
  }

  render() {
    const progressArray = ["0", "1", "2", "3", "4", "5"];
    return (
      <React.Fragment>
        <div id="form-header">
          {this.previousButton()}
          <h1>Avant de débuter</h1>
        </div>
        <p>Step {this.state.currentStep} </p>
        <div id="progress-bar">
          {progressArray.map((index, value) => {
            return (
              <div
                id="progress-bar-step"
                key={index}
                style={{
                  color: index < this.state.currentStep ? "#F2CE70" : "white",
                  backgroundColor:
                    index < this.state.currentStep ? "#F2CE70" : "white",
                }}
              >
                {index}
              </div>
            );
          })}
        </div>
        <form onSubmit={this.handleSubmit}>
          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            email={this.state.email}
            password={this.state.password}
            genre={this.state.genre}
          />
          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            name={this.state.name}
          />
          <Step3
            currentStep={this.state.currentStep}
            name={this.state.name}
            habits={this.state.habits}
            handleClick3={this.handleClick3}
          />
          <Step4
            currentStep={this.state.currentStep}
            needs={this.state.needs}
            handleClick4={this.handleClick4}
          />
          <Step5
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            interests={this.state.interest}
            activities={this.state.activities}
            handleClick2={this.handleClick2}
          />
          <Step6
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            animals={this.state.animals}
            handleClick={this.handleClick}
            disabled={this.state.disabled}
          />

          {this.nextButton()}
        </form>
      </React.Fragment>
    );
  }
}
function Step1(props) {
  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <div className="form-group">
      <h2>Inscription</h2>
      <label htmlFor="email">Email address</label>
      <input
        className="form-control"
        id="email"
        name="email"
        type="text"
        placeholder="Enter email"
        value={props.email}
        onChange={props.handleChange}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        className="form-control"
        id="password"
        name="password"
        type="password"
        placeholder="Enter password"
        value={props.password}
        onChange={props.handleChange}
        required
      />
      <div>
        <label required htmlFor="genre">
          Genre
        </label>
        <input
          className="form-control"
          id="genre"
          name="genre"
          type="radio"
          value="Homme"
          onChange={props.handleChange}
        />
        <input
          className="form-control"
          id="genre"
          name="genre"
          type="radio"
          value="Femme"
          onChange={props.handleChange}
        />
      </div>
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div className="form-group">
      <h2>Comment vous appelez-vous ?</h2>
      <label htmlFor="name">name</label>
      <input
        className="form-control"
        id="name"
        name="name"
        type="text"
        placeholder="Enter name"
        value={props.name}
        onChange={props.handleChange}
        required
      />
    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="form-group">
        <h2>Faisons connaissance {props.name} ! </h2>
        <p>Qu'est-ce qui vous détend d'habitude ?</p>
        <input
          className="form-control"
          id="habits"
          name="habits"
          type="checkbox"
          placeholder="Je contacte mes proches pour discuter"
          value="détente"
          onChange={props.handleClick3}
        />
        <label>
          <span>Je contacte mes proches pour discuter</span>
        </label>
        <input
          className="form-control"
          id="habits"
          name="habits"
          type="checkbox"
          placeholder="Je pratique des activités manuelles"
          value="manu"
          onChange={props.handleClick3}
        />
        <label>
          <span>Je pratique des activités manuelles</span>
        </label>
        <input
          className="form-control"
          id="habits"
          name="habits"
          type="checkbox"
          placeholder="Je lis, j'écoute de la musique, je joue..."
          value="musique"
          onChange={props.handleClick3}
        />
        <label>
          <span>Je lis, j'écoute de la musique, je joue...</span>
        </label>
        <input
          className="form-control"
          id="habits"
          name="habits"
          type="checkbox"
          placeholder="Je profite du plein air"
          value="sortie"
          onChange={props.handleClick3}
        />
        <label>
          <span>Je profite du plein air</span>
        </label>
        <input
          className="form-control"
          id="habits"
          name="habits"
          type="checkbox"
          placeholder="Je fais du yoga ou de la méditation"
          value="yoga"
          onChange={props.handleClick3}
        />
        <label>
          <span>Je fais du yoga ou de la méditation</span>
        </label>
        <input
          className="form-control"
          id="habits"
          name="habits"
          type="checkbox"
          placeholder="Je me créé une ambiance cocooning"
          value="cocon"
          onChange={props.handleClick3}
        />
        <label>
          <span>Je me créé une ambiance cocooning</span>
        </label>
      </div>
    </React.Fragment>
  );
}

function Step4(props) {
  if (props.currentStep !== 4) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="form-group">
        <h2>Super !</h2>
        <p>
          Maintenant nous aimerions comprendre vos besoins, pourquoi
          souhaitez-vous créer de nouvelles habitudes de relaxation ?
        </p>
        <input
          className="form-control"
          id="needs"
          name="needs"
          type="checkbox"
          placeholder="Moins stresser"
          value="Stress"
          onChange={props.handleClick4}
        />
        <label>
          <span>Moins stresser</span>
        </label>
        <input
          className="form-control"
          id="needs"
          name="needs"
          type="checkbox"
          placeholder="Me changer les idées"
          value="Me changer les idées"
          onChange={props.handleClick4}
        />
        <label>
          <span>Me changer les idées</span>
        </label>
        <input
          className="form-control"
          id="needs"
          name="needs"
          type="checkbox"
          placeholder="Partager des intérêts avec mes proches"
          value="Partager des intérêts avec mes proches"
          onChange={props.handleClick4}
        />
        <label>
          <span>Partager des intérêts avec mes proches</span>
        </label>
        <input
          className="form-control"
          id="needs"
          name="needs"
          type="checkbox"
          placeholder="M'inspirer"
          value="M'inspirer"
          onChange={props.handleClick4}
        />
        <label>
          <span>M'inspirer</span>
        </label>
        <input
          className="form-control"
          id="needs"
          name="needs"
          type="checkbox"
          placeholder="Mieux occuper mon temps libre"
          value="Mieux occuper mon temps libre"
          onChange={props.handleClick4}
        />
        <label>
          <span>Mieux occuper mon temps libre</span>
        </label>
      </div>
    </React.Fragment>
  );
}

function Step5(props) {
  if (props.currentStep !== 5) {
    return null;
  }
  if (!props.activities) {
    return <div>NO subcategories...</div>;
  }

  const subArray = [
    ...new Set(props.activities.map((el) => el.subcategories).sort()),
  ];
  console.log(subArray);

  const imageArray = [
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
    "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  ];

  return (
    <div className="form-group">
      <h2>C'est compris !</h2>
      <p>
        Pour vous proposer des contenus de relaxation qui vous correspondent,
        choisissez les activités qui vous intéressent :{" "}
      </p>
      {subArray.map((value, index) => {
        return (
          <div key={index}>
            <input
              className="form-control"
              id="interest"
              name="interest"
              type="checkbox"
              placeholder={value}
              value={value}
              onChange={props.handleClick2}
            />
            {<img src={imageArray[index]} alt=""></img>}
            <label htmlFor={value}>
              <span>{value}</span>
            </label>
          </div>
        );
      })}
    </div>
  );
}
function Step6(props) {
  if (props.currentStep !== 6) {
    return null;
  }
  const animalArray = ["Chat", "Chien", "Chat et Chien", "Aucun"];
  return (
    <React.Fragment>
      <div className="form-group">
        <h2>C'est bientôt fini !</h2>
        <p>
          Pour finir, avez-vous des animaux de compagnie figurant dans cette
          liste ?{" "}
        </p>
        {animalArray.map((value, index) => {
          return (
            <div key={index}>
              <input
                className="form-control"
                id="animals"
                name="animals"
                type="radio"
                placeholder={value}
                value={value}
                onChange={props.handleChange}
              />
              <label htmlFor={value}>
                <span>{value}</span>
              </label>
            </div>
          );
        })}
      </div>

      <button className="btn btn-success btn-block" disabled={props.disabled}>
        Sign up
      </button>
    </React.Fragment>
  );
}
export default withRouter(MasterForm);
