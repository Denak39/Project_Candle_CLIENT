import React, { Component } from "react";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";

export default class Final extends Component {
  static contextType = UserContext;
  state = {
    user: "",
    feeling: "",
  };

  // handleChange = (event) => {
  //   const key = event.target.name;
  //   const value = event.target.value;

  //   this.setState({ [key]: value });
  //   console.log("Hello", this.state.feeling);
  // };

  handleSubmit = (event) => {
    event.preventDefault();
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
    console.log("Hello", this.state.feeling);

    apiHandler
      .updateUser(this.state)
      .then((data) => {
        console.log("HelloBis", this.state.feeling);
        this.context.setUser(data);
        // this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
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
    console.log(activityId);
    return (
      <div className="Final">
        <h1>Bien joué, {this.state.user.name} !</h1>
        <form
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <div className="field">
            <label htmlFor="grade">
              Comment avez-vous trouvez cette activité ?
            </label>
            <input type="text" id="grade" name="grade" required />
          </div>
          <div className="field">
            <label htmlFor="feeling">
              Comment vous sentez-vous après cette activité ?
            </label>
            <input type="text" id="feeling" name="feeling" />
          </div>
          <button>Envoyer</button>
        </form>

        <form
          className="form"
          // onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <div className="field">
            <label htmlFor="grade">
              Comment avez-vous trouvez cette activité ?
            </label>
            <input
              type="text"
              id="feeling"
              name="feeling"
              value="Relaxé(e)"
              required
            />
          </div>

          <button>Relaxée</button>
        </form>
      </div>
    );
  }
}
