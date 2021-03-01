// import React from "react";
// import { Doughnut } from "@reactchartjs/react-chart.js";

// const data = {
//   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         "rgba(255, 99, 132, 0.2)",
//         "rgba(54, 162, 235, 0.2)",
//         "rgba(255, 206, 86, 0.2)",
//         "rgba(75, 192, 192, 0.2)",
//         "rgba(153, 102, 255, 0.2)",
//         "rgba(255, 159, 64, 0.2)",
//       ],
//       borderColor: [
//         "rgba(255, 99, 132, 1)",
//         "rgba(54, 162, 235, 1)",
//         "rgba(255, 206, 86, 1)",
//         "rgba(75, 192, 192, 1)",
//         "rgba(153, 102, 255, 1)",
//         "rgba(255, 159, 64, 1)",
//       ],
//       borderWidth: 1,
//     },
//   ],
// };

// const DoughnutChart = () => (
//   <>
//     <Doughnut data={data} />
//   </>
// );

// export default DoughnutChart;

///

import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function DoughnutChart(props) {
  const activityCompletedDetails = props.activityCompletedDetails;
  const findSubcategories = () => {
    if (activityCompletedDetails !== null) {
      return [
        ...new Set(
          activityCompletedDetails.map((activity) => activity.subcategories)
        ),
      ];
    } else {
      return null;
    }
  };
  const subcategories = findSubcategories();
  console.log("activityCompletedDetails", activityCompletedDetails);
  console.log("subcategories", subcategories);

  function countOccurences() {
    var result = {};
    if (activityCompletedDetails !== null) {
      activityCompletedDetails
        .map((activity) => activity.subcategories)
        .forEach(function (elem) {
          if (elem in result) {
            result[elem] = ++result[elem];
          } else {
            result[elem] = 1;
          }
        });
      return [Object.keys(result), Object.values(result)];
    } else {
      return [[], []];
    }
  }

  const numberActivities = countOccurences();
  console.log("numberActivities", numberActivities);

  const data = {
    labels: numberActivities[0],
    datasets: [
      {
        label: "# of Votes",
        data: numberActivities[1],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Doughnut data={data} />
    </>
  );
}

// export default LineChart;
