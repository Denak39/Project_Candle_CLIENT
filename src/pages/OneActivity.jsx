import React from "react";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";
import NavMain from "../components/NavMain";
import { Link } from "react-router-dom";

class OneActivity extends React.Component {
  static contextType = UserContext;
  state = {
    activity: null,
    userActivities: [],
    value: "",
  };
  // populate?
  // this.context.user
  handleSubmit = (event) => {
    // event.preventDefault();
    const activityId = this.props.match.params.id;
    apiHandler
      .updateUser(this.state)
      .then((data) => {
        this.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  componentDidMount() {
    const activityId = this.props.match.params.id;
    apiHandler.getOneActivity(activityId).then((activity) => {
      this.setState({ activity });
    });
  }

  render() {
    if (this.state.activity === null) return null;
    console.log(this.state.activity);
    const materials = this.state.activity.material;
    return (
      this.state.activity && (
        <div>
          <NavMain />
          <div>
            <h1>{this.state.activity.title}</h1>
            <div>
              <h3>{this.state.activity.subcategories}</h3>
              <h3>{this.state.activity.duration}</h3>
              <h3>{this.state.activity.difficulty}</h3>
            </div>
            <p>{this.state.activity.description}</p>
            <div>
              <h2>Les grandes étapes (images)</h2>
            </div>
            <h2>Le matériel nécessaire</h2>
            <div>
              <ul>
                {materials.map((value, index) => {
                  return <li key={index}>{value}</li>;
                })}
              </ul>
            </div>
            <Link to={`/activities/${this.state.activity._id}/steps`}>
              <button type="button" onClick={this.handleSubmit}>
                Je tente !
              </button>{" "}
            </Link>
          </div>
        </div>
      )
    );
  }
}

export default OneActivity;
