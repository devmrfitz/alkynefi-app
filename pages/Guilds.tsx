import React,{useState,useEffect} from 'react'
import GuildListItem,{GuildListProps} from '../components/GuildListItem';
import SearchBar from '../components/SearchBar'


function Guilds() {
  const [name,setName] = useState<string>('')
  const [data,setData] = useState<[GuildListProps]|[]>([])
  console.log(name);

  useEffect(() =>{
 //get data
  },[])

  return (
    <div className="relative h-[150vh] overflow-hidden bg-background bg-cover bg-no-repeat	bg-fixed flex flex-col justify-between items-center  pt-[10%]">
      <SearchBar name={name} 
                 setName={setName}/>

      {data.filter((item)=>item.name === name)
           .map((item, index)=>(
        <GuildListItem name={item.name}
                      followers={item.followers}
                      capital={item.capital}
                      rank={item.rank}
                      image={item.image}
                      key={index}/>
      ))}
    </div>
  )
}

export default Guilds