import React from 'react'

import GuildListItem from '../components/GuildListItem'
function Search() {
  const [guilds, setGuilds] = React.useState([{
    id:1,
    name: 'Vishnu Shon',
    followers: 2500000,
    capital: 2000000,
    rank: 18,
    image: '/User.png',
    follow: '/Follow.png'
  }])
  const [name, setName] = React.useState('')
  const [filteredGuilds, setFilteredGuilds] = React.useState(guilds)


  const searchGuilds = (e:any) => {
    const searchValue = e.target.value
    setName(searchValue)
    const newGuilds = guilds.filter((guild) => {
      return guild.name.toLowerCase().includes(searchValue.toLowerCase())
    })
    // if (newGuilds) {
    // if (newGuilds.length > 0) {
      setFilteredGuilds(newGuilds)
      console.log(newGuilds)
    // }
    // else {
    //   setFilteredGuilds(guilds)
    // }
  }


  return (
    <div className="relative h-screen overflow-hidden  bg-no-repeat	bg-fixed px-52">
      <div className="flex pt-10 border mt-[100px] mx-[400px] justify-center">
        <input 
        className="flex-1 w-max h-20 bg-textAccent rounded-xl p-10"
        type="text"
        placeholder="Search"
        value={name}
        onChange={searchGuilds}
        >
        </input>
      </div>
      <div className='m-10'>
        {
          filteredGuilds.map((guild) => {
            return (
              <GuildListItem key={guild.id} guild={guild}/>
              )
            })
          }
        </div>
    </div>
  )
}


export default Search