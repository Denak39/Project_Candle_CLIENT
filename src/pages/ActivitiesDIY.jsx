import React from "react";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";
import Footer from "../components/Footer";
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
            <div className="activities" key={activity._id}>
              <Link to={`/activities/${activity._id}`}>
                <div className="activities-image">
                  <img src={activity.image} alt={activity.title} />
                </div>
                <div className="activities-content">
                  <h1>{activity.title}</h1>
                  <h2>{activity.subcategories}</h2>
                  <p>{activity.duration} min</p>
                  <p>{activity.difficulty}</p>
                </div>
              </Link>
            </div>
          );
        })}
        <Footer />
      </div>
    );
  }
}

export default Activities;
