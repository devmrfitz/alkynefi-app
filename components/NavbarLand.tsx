import React, {useEffect, useContext, useState, useRef}  from 'react'
import {AuthContext,AuthContextProps} from "../context/AuthContext";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

function NavbarLand() {
  const {account, connect, disconnect} = useContext<AuthContextProps>(AuthContext);
  const router = useRouter();
  const [path,setPath] = useState<string>(router.pathname);
  
  useEffect(() => {
    const getPageLocation = () => {
        const res = router.pathname;
        setPath(res);
    }
    getPageLocation();
})
  
  return (
    <div className="absolute z-20 w-screen flex items-center justify-between  p-5">

      <Link href={'/Landing'}>
        <Image src={'/alkyne.png'} width={50} height={50} alt="alyne"/>
      </Link>

      <a className="button p-2 " href={'/'}>
        Launch
      </a>

    </div>
  )
}

export default NavbarLand