import React from 'react'
import Image from 'next/image'
function Trade() {
 return (
    <div className="relative h-screen overflow-hidden  bg-background bg-cover bg-no-repeat	bg-fixed px-52">
      <div className="glassDiv flex flex-col flexbold-1 pt-10 mt-[100px] mx-[400px] justify-center border rounded-3xl">
            <p className="text-2xl font- self-center text-center">
                Trade tokens in an instant
            </p>
        <div className='flex-1 flex flex-wrap mt-10'>
            <TradeTokenCard destination='From' tokenName='eth' price='0.987'/>
            <div className='items-center justify-center self-center'>
            <Image src='/swap.png' height={50} width={50} alt={''} />
            </div>
            <TradeTokenCard destination='To' tokenName='anuv' price='0.987'/>
            {/* <TradeTokenCard />   */}
        </div>
        <div className='flex-1 flex flex-wrap mt-10'>
            <TradeTokenDetails items={
                [
                [0,'Price', '0.324'],
                [1,'per', 'ETH'],
                [2,'slippage', '0.1%'],
                ]
            }/>
            <TradeTokenDetails items={
                [
                [0,'Maximum sold', '27.24 ANUV'],
                [1,'Price Impact', '10.2%'],
                [2,'Liquidity Provider Fee', '0.05394 ANUV'],
                ]
            }/>
        </div>
        <div className='flex-1 flex flex-wrap my-10 justify-center'>
            <button className='hover:bg-[#D1318C] text-white font-bold py-2 px-4 rounded border mx-10'>Approve</button>    
            <button className='hover:bg-[#03AFD0] text-white font-bold py-2 px-4 rounded border mx-10'>Swap</button>    
        </div>
            
      </div>
    </div>
  )
}

function TradeTokenCard(
    {destination,tokenName, price}
){
    return (
        <div className='flex flex-1 flex-col border border-[#FF74C3] rounded-xl mx-10'>
        <div className="flex flex-1 justify-between px-10 py-5">
            <p>{destination}</p>
            <p>{price}</p>
       </div>
       <div className="flex flex-1 justify-between px-10 py-5">
            <input className='flex border rounded-lg bg-[#FFFFFF] text-[black]'></input>
            <div className='flex space-x-4'>
                <Image src={`/${tokenName}.png`} width={25} height={10} alt={tokenName}></Image>
                <p>{tokenName}</p>
            </div>
       </div>
    </div>

    )
}

function TradeTokenDetails(
    {items}
){
    // console.log(items)
    return (
    <div className='flex flex-1 flex-col border border-[#D1318C] rounded-xl mx-10 mb-5 pt-5'>
        {items.map(element => {
            console.log(element[0]);
            return (
                    <div key={element[0]} className="flex flex-1 justify-between px-10 pb-5 ">
                        <p>{element[1]}</p>
                        <p>{element[2]}</p>
                    </div>
            )
        })}
    </div>

    )
}
export default Trade