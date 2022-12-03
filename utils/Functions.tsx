import React, { useContext, useEffect, useState } from "react";
import web3 from "web3";
import { ethers } from "ethers";
import { AuthContext,AuthContextProps } from "../context/AuthContext";
//@ts-ignore
import AlkyneWalletContract from '../contracts/AlkyneWalletContract.json'
import Orchestrator from '../contract/Orchestrator.json'

const { account, 
        getProvider,
        chainId} = useContext<AuthContextProps>(AuthContext);

const useBlockchain = async () =>{
    const provider = await getProvider();
    const signer = provider?.getSigner();
    let Orchestrator:any = new ethers.Contract(
        account!,
        // ProfileContract.abi,
        signer
    );
    let WalletContract:any = new ethers.Contract(
        account!,
        AlkyneWalletContract.abi,
        signer
    );

    return [provider, signer, Orchestrator, WalletContract];
}

export const getMeanSubPrice = async () => {
    const provider = await getProvider();
    const signer = provider?.getSigner();
    let WalletContract:any = new ethers.Contract(
        account!,
        AlkyneWalletContract.abi,
        signer
    );
    let value = -1;
    try {
        let count = await WalletContract.getMeanSubscriberInvestment();
        value = parseInt(BigInt(count._hex).toString(10));
      } catch (err) {
        console.log(err, "error");
        alert(err.message);
    }
    return value;
} 

export const signup = async () => {
    const provider = await getProvider();
    const signer = provider?.getSigner();
    let AlkyneOrchestrator:any = new ethers.Contract(
        account!,
        Orchestrator.abi,
        signer
    );
    let value = -1;
    try {
        let count = await AlkyneOrchestrator.createProfile();
        value = parseInt(BigInt(count._hex).toString(10));
      } catch (err) {
        console.log(err, "error");
        alert(err.message);
    }
    return value;
}


