import React from 'react'
import Image from 'next/image'
import Chart from "chart.js";

function AssetInfo() {
  React.useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: "#0070FF",
            borderColor: "#0070FF",
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        label: false,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          // intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: false,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: false,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, []);
  return (
    <div className="divBackground  flex justify-evenly w-[75%] h-[23%] my-10 font-[700]  text-[2.5rem] leading-[2.5rem] items-center text-textMain ">
      <div className='w-[20%] h-[70%] flex flex-col justify-between items-start'>
        <div>
          <Image src="/coin.png" width={100} height={100} alt="coin"/>
        </div>   
        <h2 className="opacity-70">BNB</h2>
      </div>

      <div className='w-[30%] h-[70%] flex flex-col opacity-70 justify-between items-start'>
        <h2>Primary Invested Asset</h2>
        <h2 className='text-[#A6F2A5]'>+1.77%</h2>
      </div>

      <div className='w-[30%] justify-end items-end '>
            <canvas id="line-chart"></canvas>
      </div>
    </div>
  )
}

export default AssetInfo