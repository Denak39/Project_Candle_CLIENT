import React from "react";
import { withUser } from "./Auth/withUser";
import dayjs from "dayjs";
import apiHandler from "../api/apiHandler";

// import PopUp from "../components/PopUp";
const today = dayjs().format("YYYY-MM-DD");

function Mood() {
  const [mood, setMood] = React.useState([]);

  const handleClick = (event) => {
    setMood(mood.push({ mood: event.currentTarget.value, date: today }));
    apiHandler
      .updateUser2(mood)
      .then((data) => {
        // this.context.setUser(data);
        // this.props.history.push("");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
    apiHandler.getOneUser().then((data) => {});
  };

  return (
    <div>
      {mood.length === 0 && (
        <div>
          <h3>Comment ça va aujourd'hui ?</h3>
          <div>
            <label htmlFor="Stressé(e)">
              <input
                className="form-control"
                id="mood"
                name="mood"
                type="radio"
                placeholder="Stressé(e)"
                value="Stressé(e)"
                onChange={handleClick}
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
                onChange={handleClick}
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
                onChange={handleClick}
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
                onChange={handleClick}
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
                onChange={handleClick}
              />
              <img src="" alt="Motivé(e)" />
            </label>
            {/* <PopUp /> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default withUser(Mood);
