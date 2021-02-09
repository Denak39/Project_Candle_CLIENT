import React from "react";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";
import { Link } from "react-router-dom";

class Activities extends React.Component {
  static contextType = UserContext;
  state = {
    activities: [],
  };

  componentDidMount() {
    apiHandler.getAllActivities().then((data) => {
      var filteredActivities = data.filter((activity) => {
        if (activity.categories === "DIY") {
          return true;
        } else {
          return false;
        }
      });

      this.setState({ activities: filteredActivities });
      console.log(this.state.activities);
    });
  }
  // get the category from the path
  // filter by category
  // display the lessons
  render() {
    return (
      <div>
        {this.state.activities.map((activity) => {
          return (
            <div className="box">
              <div className="banner">
                <div className="p" key={activity._id}>
                  <Link to={`/activities/${activity._id}`}>
                    <h1>{activity.title}</h1>
                    <h2>{activity.subcategories}</h2>
                    <p>{activity.duration}</p>
                    <p>{activity.difficulty} </p>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Activities;
