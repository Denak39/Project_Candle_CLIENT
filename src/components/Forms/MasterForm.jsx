import React from "react";
import { withRouter } from "react-router-dom";
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
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    console.log(this.state.genre);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // const {
    //   email,
    //   name,
    //   password,
    //   genre,
    //   profileImage,
    //   interest,
    //   animals,
    // } = this.state;
    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
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
        >
          Next
        </button>
      );
    }
    return null;
  }
  render() {
    return (
      <React.Fragment>
        <h1>React Wizard Form</h1>
        <p>Step {this.state.currentStep} </p>

        <form onSubmit={this.handleSubmit}>
          {/* 
        render the form steps and pass required props in
      */}
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
          <Step3 currentStep={this.state.currentStep} />
          <Step4 currentStep={this.state.currentStep} />
          <Step5
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            interests={this.state.interest}
          />
          <Step6
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            animals={this.state.animals}
          />
          {this.previousButton()}
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
      <label htmlFor="email">Email address</label>
      <input
        className="form-control"
        id="email"
        name="email"
        type="text"
        placeholder="Enter email"
        value={props.email}
        onChange={props.handleChange}
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
      />
      <div>
        <label htmlFor="genre">Genre</label>
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
      {/* <div className="pic-upload form-div">
        <div>
          <label htmlFor="profileImage" className="profileImg-label label-file">
            Avatar:
          </label>
        </div>
        <br />
        <div className="choose-file">
          <input
            onChange={props.handleChange}
            value="profileImage"
            type="file"
            name="profileImage"
            id="image"
            alt="profileImage"
            className="signup-profileImg input-file"
          />
        </div>
      </div> */}
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div className="form-group">
      <label htmlFor="name">name</label>
      <input
        className="form-control"
        id="name"
        name="name"
        type="text"
        placeholder="Enter name"
        value={props.name}
        onChange={props.handleChange}
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
        <label>Faisons connaissance ! </label>
        <p>Qu'est-ce qui vous détend d'habitude ?</p>
        <input
          className="form-control"
          type="button"
          value="Je contacte mes proches pour discuter"
        />
        <input
          type="button"
          value="Je pratique des activités manuelles"
        ></input>
        <input
          type="button"
          value="Je lis, j'écoute de la musique, je joue..."
        ></input>
        <input type="button" value="Je profite du plein air"></input>
        <input
          type="button"
          value="Je fais du yoga ou de la méditation"
        ></input>
        <input type="button" value="Je me créé une ambiance cocooning"></input>
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
        <label>Super !</label>
        <p>
          Maintenant nous aimerions comprendre vos besoins, pourquoi
          souhaitez-vous créer de nouvelles habitudes de relaxation ?
        </p>
        <input className="form-control" type="button" value="Moins stresser" />
        <input type="button" value="Me changer les idées"></input>
        <input
          type="button"
          value="Partager des intérêts avec mes proches"
        ></input>
        <input type="button" value="M'inspirer"></input>
        <input type="button" value="Mieux occuper mon temps libre"></input>
      </div>
    </React.Fragment>
  );
}
function Step5(props) {
  if (props.currentStep !== 5) {
    return null;
  }
  return (
    <div className="form-group">
      <label htmlFor="interest" hidden></label>
      <input
        className="form-control"
        id="interest"
        name="interest"
        type="button"
        placeholder="Décoration"
        value="Décoration"
        onChange={props.handleChange}
      />
      <input
        className="form-control"
        id="interest"
        name="interest"
        type="button"
        placeholder="Art du papier"
        value="Art du papier"
        onChange={props.handleChange}
      />
      <input
        className="form-control"
        id="interest"
        name="interest"
        type="button"
        placeholder="Bricolage"
        value="Bricolage"
        onChange={props.handleChange}
      />
      <input
        className="form-control"
        id="interest"
        name="interest"
        type="button"
        placeholder="Peinture"
        value="Peinture"
        onChange={props.handleChange}
      />
      <input
        className="form-control"
        id="interest"
        name="interest"
        type="button"
        placeholder="Petits plaisirs"
        value="Petits plaisirs"
        onChange={props.handleChange}
      />
      <input
        className="form-control"
        id="interest"
        name="interest"
        type="button"
        placeholder="Activité en plein air"
        value="Activité en plein air"
        onChange={props.handleChange}
      />
      <input
        className="form-control"
        id="interest"
        name="interest"
        type="button"
        placeholder="Mercerie"
        value="Mercerie"
        onChange={props.handleChange}
      />
      <input
        className="form-control"
        id="interest"
        name="interest"
        type="button"
        placeholder="Jardinage"
        value="Jardinage"
        onChange={props.handleChange}
      />
      <input
        className="form-control"
        id="interest"
        name="interest"
        type="button"
        placeholder="Modelage"
        value="Modelage"
        onChange={props.handleChange}
      />
      <input
        className="form-control"
        id="interest"
        name="interest"
        type="button"
        placeholder="Activité de groupe"
        value="Activité de groupe"
        onChange={props.handleChange}
      />
    </div>
  );
}
function Step6(props) {
  if (props.currentStep !== 6) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor="animals" hidden></label>
        <input
          className="form-control"
          id="animals"
          name="animals"
          type="button"
          placeholder="Chat"
          value="Chat"
          onChange={props.handleChange}
        />
        <input
          className="form-control"
          id="animals"
          name="animals"
          type="button"
          placeholder="Chien"
          value="Chien"
          onChange={props.handleChange}
        />
        <input
          className="form-control"
          id="animals"
          name="animals"
          type="button"
          placeholder="Rongeur (lapin, hamster, etc.)"
          value="Rongeur"
          onChange={props.handleChange}
        />
        <input
          className="form-control"
          id="animals"
          name="animals"
          type="button"
          placeholder="Autres"
          value="Autres"
          onChange={props.handleChange}
        />
        <input
          className="form-control"
          id="animals"
          name="animals"
          type="button"
          placeholder="Je n'ai aucun animal"
          value="Aucun"
          onChange={props.handleChange}
        />
      </div>
      <button className="btn btn-success btn-block">Sign up</button>
    </React.Fragment>
  );
}
export default withRouter(MasterForm);
