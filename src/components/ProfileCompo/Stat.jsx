import React from "react";
import LineChart from "../ProfileCompo/Chart";

export default function Stat(props) {
  return (
    <div>
      <h1>Display statistiques</h1>
      <LineChart mood={props} />
    </div>
  );
}
