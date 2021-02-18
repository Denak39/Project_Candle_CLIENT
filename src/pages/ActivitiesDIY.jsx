import React from "react";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import NavMain from "../components/NavMain";

class Activities extends React.Component {
  static contextType = UserContext;
  state = {
    activities: [],
    filter: "Tout",
  };

  handlefilter(option) {
    this.setState({ filter: option });
  }

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
      console.log(this.state.activities[0].subcategories);
    });
  }
  // get the category from the path
  // filter by category
  // display the lessons
  render() {
    const filterOptions = [
      "Tout",
      ...new Set(
        this.state.activities.map((activity) => activity.subcategories)
      ),
    ];
    return (
      <div>
        <NavMain />
        <h1>Do It Yourself</h1>
        <div id="filter-bar">
          {filterOptions.map((option, index) => {
            return (
              <div key={index}>
                <button
                  onClick={() => this.handlefilter(option)}
                  value={option}
                >
                  {option}
                </button>
              </div>
            );
          })}
        </div>
        {this.state.filter === "Tout" &&
          this.state.activities.map((activity) => {
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
        {this.state.filter !== "Tout" &&
          this.state.activities
            .filter((activity) => activity.subcategories === this.state.filter)
            .map((activity) => {
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
