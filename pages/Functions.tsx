import React, { useContext, useEffect, useState } from "react";
import web3 from "web3";
import { ethers } from "ethers";
import { AuthContext,AuthContextProps } from "../context/AuthContext";
//@ts-ignore

const { account, 
        getProvider,
        chainId} = useContext<AuthContextProps>(AuthContext);


const useBlockchain = async () =>{
    const provider = await getProvider();
    const signer = provider?.getSigner();
    let ProfileContract:any = new ethers.Contract(
        account!,
        // ProfileContract.abi,
        signer
    );
    let WalletContract:any = new ethers.Contract(
        account!,
        // FollowContract.abi,
        signer
    );

    return [provider, signer, ProfileContract, WalletContract];
}



const getMeanSubPrice = async () => {

} 

const getTotalInvestment = async () => {

}

const getMaxInvestedToken = async() => {

}