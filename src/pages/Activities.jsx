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
    //console.log(lesson);
    return (
      <div>
        {this.state.activities.map((activity) => {
          return (
            <div className="box">
              <div className="banner">
                <div className="p" key={activity._id}>
                  <Link to={`/activity/${activity._id}`}>
                    <h1>Lesson title: {activity.title}</h1>
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
