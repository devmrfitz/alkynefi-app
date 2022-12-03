import React,{useEffect} from 'react'
function Covalent() {
  // getMeta("80001","0xa3402ffc115cea35f0348b4abcc7532aed59b03f");;
  let [portfolioValue, setPortfolioValue] = React.useState([{}]);
  let [portfolioValueUSD, setPortfolioValueUSD] = React.useState(0);
  let [loading, setLoading] = React.useState(true);
  let value=0;
  useEffect(() => {
    setPortfolioValueUSD(0);
    getMeta("80001","0xE4B797E4F099E7293B7DB057bc3B28BFfE949736")
    .then((response) => response.json())
    .then((json) => {
      setPortfolioValue(json.data.items);
    }).then(()=>{
      setLoading(false);
    });
    !loading && portfolioValue.map((item:any)=>{
      console.log(item.quote_rate*item.balance/1e18);
      console.log(portfolioValueUSD);
      value+= item.quote_rate*item.balance/1e18;    
      setPortfolioValueUSD(value);
    });
  }, [loading]);
  
  
  return (
    <div className="relative h-screen overflow-hidden  bg-no-repeat	bg-fixed">
      <div className="flex p-10 border mt-[100px] mx-[400px]">
        
          <p className="text-2xl font-bold">
          Portfolio Value: {portfolioValueUSD} USD

          </p>
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
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic Y2tleV81ZjFjOThmYWQxYjU0MmFjOTUyMzhkZTI2MDg6");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  var url = "https://api.covalenthq.com/v1/{{chain_id}}/address/{{wallet_address}}/portfolio_v2/";;
  url = "https://api.covalenthq.com/v1/{{chain_id}}/address/{{wallet_address}}/balances_v2/"
  var erc20 = "https://api.covalenthq.com/v1/{{chain_id}}/address/{{wallet_address}}/transfers_v2/?contract-address={{usdc_contract_address}}"
  var erc721 = "https://api.covalenthq.com/v1/{{chain_id}}/tokens/{{ppg_contract_address}}/nft_metadata/{{token_id}}/"
  url = url.replace("{{chain_id}}", chainId);
  url = url.replace("{{wallet_address}}", walletAddress);;
  console.log("urll",url);
  console.log("requestOptions");

  let jsonReturn = await fetch(url, requestOptions)

  // fetch(url, requestOptions)
  // .then(response => response.text())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));

  return jsonReturn;

}
export default Covalent;