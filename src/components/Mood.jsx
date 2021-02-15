import React, { Component } from "react";
import { withUser } from "./Auth/withUser";
import dayjs from "dayjs";
// import PopUp from "../components/PopUp";
const today = dayjs();

class Mood extends Component {
  state = {
    display: false,
    mood: "",
  };

  //   handlePopUp = () => {
  //     this.setState({ display: !this.state.display });
  //   };

  handleClick = (event) => {
    const { name, value } = event.target;
    const moodCopy = [...this.state.mood];

    const date1 = dayjs(today, "YYYY-MM-DD");

    moodCopy.push({ mood: value, date: date1 });
    console.log(moodCopy);

    this.setState({
      [name]: moodCopy,
    });
  };

  //   messageMood = () => {
  //     if (this.state.mood.length > 0) {
  //       return this.state.mood[0].mood;
  //     }
  //   };

  render() {
    return (
      <div>
        <div>
          <label htmlFor="Stressé(e)">
            <input
              className="form-control"
              id="mood"
              name="mood"
              type="radio"
              placeholder="Stressé(e)"
              value="Stressé(e)"
              onChange={this.handleClick}
            />
            <img src="" alt="Stressé(e)" />
          </label>
        </div>
        <div>
          <label htmlFor="Fatigué(e)">
            <input
              className="form-control"
              id="mood"
              name="mood"
              type="radio"
              placeholder="Fatigué(e)"
              value="Fatigué(e)"
              onChange={this.handleClick}
            />
            <img src="" alt="Fatigué(e)" />
          </label>
        </div>
        <div>
          <label htmlFor="Ennuyé(e)">
            <input
              className="form-control"
              id="mood"
              name="mood"
              type="radio"
              placeholder="Ennuyé(e)"
              value="Ennuyé(e)"
              onChange={this.handleClick}
            />
            <img src="" alt="Ennuyé(e)" />
          </label>
        </div>
        <div>
          <label htmlFor="Joyeux(se)">
            <input
              className="form-control"
              id="mood"
              name="mood"
              type="radio"
              placeholder="Joyeux(se)"
              value="Joyeux(se)"
              onChange={this.handleClick}
            />
            <img src="" alt="Joyeux(se)" />
          </label>
        </div>
        <div>
          <label htmlFor="Motivé(e)">
            <input
              className="form-control"
              id="mood"
              name="mood"
              type="radio"
              placeholder="Motivé(e)"
              value="Motivé(e)"
              onChange={this.handleClick}
            />
            <img src="" alt="Motivé(e)" />
          </label>
          {/* <PopUp /> */}
        </div>
      </div>
    );
  }
}

export default withUser(Mood);
