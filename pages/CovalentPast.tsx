import React,{useEffect} from 'react'

function Covalent() {

    let [portfolioValue, setPortfolioValue] = React.useState({});
    let [portfolioValueUSDPast, setPortfolioValueUSDPast] = React.useState([]);  
    let [loading, setLoading] = React.useState(true);
    let portfolio=[];
    let portfoliocopy=[];
    // console.log(portfolioValue.data.items[0].holdings.length)
    useEffect(() => { 
         getMeta("80001","0xd8a8dd0177e0b4645ba92ab6a3e6ffbb0e18a17b")
        .then((response) => response.json())
        .then((json) => {
            setPortfolioValue(json);
        }).then(()=>{
            setLoading(false);
            console.log(loading)
            console.log(portfolioValue)
        })
        !loading && portfolioValue.data.items.map((item:any,index)=>{
            if (index==0){
            item.holdings.map((items:any)=>{
                portfolio.push(0)
            })
        }
        portfoliocopy=portfolio;
        })
        console.log(portfolio)
        // for (let i = 0; i < portfolioValue.data.items[0].holdings.length; i++) {
        //     // console.log(portfolio)
        //     portfolio.push(0)
        // }
    
        !loading && portfolioValue.data.items.map((item) => {
            item.holdings.map((itemHoldings, index) => {
                // console.log(item.close.balance,item.close.quote)
                // console.log(itemHoldings.close.balance*itemHoldings.close.quote/1e18)
                portfolio[index] += itemHoldings.close.balance*itemHoldings.close.quote/1e18
        
        })})
        // // console.log(portfolio)
        setPortfolioValueUSDPast(portfolio)
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
    }, [loading]);
  
  return (
    <div className="relative h-screen overflow-hidden  bg-no-repeat	bg-fixed">
      <div className="flex p-10 border mt-[100px] mx-[400px] flex-1 flex-col">
        {portfolioValueUSDPast.map((item, index) => {
            return (
                <div className='flex-1'>
                    <p>{index} -> {item}</p>
                </div>
        
        )})}
      </div>
    </div>
  )
}

const getMeta =async (
    chainId: any, 
    walletAddress: any,
    // contract_address:any,
    // token_id:any,
    // usdc_contract_address:any,
    // ppg_contract_address:any,
    ) => {
        // console.log("getMeta")
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
        // console.log("url",url);

        let jsonReturn = await fetch(url, requestOptions)

        // fetch(url, requestOptions)
        // .then(response => response.text())
        // .then(result => console.log(result))
        // .catch(error => console.log('error', error));

        return jsonReturn;

}
export default Covalent;