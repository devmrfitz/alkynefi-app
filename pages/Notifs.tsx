import React,{useContext,useState,useEffect} from 'react'
import { AuthContext,AuthContextProps } from '../context/AuthContext'
import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";
import Notification from '../components/Notification'

function Notif() {

  const [notifications,setNotifications] = useState([])
  const{account,chainId} = useContext<AuthContextProps>(AuthContext)

  const reciveResponse = async () => {
    const notifications = await PushAPI.user.getFeeds({
      user: 'eip155:'+chainId+':'+account,
      env: 'staging'
    });
    setNotifications(notifications)
    console.log(notifications)
  }
    
  return (
    <div className="relative h-[150vh] overflow-hidden bg-background bg-no-repeat	bg-fixed flex flex-col items-center  pt-[10%]">

      <h2 className="font-[900] text-[4rem] leading-[6rem] text-textSecondary opacity-[80%]">Your Notifications</h2>
      <p className="my-5 font-[200]">Provided by push protocol</p>
      {account?<button className="bg-secondary p-3 rounded-lg " onClick={reciveResponse}>
        refresh</button>:<p>Please login to continue</p>}
      {notifications&&account?
      notifications.map((item:any, index:number)=>(
        <Notification title={item.title}
                        key={index}
                        message={item.message}/>
      ))
      :'Create a push channel to continue'}
    </div>
  )
}

export default Notif