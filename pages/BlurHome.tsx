import React,{useState,useRef, useContext, useEffect} from 'react'
import ProfileInfo from '../components/ProfileInfo'
import AssetInfo from '../components/AssetInfo'
import CurrentValue from '../components/CurrentValue'
import Graph from '../components/Graph'
import Navbar from '../components/Navbar'
import NavbarOnlyLogin from '../components/NavbarOnlyLogin'
import {AuthContext,AuthContextProps} from "../context/AuthContext";
import Router from 'next/router'


function Home() {
  const {account, connect, disconnect} = useContext<AuthContextProps>(AuthContext);
  const [profilePic,setProfilePic] = useState<any>('https://www.pngitem.com/pimgs/m/22-223968_default-profile-picture-circle-hd-png-download.png')
  const [file,setFile] = useState();
  const imageUploader = useRef();

  const uploadProfilePic = async (e:any) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setProfilePic(reader.result)
    }
    reader.readAsDataURL(file);
    // const res =  await axios.post(`https://api.imgur.com/3/image`,{ 
    //     'Authorization': `Client-ID 33956e626adc6da`, },{profilePic})
    // console.log(res)
  }

  useEffect(() => {
    if (account!=="" ){
      Router.push('/')
    }},[account])

  return (
    <div className="flex-1 ">
      <div className="absolute z-50">
      <Navbar/>
      </div>
      <div className="absolute z-20 h-screen w-screen flex-1 flex items-center justify-center text-center ">
      <p className="text-4xl ">
        Login To Continue
      </p>
      </div>
    <div className='blurBackground'>

        <Navbar/>
    <div className="relative h-[150vh] overflow-hidden bg-background bg-cover bg-no-repeat	bg-fixed flex flex-col items-end  pt-[10%] pr-[20%]">
        <div className="glassCircle w-[10rem] h-[10rem] absolute left-[20%]"></div>
        <ProfileInfo/>
        <AssetInfo/>
        <h2 className='relative z-0 mb-[-2.5rem] leading-[5rem] text-[#974f83] opacity-75 font-[900] text-[7.75rem]'>Current Value</h2>
        <CurrentValue/>
        <Graph/>

    </div>
    </div>

</div>
  )
}

export default Home