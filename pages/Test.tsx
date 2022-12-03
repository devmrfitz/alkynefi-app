// @ts-ignore
import React,{useContext,useState,useEffect} from 'react'
import { AuthContext,AuthContextProps } from '../context/AuthContext'
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

function Test() {
  const [address,setAddress] = useState<string>('')
  const [notification,setNotification] = useState<any>(null)
  const{account} = useContext<AuthContextProps>(AuthContext)

  const PK = ''
  const Pkey = `0x${PK}`;
  const signer = new ethers.Wallet(Pkey);

  const reciveResponse = async () => {
    const notifications = await PushAPI.user.getFeeds({
      user: 'eip155:5:0x6C59eC34920Eb91c408A31c871532859787eBFE8', // user address in CAIP
      env: 'staging'
    });
    console.log(notifications)
    setNotification(notifications)
  }

  const sendNotification = async() => {
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, // target
        identityType: 2, // direct payload
        notification: {
          title: `sending notif:`,
          body: `hi bro`
        },
        payload: {
          title: `hi bro`,
          body: `Hello bro!!!`,
          cta: '',
          img: ''
        },
        recipients: 'eip155:5:0x6C59eC34920Eb91c408A31c871532859787eBFE8', // recipient address
        channel: 'eip155:5:0x6C59eC34920Eb91c408A31c871532859787eBFE8', // your channel address
        env: 'staging'
      });
      
      // apiResponse?.status === 204, if sent successfully!
      console.log('API repsonse: ', apiResponse);
    } catch (err) {
      console.error('Error: ', err);
    }
  }


  return (
    <div className="relative h-screen overflow-hidden flex flex-col items-center justify-center  bg-no-repeat	bg-fixed px-52">
      <p>from: {account}</p>
      <input value={address} onChange={(e)=>setAddress(e.target.value)} placeholder="to: " className="my-10"/>
      <button className="bg-secondary p-3 rounded-lg " onClick={sendNotification}>send notif</button>

      <p className="my-10">Your Notification</p>
      <button className="bg-secondary p-3 rounded-lg " onClick={reciveResponse}>rcv notif</button>
      <div>{notification}</div>
    </div>
  )
}


export default Test