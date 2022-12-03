import React,{useState,useEffect} from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import NavbarLand from '../components/NavbarLand';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [path,setPath] = useState<string>(router.pathname);
  
  useEffect(() => {
    const getPageLocation = () => {
        const res = router.pathname;
        setPath(res);
    }
    getPageLocation();
})

  return(
    <>
      <AuthProvider>
        {path==='/Landing'?<NavbarLand/>:<Navbar/>}
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}
