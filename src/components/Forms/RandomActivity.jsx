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
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    apiHandler
      .getAllActivities()
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
        console.log(data);
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
    if (currentStep < 2) {
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
        <input
          className="form-control"
          id="categories"
          name="categories"
          type="radio"
          value="Cosy"
          onChange={props.handleChange}
        />
        <label htmlFor="Cosy">
          <span>On se détend</span>
        </label>
      </div>
      <div>
        <input
          className="form-control"
          id="categories"
          name="categories"
          type="radio"
          value="DIY"
          onChange={props.handleChange}
        />
        <label htmlFor="DIY">
          <span>On s'occupe</span>
        </label>
      </div>
      <div>
        <input
          className="form-control"
          id="categories"
          name="categories"
          type="radio"
          value="Plein air"
          onChange={props.handleChange}
        />
        <label htmlFor="Plein air">
          <span>On se booste</span>
        </label>
      </div>
      <div>
        <input
          className="form-control"
          id="categories"
          name="categories"
          type="radio"
          value=""
          onChange={props.handleChange}
        />
        <label htmlFor="Aucun">
          <span>Surpends-moi</span>
        </label>
      </div>
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }

  console.log("props", props.duration);
  return (
    <React.Fragment>
      <div className="form-group">
        <input
          className="form-control"
          id="duration"
          name="duration"
          type="radio"
          value={60}
          onChange={props.handleChange}
        />
        <label htmlFor="Aucun">
          <span>J'ai moins d'une heure</span>
        </label>
        <input
          className="form-control"
          id="duration"
          name="duration"
          type="radio"
          value={1000}
          onChange={props.handleChange}
        />
        <label htmlFor="Aucun">
          <span>J'ai tout mon temps</span>
        </label>
      </div>
      <button className="btn btn-success btn-block">
        Découvrir une activité
      </button>
    </React.Fragment>
  );
}

export default withRouter(MasterForm);
