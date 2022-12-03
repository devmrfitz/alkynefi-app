import React,{useState,useEffect,useContext} from 'react'
import GuildListItem,{GuildListProps} from '../components/GuildListItem'
import {AuthContext,AuthContextProps} from '../context/AuthContext'
import {GetAllAddresses} from '../utils/Functions'
//@ts-ignore
function Leaderboard() {
  const [data,setData] = useState<[GuildListProps]|[]>([]);
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
      {data.slice(0,5).map((item, index)=>(
        <div className="w-[60%]" key={index}>  
          <h2 className="Mulish font-[900] text-[3rem]  text-secondary opacity-[80%] absolute z-10 rotate-[-30deg]">#{index+1}</h2>
          <GuildListItem address={'hello'} 
                         rank={index}/>
        </div>
      ))}
    </div>
  )
}

export default Leaderboard