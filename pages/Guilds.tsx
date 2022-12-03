import React,{useState,useEffect,useContext} from 'react'
import GuildListItem,{GuildListProps} from '../components/GuildListItem';
import SearchBar from '../components/SearchBar'
import {GetAllAddresses} from '../utils/Functions'
import {AuthContext,AuthContextProps} from '../context/AuthContext'

function Guilds() {
  const [name,setName] = useState<string>('')
  const [data,setData] = useState<any>([])
  const {getProvider} = useContext<AuthContextProps>(AuthContext)
  console.log(name);

  useEffect(() =>{
    const getData = async() => {
      const res = await GetAllAddresses(getProvider);
      setData(res);
    }
    getData();
  },[])

  return (
    <div className="relative h-[150vh] overflow-hidden bg-background bg-cover bg-no-repeat	bg-fixed flex flex-col justify-between items-center  pt-[10%]">
      <SearchBar name={name} 
                 setName={setName}/>

      {data.filter((item:any)=>item.address === name)
           .map((item:any, index:number)=>(
        <GuildListItem key={index} userAddress={''} rank={index}/>
      ))}
    </div>
  )
}

export default Guilds