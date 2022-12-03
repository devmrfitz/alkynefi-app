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
    const [provider, signer, ProfileContract, WalletContract] =
    await useBlockchain();
    let value = -1;
    try {
        let count = await ProfileContract.getMeanSubscriberInvestment();
        value = parseInt(BigInt(count._hex).toString(10));
      } catch (err) {
        console.log(err, "error");
        alert(err.message);
    }
    return value;
} 

const getTotalInvestment = async () => {

}

const getMaxInvestedToken = async() => {

}

const follow = async () => {

}

const getAllGuilds = async () => {

}

const createProfile = async () => {

}
