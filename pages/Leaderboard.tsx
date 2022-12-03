import React,{useState,useEffect} from 'react'
import GuildListItem,{GuildListProps} from '../components/GuildListItem'


function Leaderboard() {
  const [data,setData] = useState<[GuildListProps]|[]>([]);

  useEffect(() =>{
    //get data
  },[])

  return (
    <div className="relative h-[150vh] overflow-hidden bg-background bg-no-repeat	bg-fixed flex flex-col items-center  pt-[10%]">
      <h2 className="font-[900] text-[4rem] leading-[6rem] text-textSecondary opacity-[80%]">Top 5 Traders</h2>
      {data.slice(0,5).map((item, index)=>(
        <div>  
          <h2>#{item.rank}</h2>
          <GuildListItem name={item.name}
                      followers={item.followers}
                      capital={item.capital}
                      rank={item.rank}
                      image={item.image}
                      key={index}/>
        </div>
      ))}
    </div>
  )
}

export default Leaderboard