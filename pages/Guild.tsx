// @ts-nocheck
import React, {useEffect, useContext, useState, useRef}  from 'react'
import ProfileInfo from '../components/ProfileInfo'
import AssetInfo from '../components/AssetInfo'
import {useRouter} from 'next/router'
import CurrentValue from '../components/CurrentValue'
import Graph from '../components/Graph'
import axios from 'axios'
import Image from 'next/image'
import {GetMeanSubPrice, StartFollowing} from '../utils/Functions'
import {AuthContext,AuthContextProps} from "../context/AuthContext";
//@ts-ignore

function Guild() {
  const [profilePic,setProfilePic] = useState<any>('https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png')
  const [userHandle,setUserHandle] = useState('Username')
  const [followers,setFollowers] = useState(0);
  const [maxAmount,setMaxAmount] = useState('0');
  const [meanSubInvstmt,setMeanSubInvstmt] = useState('0');
  const [capital,setCapital] = useState('0');
  const {account, connect, disconnect,getProvider} = useContext<AuthContextProps>(AuthContext);

  const router = useRouter();

  useEffect(() => {
    const getValues = async () =>{
      const meansub = await GetMeanSubPrice(getProvider);
      console.log(meansub);
      setCapital(meansub);

      const res = await GetFollowersArray(getProvider,userAddress)
      console.log(res.length)
      setFollowers(res.length)



    }
    // getValues()
  },[])

  const follow = async () =>{
    const res = await StartFollowing(getProvider,account,['']);
    router.push('https://staging.push.org/#/channels')
  }

  return (
    <div className="relative h-[150vh] overflow-hidden bg-background bg-cover bg-no-repeat	bg-fixed flex flex-col items-end  pt-[10%] pr-[20%]">

      <label className='flex flex-col justify-center items-center glassCircle w-[10rem] h-[10rem] absolute left-[20%]'>
          <div className="relative overflow-hidden rounded-md" >
              <img  className='w-[10vw] h-[10vw] rounded-full' 
                    src={profilePic}/>
          </div>
      </label>

      <button className="bg-secondary p-3 rounded-lg absolute left-[22%] top-[28%]" 
                  onClick={follow}>
                  Follow
      </button>

      <ProfileInfo name={userHandle} 
                   setname={setUserHandle}
                   save={true}
                   capital={capital}/>

      <div className ='font-[900] text-[2rem] leading-[2rem] text-textSecondary opacity-[80%] flex mt-5'>
            <h1>${maxAmount}</h1>
      </div>
      <p className='font-[200]'>Maximum Subscriber Value</p>


      <AssetInfo/>
      <h2 className='relative z-0 mb-[-2.5rem] leading-[5rem] text-[#974f83] opacity-75 font-[900] text-[7.75rem]'>Current Value</h2>
      <CurrentValue meanSubInvstmt={meanSubInvstmt} 
                    capital={capital}/>

    </div>
  )
}

export default Guild