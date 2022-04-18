import { Grid, Typography } from "@mui/material";
import { NextPage } from "next";
import { SideBar } from "src/client/layouts/SideBar.layout";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const WebUsageTrackerPage: NextPage = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  let labels;
  //let totalTime; total time spent. we will likely never see this feature implemented
  const time = [];

  if (typeof window !== "undefined") {
    //avoid undefined errors
    const r = localStorage.getItem("websitetracker");
    if (r == undefined) {
      return (
        <SideBar>
          <Typography>
            Please install the Chrome Extension to access this feature and
            retry. https://github.com/devaineas/zero-to-chad-chrome-extension
          </Typography>
        </SideBar>
      );
    } else {
      const extData = JSON.parse(r);

      labels = Object.keys(extData);
      //console.log(Object.keys(extData));

      const xt = Object.entries(extData);
      for (let i = 0; i < xt.length; i++) {
        if (extData[labels[i]]["total_time"] / 60 > 1) {
          time.push(Math.round(extData[labels[i]]["total_time"] / 60));
        } else {
          time.push(extData[labels[i]]["total_time"] / 60);
        }
      }
    }
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Minutes spent",
        data: time,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <SideBar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Bar
          data={data}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Websites",
              },
              legend: {
                display: true,
                position: "bottom",
              },
            },
          }}
        />
      </Grid>
    </SideBar>
  );
};

export default WebUsageTrackerPage;
