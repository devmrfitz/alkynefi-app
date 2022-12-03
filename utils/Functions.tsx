import React, { useContext, useEffect, useState } from "react";
import web3 from "web3";
import { ethers } from "ethers";
import { AuthContext,AuthContextProps } from "../context/AuthContext";
//@ts-ignore
import AlkyneWalletContractABI from '../contracts/AlkyneWalletContract.json';
import OrchestratorContractABI from '../contract/Orchestrator.json';
import LensProfileContractABI from '../contracts/LensProfileContract.json';


const useBlockchain = async (getProvider:any) =>{
    const provider = await getProvider();
    const signer = provider?.getSigner();
    let OrchestratorContract:any = new ethers.Contract(
        "",
        OrchestratorContractABI.abi,
        signer
    );
    let WalletContract:any = new ethers.Contract(
        "",
        AlkyneWalletContractABI.abi,
        signer
    );
    let LensProfileContract:any = new ethers.Contract(
        "",
        LensProfileContractABI.abi,
        signer
    );

    return [provider, signer, OrchestratorContract, WalletContract, LensProfileContract];
}

export const GetMeanSubPrice = async (getProvider : Function) => {
    const [provider, signer, OrchestratorContract, WalletContract, LensProfileContract] = await useBlockchain(getProvider);
    let value = -1;
    try {
        let count = await WalletContract.getMeanSubscriberInvestment();
        value = parseInt(BigInt(count._hex).toString(10));
      } catch (err: any) {
        console.log(err, "error");
        alert(err.message);
    }
    return value;
} 

export async function Signup(getProvider  : any,userHandle: any, ipfsURI : any, maxAmount  :any) {
    const [provider, signer, OrchestratorContract, WalletContract, LensProfileContract] = await useBlockchain(getProvider);
    let out = "";
    try {
        let count = await OrchestratorContract.createProfile(userHandle, ipfsURI,maxAmount);
        let x = count.wait();
        console.log(x," x")
        out = x;
      } catch (err :any) {
        console.log(err, "error");
        alert(err.message);
        out = err.message;
    }
    return out;
}

export async function GetAllAddresses(getProvider  : any) {
    const [provider, signer, OrchestratorContract, WalletContract, LensProfileContract] = await useBlockchain(getProvider);
    let out = "";
    try {
        let count = await OrchestratorContract.getRegisteredUsers();
        let x = count.wait();
        console.log(x," x")
        out = x;
      } catch (err :any) {
        console.log(err, "error");
        alert(err.message);
        out = err.message;
    }
    return out;
}


export async function GetAlkyneWallet(getProvider  : any,  userAddress : any) {
    const [provider, signer, OrchestratorContract, WalletContract, LensProfileContract] = await useBlockchain(getProvider);
    let out = "";
    try {
        let count = await OrchestratorContract.getAlkyneWallet(userAddress);
        let x = count.wait();
        console.log(x," x")
        out = x;
      } catch (err :any) {
        console.log(err, "error");
        alert(err.message);
        out = err.message;
    }
    return out;
}


//get net investment

//get max invested asset

// get number of followers

//follow function

//swap functions


