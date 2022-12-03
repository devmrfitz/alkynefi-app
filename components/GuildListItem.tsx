import React from 'react'
import Image from 'next/image';

export type GuildListProps = {
  name: string,
  followers: number,
  capital: string,
  rank: number,
  image:{
    url: string,
    alt: string,
  }
}

function GuildListItem({name, followers, capital, rank, image}:GuildListProps) {
  return (
    <div className="flex flex-1 border justify-between">
      <div className="flex flex-col justify-center items-center border m-10">
            <Image src={'/User.png'} width={150} height={150} alt="alyne"/>            
            <Image src={'/Follow.png'} width={100} height={100} alt="alyne"/>
      </div>
      <div className="flex font-[900] flex-col justify-center items-center  m-10 ">
            <p className="text-[3rem] leading-[2rem] text-textSecondary opacity-[80%]">{name}</p>
            <div className='flex mt-10'>
              <div className='flex-1 border'>
            <p className="text-[2rem] leading-[1rem] text-textAccent pt-1 mr-20">
              {followers}
               </p>
            <p className="text-[1rem] leading-[1rem] text-textMain mt-2 mr-20">followers </p>
              </div>
              <div className='flex-1 border'>
            <p className="text-[2rem] leading-[1rem] text-textAccent pt-1 mr-20">
              {capital}</p>
            <p className="text-[1rem] leading-[1rem] text-textMain mt-2 mr-20">Capital </p>
              </div>
              <div className='flex-1 border'>
            <p className="text-[2rem] leading-[1rem] text-textAccent pt-1 mr-20">{rank} </p>
            <p className="text-[1rem] leading-[1rem] text-textMain mt-2 mr-20">Rank </p>
              </div>
            </div>
      </div>
    </div>
  )
}

export default GuildListItem