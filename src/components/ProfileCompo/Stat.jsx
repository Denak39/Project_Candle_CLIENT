import React from "react";
import LineChart from "../ProfileCompo/Chart";

import ActivitiesStat from "../ProfileCompo/ActivitiesStat";

export default function Stat(props) {
  return (
    <div>
      <h1>Display statistiques</h1>
      <LineChart mood={props} />
      <ActivitiesStat />
    </div>
  );
}
