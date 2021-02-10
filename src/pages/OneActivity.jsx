import React from "react";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";

class OneActivity extends React.Component {
  static contextType = UserContext;
  state = {
    activity: null,
    userActivities: null,
  };
  // populate?
  // this.context.user
  handleSubmit = (event) => {
    // event.preventDefault();
    const key = event.target.name;
    const value = event.target.value;
    const activityId = this.props.match.params.id;
    const useractivities = this.context.user.userActivities;
    const object = { _id: activityId, completed: false };
    this.setState({ [key]: value });

    apiHandler
      .updateUser(this.state)
      .then((data) => {
        console.log("activity id >>", activityId);
        console.log("useractivities>>", this.context.user.userActivities);
        console.log(useractivities.push(object));
        this.context.setUser(data);
        console.log(this.context.user);

        useractivities.push(object);
        // this.props.history.push("/profile");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };
  componentDidMount() {
    const activityId = this.props.match.params.id;
    apiHandler.getOneActivity(activityId).then((activity) => {
      console.log(activity);
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
            <button onClick={this.handleSubmit}>Je tente !</button>{" "}
          </Link>
        </div>
      )
    );
  }
}

export default OneActivity;
