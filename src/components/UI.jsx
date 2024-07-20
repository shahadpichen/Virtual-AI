import { useRef } from "react";
import { useChat } from "../hooks/useChat";
import Chatbot from "./Chat";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Highcharts3D from "highcharts/highcharts-3d";
if (typeof Highcharts === "object") {
  Highcharts3D(Highcharts);
}

export const UI = ({ hidden }) => {
  const input = useRef();
  const { cameraZoomed, setCameraZoomed } = useChat();

  if (hidden) {
    return null;
  }

  const options = {
    chart: {
      backgroundColor: "transparent",
      type: "column",
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        viewDistance: 25,
        depth: 40,
      },
    },
    title: {
      text: "Chat Queries in the Last 20 Days",
      align: "center",
    },
    xAxis: {
      labels: {
        skew3d: true,
        style: {
          fontSize: "16px",
        },
      },
      categories: [
        "2024-07-10",
        "2024-07-11",
        "2024-07-12",
        "2024-07-13",
        "2024-07-14",
        "2024-07-15",
        "2024-07-16",
        "2024-07-17",
        "2024-07-18",
        "2024-07-19",
        "2024-07-20",
      ],
    },
    yAxis: {
      allowDecimals: false,
      min: 0,
      title: {
        text: "Number of Queries",
        skew3d: true,
        style: {
          fontSize: "16px",
        },
      },
    },
    tooltip: {
      headerFormat: "<b>{point.key}</b><br>",
      pointFormat:
        '<span style="color:{series.color}">\u25CF</span> ' +
        "{series.name}: {point.y} queries",
    },
    plotOptions: {
      series: {
        pointStart: 1,
      },
      column: {
        stacking: "normal",
        depth: 40,
      },
    },
    series: [
      {
        name: "Chat Queries",
        data: [250, 160, 200, 220, 170, 240, 210, 260, 230, 250],
        stack: "Chat Data",
      },
    ],
  };

  // const options = {
  //   chart: {
  //     type: "column",
  //     options3d: {
  //       enabled: true,
  //       alpha: 15,
  //       beta: 35,
  //       depth: 70,
  //     },
  //   },
  //   title: {
  //     text: "Chat Queries ",
  //     align: "left",
  //   },

  //   plotOptions: {
  //     column: {
  //       depth: 12,
  //     },
  //   },
  //   xAxis: {
  //     type: "category",

  //     categories: [
  //       "2024-07-10",
  //       "2024-07-11",
  //       "2024-07-12",
  //       "2024-07-13",
  //       "2024-07-14",
  //       "2024-07-15",
  //       "2024-07-16",
  //       "2024-07-17",
  //       "2024-07-18",
  //       "2024-07-19",
  //       "2024-07-20",
  //     ],
  //   },
  //   yAxis: {
  //     title: {
  //       text: "Number of Queries",
  //       margin: 5,
  //     },
  //   },

  //   series: [
  //     {
  //       name: "Chat Queries",
  //       data: [250, 160, 200, 220, 170, 240, 210, 260, 230, 250],
  //     },
  //   ],
  // };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
          <h1 className="font-black text-xl">Virtual Assistant</h1>
          <p>Your always-on companion</p>
        </div>
        <div className="w-full flex flex-col items-end gap-4">
          <button
            onClick={() => setCameraZoomed(!cameraZoomed)}
            className="hidden md:flex fixed top-4 right-[50%] pointer-events-auto  bg-[#1e3048] hover:bg-[#2d486c] text-white p-3 rounded-full"
          >
            {cameraZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="hidden lg:flex fixed top-[0vh] right-2 w-[25%]">
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        <div className="flex pointer-events-auto w-[97vw] justify-center md:justify-end">
          <Chatbot />
        </div>
      </div>
    </>
  );
};
