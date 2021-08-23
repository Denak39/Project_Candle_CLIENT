import React from "react";
import { Line } from "react-chartjs-2";

export default function LineChart(props) {
  const labelsDate = props.mood.mood.map((mood) => mood.date);
  const labelsMood = props.mood.mood.map((mood) => mood.mood);
  const convertMood = [
    "Stressé(e)",
    "Fatigué(e)",
    "Ennuyé(e)",
    "Joyeux(se)",
    "Motivé(e)",
  ];
  const convert = labelsMood.map((mood) => convertMood.indexOf(mood));

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  const data = {
    labels: labelsDate,
    datasets: [
      {
        label: "# of Votes",
        data: convert,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  return (
    <>
      <div className="header">
        <h1 className="title">Line Chart</h1>
        <div className="links"></div>
      </div>
      <Line data={data} options={options} />
    </>
  );
}

// export default LineChart;
