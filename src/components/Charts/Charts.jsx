import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
);

export const LineChart = () => {
  const labels = ["abc", "def", "efg", "ghi"];
  const dataValue = [1, 2, 3, 4];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Line chart",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Views",
        data: dataValue,
        borderColor: "red",
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export const DoughnutChart = () => {
  const labels = ["abc", "def", "efg", "ghi"];
  const dataValue = [1, 2, 3, 4];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Tracker",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Views",
        data: dataValue,
        borderColor: "white",
        backgroundColor: ["yellow", "lightblue", "lightgreen", "pink"],
      },
    ],
  };

  return <Doughnut options={options} data={data} />;
};
