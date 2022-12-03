import React from 'react'

function CurrentValue() {
  return (
    <>
    <div className='glassDiv relative Mulish font-[200] z-10 my-10 w-[75%] h-[15%] rounded-[1.5rem] flex justify-evenly items-center text-center'>
      <div>
          <h2 className ='font-[900] text-[4rem] leading-[6rem] text-textSecondary opacity-[80%]'>$2M</h2>
          <p>Net Invested</p>
      </div>

      <div className='bg-[white] opacity-20 w-[2px] h-[50%]'></div>

      <div>
          <h2 className ='font-[900] text-[4rem] leading-[6rem] text-textSecondary opacity-[80%]'>$10,000</h2>
          <p>Mean Profit Per Sub</p>
      </div>
    </div>
  </>
  )
}

export default CurrentValue