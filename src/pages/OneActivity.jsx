import React from "react";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";

class OneActivity extends React.Component {
  static contextType = UserContext;
  state = {
    activity: null,
  };

  componentDidMount() {
    const activityId = this.props.match.params.id;
    apiHandler.getOneActivity(activityId).then((activity) => {
      console.log(activity);
      this.setState({ activity });
    });
  }
  // get the category from the path
  // filter by category
  // display the lessons
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
          <Link to={`/activities/${this.state.activity.steps[0]}`}>
            <button>Je tente !</button>{" "}
          </Link>
        </div>
      )
    );
  }
}

export default OneActivity;
