import React, { Component } from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import UserContext from "../../Auth/UserContext";
import Footer from "../../Footer";
import apiHandler from "../../../api/apiHandler";
import { withUser } from "../../Auth/withUser";

class DiscoverOneGif extends React.Component {
  static contextType = UserContext;
  state = {
    activity: "",
    user: "",
  };
  componentDidMount() {
    apiHandler.getOneUser().then((data) => {});

    apiHandler
      .getOneActivity(this.props.match.params.id)
      .then((data) => {
        this.setState({ activity: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    if (this.state.activity === null) return null;
    console.log(this.state.activity);
    return (
      <div>
        <Link to={`/activities/${this.state.activity._id}`}>
          <div>
            <img src={this.state.activity.image} alt=""></img>
            <h1>{this.state.activity.title}</h1>
            <div>
              <p>{this.state.activity.subcategories}</p>
              <p>{this.state.activity.duration}</p>
              <p>{this.state.activity.difficulty}</p>
            </div>
          </div>
        </Link>
        <p>Heart ICON</p>
        <h4>{this.state.activity.title}</h4>
      </div>
    );
  }
}
export default withUser(DiscoverOneGif);
