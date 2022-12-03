import React, {useEffect, useContext, useState, useRef}  from 'react'
import {AuthContext,AuthContextProps} from "../context/AuthContext";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  
  return (
    <div className="absolute z-20 w-screen flex items-center justify-end  p-5">

      <button className="button p-2" onClick={account?disconnect:connect}>
        {account?'Logout':'Login'}
      </button>

    </div>
  )
}

export default NavbarOnlyLogin