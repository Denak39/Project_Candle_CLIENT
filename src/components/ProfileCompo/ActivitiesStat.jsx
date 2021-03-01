import React, { Component } from "react";
import DoughnutChart from "../ProfileCompo/Doughnut";
import apiHandler from "../../api/apiHandler";

export default class ActivitiesStat extends Component {
  state = {
    user: "",
    activities: [""],
  };

  componentDidMount() {
    apiHandler.getAllActivities().then((data) => {
      this.setState({ activities: data });
      console.log("activities", this.state.activities);
    });
    apiHandler.getOneUser().then((data) => {
      this.setState({ user: data });
      console.log("user", this.state.user);
    });
  }

  render() {
    const findCompleted = () => {
      if (!this.state.user) {
        return null;
      } else {
        return this.state.user.userActivities
          .filter((activity) => activity.completed === true)
          .map((activity) => activity._id);
      }
    };
    const activityCompleted = findCompleted();
    console.log("activityCompleted", activityCompleted);

    const findDetails = () => {
      if (!activityCompleted) {
        return null;
      } else {
        return this.state.activities.filter((activity) =>
          activityCompleted.includes(activity._id)
        );
      }
    };

    const activityCompletedDetails = findDetails();
    console.log("activityCompletedDetails", activityCompletedDetails);

    const calculateTime = () => {
      if (!activityCompletedDetails || activityCompletedDetails.length === 0) {
        return null;
      } else {
        return activityCompletedDetails
          .map((activity) => activity.duration)
          .reduce((acc, cur) => Number(acc) + Number(cur));
      }
    };

    const relaxTime = calculateTime();
    console.log("relaxTime", relaxTime);

    return (
      <div>
        <h1>Vos statistiques</h1>
        {activityCompleted && (
          <div>
            <div>
              {relaxTime ? <p>{relaxTime} min</p> : <p>0 min</p>}
              <p>passée(s) à se relaxer</p>
            </div>
            <div>
              {activityCompleted && <p> {activityCompleted.length}</p>}
              <p>activité(s) complétée(s)</p>
            </div>
          </div>
        )}
        <div>
          <h2>Vos activités réalisées</h2>
          <DoughnutChart activityCompletedDetails={activityCompletedDetails} />
        </div>
      </div>
    );
  }
}
