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
      categories: "",
      duration: "",
      activities: [],
      checked: false,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = (event) => {
    const { name, value } = event.target;
    const animalsCopy = [...this.state.animals];
    const animalsIndex = animalsCopy.findIndex((animal) => animal === value);

    if (event.target.checked === true) {
      animalsCopy.push(value);
    } else {
      animalsCopy.splice(animalsIndex, 1);
    }
    this.setState({
      [name]: animalsCopy,
    });
    if (event.target.value === "Aucun" && event.target.checked === true) {
      this.setState({ checked: false, animals: ["Aucun"] });
    }
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
          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            categories={this.state.categories}
          />
          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            duration={this.state.duration}
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
      <div>
        <label htmlFor="genre">Genre</label>
        <input
          className="form-control"
          id="categories"
          name="categories"
          type="radio"
          value="Cosy"
          onChange={props.handleChange}
        />
        <input
          className="form-control"
          id="categories"
          name="categories"
          type="radio"
          value="Plein air"
          onChange={props.handleChange}
        />
        <input
          className="form-control"
          id="categories"
          name="categories"
          type="radio"
          value="DIY"
          onChange={props.handleChange}
        />
        <input
          className="form-control"
          id="categories"
          name="categories"
          type="radio"
          value={this.state.categories}
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
    <React.Fragment>
      <div className="form-group">
        <input
          className="form-control"
          id="duration"
          name="duration"
          type="radio"
          value="DIY"
          onChange={props.handleChange}
        />
        <input
          className="form-control"
          id="duration"
          name="duration"
          type="radio"
          value={this.state.categories}
          onChange={props.handleChange}
        />
      </div>
      <button className="btn btn-success btn-block">Sign up</button>
    </React.Fragment>
  );
}

export default withRouter(MasterForm);
