// @ts-nocheck
import React,{useEffect} from 'react'
import Image from 'next/image'
import Chart from "chart.js";

function AssetInfo({address,chainId}:any) {
  let [portfolioValue, setPortfolioValue] = React.useState({});
  let [portfolioValueUSDPast, setPortfolioValueUSDPast] = React.useState([]);  
  let [loading, setLoading] = React.useState(true);
  let portfolio=[];
  let portfoliocopy=[];

  let [highestInvestment, setHighestInvestment] = React.useState("");
  let [logo, setLogo] = React.useState("");
  let [increaseValue, setIncreaseValue] = React.useState(0);
  useEffect(() => { 
    portfolio=[];
    portfoliocopy=[];
    getHighestInvestment("80001","0xd8a8dd0177e0b4645ba92ab6a3e6ffbb0e18a17b")
    // getHighestInvestment("1","0xab5801a7d398351b8be11c439e05c5b3259aec9b")
    .then(response => response.json())
    .then(result => {
      console.log("ether"+result.data.items[0].contract_name);
      setHighestInvestment(result.data.items[0].contract_ticker_symbol);
      setLogo(result.data.items[0].logo_url);
      setIncreaseValue((result.data.items[0].quote_rate-result.data.items[0].quote_rate_24h)/result.data.items[0].quote_rate_24h*100);
    })

    

    getMeta("80001","0xd8a8dd0177e0b4645ba92ab6a3e6ffbb0e18a17b")
   .then((response) => response.json())
   .then((json) => {
       setPortfolioValue(json);
   }).then(()=>{
       setLoading(false);
   })
   !loading && portfolioValue.data.items.map((item:any,index)=>{
       if (index==0){
       item.holdings.map((items:any)=>{
           portfolio.push(0)
       })
   }
   })
   !loading && portfolioValue.data.items.map((item) => {
       item.holdings.map((itemHoldings, index) => {
           portfolio[index] += itemHoldings.close.balance*itemHoldings.close.quote/1e18
   
   })})
   setPortfolioValueUSDPast(portfolio)
   portfolio.map((item,index)=>{
    portfoliocopy.push(index+1)
   });
   var config = {
       type: "line",
       data: {
         labels: portfoliocopy,
         datasets: [
           {
             label: new Date().getFullYear(),
             backgroundColor: "#0070FF",
             borderColor: "#0070FF",
             data: portfolio,
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
    //  console.log(portfoliocopy)
}, [loading]);
  return (
    <div className="divBackground  flex justify-evenly w-[75%] h-[23%] my-10 font-[700]  text-[2.5rem] leading-[2.5rem] items-center text-textMain ">
      <div className='w-[20%] h-[70%] flex flex-col justify-between items-start'>
        <div className=''>
          <Image src={logo} width={150} height={150} alt="coin"/>
        </div>   
        <h2 className="opacity-70 text-center pl-5">{highestInvestment}</h2>
      </div>

      <div className='w-[30%] h-[70%] flex flex-col opacity-70 justify-between items-start'>
        <h2>Primary Invested Asset</h2>
        {/* <h2 className='text-[#A6F2A5]'>+1.77%</h2> */}
        <h2 className='text-[#A6F2A5]'>+{Math.round(increaseValue*100)/100}%</h2>
      </div>

      <div className='w-[30%] justify-end items-end '>
            <canvas id="line-chart"></canvas>
            <p className='text-xs text-center'>Days</p>
      </div>
    </div>
  )
}
const getMeta =async (
  chainId: any, 
  walletAddress: any,
  ) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic Y2tleV81ZjFjOThmYWQxYjU0MmFjOTUyMzhkZTI2MDg6");

      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };

      var url = "https://api.covalenthq.com/v1/{{chain_id}}/address/{{wallet_address}}/portfolio_v2/";;
      url = url.replace("{{chain_id}}", chainId);
      url = url.replace("{{wallet_address}}", walletAddress);;

      let jsonReturn = await fetch(url, requestOptions)
      return jsonReturn;

}


const getHighestInvestment = async(
  chainId: any,
  walletAddress: any,
) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic Y2tleV81ZjFjOThmYWQxYjU0MmFjOTUyMzhkZTI2MDg6");
      
      var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
      };

      var url = "https://api.covalenthq.com/v1/{{chain_id}}/address/{{wallet_address}}/balances_v2/"
      url = url.replace("{{chain_id}}", chainId);
      url = url.replace("{{wallet_address}}", walletAddress);;
      let jsonReturn = await fetch(url, requestOptions)
      
      return jsonReturn;

}
export default AssetInfo