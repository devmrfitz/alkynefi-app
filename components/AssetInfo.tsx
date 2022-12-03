import React from 'react'
import Image from 'next/image'
function AssetInfo() {
  return (
    <div className="divBackground  flex justify-evenly w-[75%] h-[23%] my-10 font-[700]  text-[2.5rem] leading-[2.5rem] items-center text-textMain ">
      <div className='w-[20%] h-[70%] flex flex-col justify-between items-start'>
        <div>
          <Image src="/coin.png" width={100} height={100} alt="coin"/>
        </div>   
        <h2 className="opacity-70">BNB</h2>
      </div>

      <div className='w-[30%] h-[70%] flex flex-col opacity-70 justify-between items-start'>
        <h2>Primary Invested Asset</h2>
        <h2 className='text-[#A6F2A5]'>+1.77%</h2>
      </div>

      <div className='w-[30%]'>
        {/* graph */}
      </div>
    </div>
  )
}

export default AssetInfo