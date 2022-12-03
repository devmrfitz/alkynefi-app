import React, { useEffect, useState, createContext, } from "react";
import { ethers, providers } from "ethers";
import Web3Modal from "web3modal";
// @ts-ignore
export type AuthContextProps = {
    account: string | undefined,
    connect: ()=>void,
    disconnect: ()=>void,
    getProvider: ()=>void,
    chainId:any,
};

type props = {
    children: React.ReactNode
}

export const AuthContext = createContext<AuthContextProps>(
    {} as AuthContextProps
)

export const AuthProvider = ({ children }: props) => {

    const connect = async () => {
        const provider = await web3Modal?.connect();
        const ethersProvider = new providers.Web3Provider(provider);
        const id  =  (await ethersProvider.getNetwork()).chainId.toString();
        setChainId(id);
        const userAddress = await ethersProvider.getSigner().getAddress();
        const data =  ethersProvider.getSigner();
        console.log(data);
        setAccount(userAddress);
        localStorage.setItem('userData',account!);
        return data;
    }

    const disconnect = () => {
        if (web3Modal && web3Modal.cachedProvider) {
            web3Modal.clearCachedProvider();
            setAccount(undefined);
            localStorage.removeItem("userData");
        }
    }

    const getProvider = async () => {
        const provider = await web3Modal?.connect();
        const ethersProvider = new providers.Web3Provider(provider);
        return new ethers.providers.Web3Provider(provider);
    }

    const [web3Modal, setWeb3Modal] = useState<Web3Modal>()
    const [account, setAccount] = useState<string | undefined>("")
    const [chainId, setChainId] = useState<any>()

    useEffect(() => {
        const modal = new Web3Modal({providerOptions:{
        },cacheProvider: true });
        setWeb3Modal(modal)

    }, [])

    useEffect(() => {
        if(web3Modal && web3Modal.cachedProvider){
          connect();
        }
    
      }, [web3Modal])

    return (
        <AuthContext.Provider
            value={{
                account,
                connect,
                disconnect,
                getProvider,
                chainId,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
