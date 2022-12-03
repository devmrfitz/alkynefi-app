import React,{useState} from 'react';
import Image from 'next/image';

export type SearchComponentProps={
  name: string,
  setName:React.Dispatch<React.SetStateAction<string>>,
}

function SearchBar({name, setName}:any) {
  return (
    <div className="w-[50%]">
      <input className='glassDiv relative w-[100%] p-3 rounded-full pl-20 z-0'
               value={name}
               placeholder={'Search Guilds'}
               onChange={(e)=>setName(e.target.value)}/>
      <div className='relative mt-[-2.5rem] mx-5 z-10 w-[10%]'>
        <Image src='/search.svg'
              alt='Search'
              width={30}
              height={30}/>
      </div>
    </div>
  )
}

export default SearchBar