import React from "react";
import UserContext from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";
import Step from "../components/Step";
import Final from "../components/Final";
import { Link } from "react-router-dom";

class StepbyStep extends React.Component {
  static contextType = UserContext;
  state = {
    display: true,
    activity: null,
  };

  handleFinal = () => {
    this.setState({ display: !this.state.display });
  };

  componentDidMount() {
    const activityId = this.props.match.params.id;
    apiHandler.getOneActivity(activityId).then((activity) => {
      console.log(activity);
      this.setState({ activity });
    });
  }

  render() {
    const activityId = this.props.match.params.id;
    if (this.state.activity === null) return null;
    console.log(this.state.activity);
    const steps = this.state.activity.steps;

    return (
      <div>
        {this.state.display && (
          <>
            <h1>{this.state.activity.title}</h1>
            <Step
              display={this.state.display}
              handleFinal={this.handleFinal}
              steps={steps}
            />
          </>
        )}

        {!this.state.display && (
          <Final activityId={activityId} display={!this.state.display} />
        )}
      </div>
    );
  }
}

export default StepbyStep;
