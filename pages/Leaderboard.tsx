import React,{useState,useEffect,useContext} from 'react'
import GuildListItem,{GuildListProps} from '../components/GuildListItem'
import {AuthContext,AuthContextProps} from '../context/AuthContext'
import {GetAllAddresses} from '../utils/Functions'
//@ts-ignore
function Leaderboard() {
  const [data,setData] = useState<any>(["0x526AFE1742c655D94cB98E6Bf9e9865112C15264", "0x67C1dbA6F01fe836E6BB4c8B883392E6CfE92aa9", "0x9E48fA821A9A4A63591e04F796e2651238059DcD", ""]);
  const {getProvider} = useContext<AuthContextProps>(AuthContext)
  
  useEffect(() =>{
    const getData = async() => {
      const res = await GetAllAddresses(getProvider);
      setData(res);
    }
    getData();
  },[])

  return (
    <div className="relative h-[150vh] overflow-hidden bg-background bg-cover bg-no-repeat	bg-fixed flex flex-col items-center  pt-[10%]">
      <h2 className="font-[900] text-[4rem] leading-[6rem] text-textSecondary opacity-[80%]">Top 5 Traders</h2>
      {data.slice(0,5).map((item:any, index:number)=>(
        <div className="w-[60%]" key={index}>  
          <h2 className="Mulish font-[900] text-[3rem]  text-secondary opacity-[80%] absolute z-10 rotate-[-30deg]">#{index+1}</h2>
          <GuildListItem userAddress={item} 
                         rank={index}/>
        </div>
      ))}
    </div>
  )
}

export default Leaderboard