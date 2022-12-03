import React,{useState,useRef} from 'react'
import ProfileInfo from '../components/ProfileInfo'
import AssetInfo from '../components/AssetInfo'
import CurrentValue from '../components/CurrentValue'
import Graph from '../components/Graph'

function Home() {
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

  return (
    <div className="relative h-[150vh] overflow-hidden bg-background bg-no-repeat	bg-fixed flex flex-col items-end  pt-[10%] pr-[20%]">

      <div className="glassCircle w-[10rem] h-[10rem] absolute left-[20%]"></div>
      <ProfileInfo/>
      <AssetInfo/>
      <h2 className='relative z-0 mb-[-2.5rem] leading-[5rem] text-[#974f83] opacity-75 font-[900] text-[7.75rem]'>Current Value</h2>
      <CurrentValue/>
      <Graph/>

    </div>
  )
}

export default Home