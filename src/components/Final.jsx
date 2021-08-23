import React, { Component } from "react";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";

export default class Final extends Component {
  static contextType = UserContext;
  state = {
    activityId: this.props.activityId,
    userActivities: [],
    user: "",
    feeling: "",
    grades: "",
  };

  // handleChange = (event) => {
  //   const key = event.target.name;
  //   const value = event.target.value;

  //   this.setState({ [key]: value });
  //   console.log("Hello", this.state.feeling);
  // };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    const activityId = this.props.activityId;

    const newuserActivities = [
      ...this.state.user.userActivities.filter(
        (activity) => activity._id !== activityId
      ),
      { _id: activityId, completed: true },
    ];

    this.setState({ userActivities: newuserActivities });
  };

  // handleClick2 = (event) => {
  //   const { name, value } = event.target;
  //   const gradesCopy = [...this.state.grades];
  //   const gradesIndex = gradesCopy.findIndex((grades) => grades === value);
  //   if (event.target.checked === true) {
  //     gradesCopy.push(value);
  //   } else {
  //     gradesCopy.splice(gradesIndex, 1);
  //   }
  //   this.setState({
  //     [name]: gradesCopy,
  //   });
  // };

  handleSubmit = (event) => {
    event.preventDefault();
    // const key = event.target.name;
    // const value = event.target.value;

    // this.setState({ [key]: value });
    // console.log("Hello", this.state.feeling);

    // apiHandler
    //   .updateActivity(this.props.activityId, this.state)
    //   .then((data) => {
    //     console.log("HelloBis", this.state.feeling);
    //     this.context.setUser(data);
    //     // this.props.history.push("/");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     // Display error message here, if you set the state
    //   });

    apiHandler
      .updateUser3(this.state)
      .then((data) => {
        this.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    apiHandler.getOneUser().then((data) => {
      this.setState({ user: data });
      console.log("user", this.state.user);
    });
  }

  render() {
    const { activityId } = this.props;
    console.log("activityId", activityId);
    return (
      <div className="Final">
        <h1>Bien joué, {this.state.user.name} !</h1>
        <form
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h1 className="field">Comment avez-vous trouvez cette activité ?</h1>

          <div>
            <div>
              <input
                className="form-control"
                id="grades"
                name="grades"
                type="radio"
                value="1"
                onChange={this.handleChange}
              />
              <label htmlFor="1">
                <span>1</span>
              </label>
            </div>
            <div>
              <input
                className="form-control"
                id="grades"
                name="grades"
                type="radio"
                value="2"
                onChange={this.handleChange}
              />
              <label htmlFor="2">
                <span>2</span>
              </label>
            </div>
            <div>
              <input
                className="form-control"
                id="grades"
                name="grades"
                type="radio"
                value="3"
                onChange={this.handleChange}
              />
              <label htmlFor="3">
                <span>3</span>
              </label>
            </div>
            <div>
              <input
                className="form-control"
                id="grades"
                name="grades"
                type="radio"
                value="4"
                onChange={this.handleChange}
              />
              <label htmlFor="4">
                <span>4</span>
              </label>
            </div>
          </div>

          <h1 className="field">
            Comment vous sentez-vous après cette activité
          </h1>
          <div>
            <div>
              <input
                className="form-control"
                id="feeling"
                name="feeling"
                type="radio"
                value="Relaxé(e)"
                onChange={this.handleChange}
              />
              <label htmlFor="Relaxé(e)">
                <span>Relaxé(e)</span>
              </label>
            </div>
            <div>
              <input
                className="form-control"
                id="feeling"
                name="feeling"
                type="radio"
                value="Boosté(e)"
                onChange={this.handleChange}
              />
              <label htmlFor="Boosté(e)">
                <span>Boosté(e)</span>
              </label>
            </div>
            <div>
              <input
                className="form-control"
                id="feeling"
                name="feeling"
                type="radio"
                value="Inspiré(e)"
                onChange={this.handleChange}
              />
              <label htmlFor="Inspiré(e)">
                <span>Inspiré(e)</span>
              </label>
            </div>
            <div>
              <input
                className="form-control"
                id="feeling"
                name="feeling"
                type="radio"
                value="Frustré(e)"
                onChange={this.handleChange}
              />
              <label htmlFor="Frustré(e)">
                <span>Frustré(e)</span>
              </label>
            </div>
          </div>
          <Link to={`/`}>
            <button onClick={this.handleSubmit}>Envoyer</button>
          </Link>
        </form>
      </div>
    );
  }
}
