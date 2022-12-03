import React,{useState,useEffect} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import {GetMeanSubPrice} from '../utils/Functions'


export type GuildListProps = {
  address: string,
  rank: number,
}

function GuildListItem({address,rank}:GuildListProps) {
  const [name,setName] = useState('');
  const [followers,setFollowers] = useState('0');
  const [capital,setCapital] = useState('0');

  return (
    <div className="divBackground flex justify-around items-center mt-5">
      <div className="flex flex-col justify-center items-center  m-10">
            <Image src={'/User.png'} width={150} height={150} alt="alyne"/>            
            <Link href="https://staging.push.org/#/channels" 
                  className="bg-[#D1318C]  p-1 mt-1 active:bg-secondary hover:shadow-lg rounded-lg w-[80%]">
              Follow
            </Link>
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