import React from 'react'

import GuildListItem from '../components/GuildListItem'
function Covalent() {
  getMeta("80001","0xd8a8DD0177e0B4645bA92ab6A3e6ffbB0e18A17b");;
  return (
    <div className="relative h-screen overflow-hidden  bg-no-repeat	bg-fixed">
      <div className="flex p-10 border mt-[100px] mx-[400px]">

      </div>
    </div>
  )
}

const getMeta =async (
          chainId: any, 
          walletAddress: any,
          contract_address:any,
          token_id:any,
          usdc_contract_address:any,
          ppg_contract_address:any,
           ) => {
  var myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic Y2tleV81ZjFjOThmYWQxYjU0MmFjOTUyMzhkZTI2MDg6");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  var url = "https://api.covalenthq.com/v1/{{chain_id}}/address/{{wallet_address}}/portfolio_v2/";;
  var erc20 = "https://api.covalenthq.com/v1/{{chain_id}}/address/{{wallet_address}}/transfers_v2/?contract-address={{usdc_contract_address}}"
  var erc721 = "https://api.covalenthq.com/v1/{{chain_id}}/tokens/{{ppg_contract_address}}/nft_metadata/{{token_id}}/"
  url = url.replace("{{chain_id}}", chainId);
  url = url.replace("{{wallet_address}}", walletAddress);;
  console.log("url",url);
  fetch(url, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

}
export default Covalent;