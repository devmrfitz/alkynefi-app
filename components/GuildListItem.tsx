import React, {useEffect, useContext, useState, useRef}  from 'react'
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {GetMeanSubPrice,StartFollowing,GetFollowersArray,GetProfileIdByUserName} from '../utils/Functions'
import {AuthContext,AuthContextProps} from "../context/AuthContext";


export type GuildListProps = {
  userAddress: string,
  rank: number,
}

function GuildListItem({userAddress,rank}:GuildListProps) {
  const {account, connect, disconnect,getProvider} = useContext<AuthContextProps>(AuthContext);
  const [name,setName] = useState('');
  const [isFollowed,setIsFollowed] = useState(false);
  const [followers,setFollowers] = useState(0);
  const [capital,setCapital] = useState(0);
  const router = useRouter();

  const follow = async () =>{
    // const res = await StartFollowing

    let x = GetProfileIdByUserName();
    const res = await StartFollowing(getProvider,account,[x],);
    
    router.push('https://staging.push.org/#/channels')


  }

  useEffect(() => {
    const getValues = async () =>{
      const meansub = await GetMeanSubPrice(getProvider);
      console.log(meansub);
      setCapital(meansub);

      const res = await GetFollowersArray(getProvider,userAddress)
      console.log(res.length)
      setFollowers(res.length)
    }
    getValues()
  },[])

  return (
    <div className="divBackground flex justify-around items-center mt-5">
      <div className="flex flex-col justify-center items-center  m-10">
            <Image src={'/User.png'} width={150} height={150} alt="alyne"/>            
            {isFollowed?
            <div className="bg-[#D1318C]  p-1 mt-1 active:bg-secondary hover:shadow-lg rounded-lg w-[80%]">
            Followed</div>:
            <button onClick={follow} 
            className="bg-[#D1318C]  p-1 mt-1 active:bg-secondary hover:shadow-lg rounded-lg w-[80%]">
              Follow
            </button>}
      </div>
      
      <div>
        <h1 className='font-[900] text-[4rem] leading-[6rem] text-textSecondary opacity-[80%]'>{name}</h1>

        <div className="flex justify-between font-[200] leading-[2.5rem]">
            <div className ='mx-5'>
                <h2 className ='font-[900] text-[3rem]  text-secondary opacity-[80%]'>
                {followers}</h2>
                <p>Followers</p>
            </div>
            <div className ='mx-5'>
                <h2 className ='font-[900] text-[3rem]  text-secondary opacity-[80%]'>
                ${capital}</h2>
                <p>Capital</p>
            </div>
            <div className ='mx-5'>
                <h2 className ='font-[900] text-[3rem]  text-secondary opacity-[80%]'>
                {rank+1}</h2>
                <p>Rank</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default GuildListItem