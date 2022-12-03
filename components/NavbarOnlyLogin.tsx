import React, {useEffect, useContext, useState, useRef}  from 'react'
import {AuthContext,AuthContextProps} from "../context/AuthContext";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Router from 'next/router';
function NavbarOnlyLogin() {
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
// button onclick handler function
  const handleLogin = () => {
    console.log('logout');
    disconnect();
    router.push('/BlurHome');
    }
  
    console.log(account, typeof account ,"account");
  return (
    <div className="absolute z-20 w-screen flex items-center justify-end  p-5">

      <button className="button p-2" onClick={account?handleLogin:connect}>
        {account?'Logout':'Login'}
      </button>

    </div>
  )
}

export default NavbarOnlyLogin