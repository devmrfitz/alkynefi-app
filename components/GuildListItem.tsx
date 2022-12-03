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
    <div className="divBackground flex justify-around items-center mt-5">
      <div className="flex flex-col justify-center items-center  m-10">
            <Image src={'/User.png'} width={150} height={150} alt="alyne"/>            
            <button className="bg-[#D1318C]  p-1 mt-1 active:bg-secondary hover:shadow-lg rounded-lg w-[80%]">
              Follow
            </button>
      </div>
      
      <div>
        <h1 className='font-[900] text-[4rem] leading-[6rem] text-textSecondary opacity-[80%]'>Vishnu Shon</h1>

        <div className="flex justify-between font-[200] leading-[2.5rem]">
            <div>
                <h2 className ='font-[900] text-[3rem]  text-secondary opacity-[80%]'>
                25M</h2>
                <p>Followers</p>
            </div>
            <div>
                <h2 className ='font-[900] text-[3rem]  text-secondary opacity-[80%]'>
                $2M</h2>
                <p>Capital</p>
            </div>
            <div>
                <h2 className ='font-[900] text-[3rem]  text-secondary opacity-[80%]'>
                18</h2>
                <p>Rank</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default GuildListItem