import React from 'react'

function Landing() {
  return (
    
    <div className="relative h-screen overflow-hidden bg-background bg-cover bg-no-repeat	bg-fixed">

        <div className="flex flex-col Mulish font-[200] text-center pt-[10%] items-center z-10">
            <h1 className="tracking-[.25rem] text-textMain">
              welcome to Alkyne</h1>
            <h2 className="font-[900] text-[7rem] leading-[7rem] w-[70%] text-textSecondary opacity-[80%]">
              The Platform For TradeLeaders</h2>
            <p className="w-[60%] mt-10 tracking-[.15rem] textMain">What if we, the people with colleges and jobs, could have access
             to investment strategies used by the best of the best ? Yes, AlkynFi is coming to
              bridge the asymmetric information gap by weaving a creator model for the De Fi world 😌😎</p>
            
            <div className="glassCircle scale-150 w-[20rem] h-[20rem] absolute bottom-[-20%] glassCircle"></div>
            <div className="glassCircle scale-150 w-[10rem] h-[10rem] absolute bottom-[-10%] mr-[15rem]"></div>
        </div>

    </div>
      
  )
}

export default Landing