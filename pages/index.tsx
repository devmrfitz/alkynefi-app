// @ts-nocheck
import React, {useEffect, useContext, useState, useRef}  from 'react'
import ProfileInfo from '../components/ProfileInfo'
import AssetInfo from '../components/AssetInfo'
import {useRouter} from 'next/router'
import CurrentValue from '../components/CurrentValue'
import Graph from '../components/Graph'
import axios from 'axios'
import Image from 'next/image'
import {GetMeanSubPrice,Signup,GetAlkyneWalletAddress} from '../utils/Functions'
import {AuthContext,AuthContextProps} from "../context/AuthContext";
//@ts-ignore

function Home() {


  const [profilePic,setProfilePic] = useState<any>('https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png')
  const [ipfsURI,setIpfsURI] = useState<any>('')
  const [file,setFile] = useState();
  const imageUploader = useRef<HTMLInputElement | undefined>();
  const [userHandle,setUserHandle] = useState('Username')
  const [input,isInput] = useState(false)
  const [save,isSaved] = useState(false)
  const [maxAmount,setMaxAmount] = useState('0');
  const [meanSubInvstmt,setMeanSubInvstmt] = useState('0');
  const [capital,setCapital] = useState('0');
  const {account, chainId, disconnect,getProvider} = useContext<AuthContextProps>(AuthContext);
  let [loading, setLoading] = React.useState(true);
  let [portfolioValue, setPortfolioValue] = React.useState([{}]);
  let [portfolioValueUSD, setPortfolioValueUSD] = React.useState(0);
  let value=0;



  const router = useRouter();

  useEffect(() =>{
    console.log(account)
    if (account===""){
      router.push('/BlurHome')
  }
      const getMean = async() => {
        const val = await GetMeanSubPrice(getProvider);
        console.log(val);
        setMeanSubInvstmt(val);
      }
    getMeta("80001","0xE4B797E4F099E7293B7DB057bc3B28BFfE949736")
    .then((response) => response.json())
    .then((json) => {
      setPortfolioValue(json.data.items);
    }).then(()=>{
      setLoading(false);
    });
    !loading && portfolioValue.map((item:any)=>{
      console.log(item.quote_rate*item.balance/1e18);
      // console.log(portfolioValueUSD);
      value+= item.quote_rate*item.balance/1e18;    
      setCapital(Math.round(value*100)/100);
    });
  }, [loading]);
      // getMean()
      //get save
 


  const uploadProfilePic = async (e:any) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setProfilePic(reader.result)
    }
    reader.readAsDataURL(file);
    console.log("this file", file);
    const res = await axios.post('https://api.web3.storage/upload',file, {
        headers: {
            Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEUzMTA5MTQ3NzhFNjZFODI2OWM0ZDY4QjdjODRGQjA0MGI4MmY4N2IiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA0MDY5NDA5MDYsIm5hbWUiOiJ0ZXN0In0.JpiiZaMyBl4MttJOsXbzXO4iHIl-xh5-hhPpCvBjLqA`,
        },
     });
     console.log(`https://ipfs.io/ipfs/${res.data.cid}`)
     setProfilePic(`https://ipfs.io/ipfs/${res.data.cid}`)
     setIpfsURI(`https://ipfs.io/ipfs/${res.data.cid}`)
     console.log('set hogyi uri')
  }

  const getENScid = async () => {
    const blob = new File([`<!doctype html>
    <html lang="en" dir="ltr">
    <head>
    <title>ens-redirect</title>
    <meta charset="utf-8">
    
    <meta  http-equiv="Content-Type" content="text/html;charset=UTF-8">
    
    
    </head>
    <body>
    <script>location.replace("https://alkynefi.vercel.app/go/${userHandle}")</script>
    
    </body>
    </html>`], { type: "text/html" });
    const result = await axios.post('https://api.web3.storage/upload',blob, {
        headers: {
            Authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEUzMTA5MTQ3NzhFNjZFODI2OWM0ZDY4QjdjODRGQjA0MGI4MmY4N2IiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjA0MDY5NDA5MDYsIm5hbWUiOiJ0ZXN0In0.JpiiZaMyBl4MttJOsXbzXO4iHIl-xh5-hhPpCvBjLqA`,
        },
    });
    return result.data.cid
  }

  const saveData = async () => {
    let userAddress=account
    const result = await GetAlkyneWalletAddress(getProvider,userHandle,userAddress)
    isSaved(true)
    c
    
    onsole.log(res);
    console.log(result);
  }



  return (
    <div className="relative h-[150vh] overflow-hidden bg-background bg-cover bg-no-repeat	bg-fixed flex flex-col items-end  pt-[10%] pr-[20%]">

      <label className='flex flex-col justify-center items-center glassCircle w-[10rem] h-[10rem] absolute left-[20%]'>
          <div className="relative overflow-hidden rounded-md" >
              <img  className='w-[10vw] h-[10vw] rounded-full' 
                    src={profilePic}/>
          </div>
          {!save&&<input  ref={imageUploader} 
                          type="file" 
                          onChange={uploadProfilePic} 
                          className="hidden"/> }
      </label>

      {!save&&<button className="bg-secondary p-3 rounded-lg absolute left-[22%] top-[28%]" 
                  onClick={saveData}>
                  Save Data
      </button>}

      <ProfileInfo name={userHandle} 
                   setname={setUserHandle}
                   save={save}
                   capital={capital}/>

      <div className ='font-[900] text-[2rem] leading-[2rem] text-textSecondary opacity-[80%] flex mt-5'>
            {input?

            <input  type={'number'}
            className='max-w-[26rem] h-[3rem] p-2 border rounded-md'
            value={maxAmount}
            onChange={(e)=>setMaxAmount(e.target.value)}/>:
            
            <h1>${maxAmount}</h1>}

            {!save&&<button onClick={()=>isInput(p=>!p)} className='ml-5'>
                {input?
                <Image src={'/tick.svg'} alt='edit' width={20} height={20}/>:
                <Image src={'/edit.svg'} alt='edit' width={20} height={20}/>}
            </button>}
      </div>
      <p className='font-[200]'>Maximum Subscriber Value</p>


      <AssetInfo chainId={chainId} address={account}/>
      <h2 className='relative z-0 mb-[-2.5rem] leading-[5rem] text-[#974f83] opacity-75 font-[900] text-[7.75rem]'>Current Value</h2>
      <CurrentValue meanSubInvstmt={meanSubInvstmt} 
                    capital={capital}/>

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
    console.log('getMeta called')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic Y2tleV81ZjFjOThmYWQxYjU0MmFjOTUyMzhkZTI2MDg6");

    let requestOptions = {
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

    let jsonReturn = await fetch(url, {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
})

// fetch(url, requestOptions)
// .then(response => response.text())
// .then(result => console.log(result))
// .catch(error => console.log('error', error));

return jsonReturn;

}

export default Home