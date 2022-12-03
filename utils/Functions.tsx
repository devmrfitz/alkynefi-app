//@ts-ignore
import React, { useContext, useEffect, useState } from "react";
import web3 from "web3";
import { ethers } from "ethers";
import { AuthContext,AuthContextProps } from "../context/AuthContext";
import AlkyneWalletContractABI from '../contract/AlkyneWalletContractABI.json';
import OrchestratorContractABI from '../contract/OrchestratorContractABI.json';
import LensHubContractABI from '../contract/LensHubContractABI';
import { AbiCoder, defaultAbiCoder } from "ethers/lib/utils";

// {
//     "lensHub proxy": "0x51CF51be65E1B820853E527b3f1D824D29307659", needed 
//     "lensHub impl:": "0x6575be1A4DE6EEB9A8573906E7313cB90e8A0fA6",
//     "publishing logic lib": "0x5e57E73F257d3e034a550EdAF17f8ED5B32EB3C8",
//     "interaction logic lib": "0x6629b8Da78bCe884613B0CE4956204c2522Dc398",
//     "follow NFT impl": "0x2a7e99b9f1e0c781cbc0adb03fbc7bc1b54d5358",
//     "collect NFT impl": "0xfffdcb186d5bbff7274608d7e14d0b847238364a",
//     "currency": "0x87664A91e7059A2D88e55e3a9E82015Ddb766Ad8",
//     "lens periphery": "0x25517C60d60889dD754009604b8dAE37Ee6044f0",
//     "module globals": "0x7aE29bCaaFf01eD2d60D3f7B2A7dA9843C67E966",
//     "fee collect module": "0xabae2Ab2229bdb7fD272183145d64A4b7020362D",
//     "limited fee collect module": "0x166091c8A7E4Dc328373a3f9DCBA690845aF9e27",
//     "timed fee collect module": "0x9C464A2FAA5BbcE231Bd3437987C4E3D7c0Cc369",
//     "limited timed fee collect module": "0xf45257dE8e0C7489957D139D493723E63EdC0D5b",
//     "revert collect module": "0x2f491269712b3E2ABCD0b34D78142982EF5c834a",
//     "free collect module": "0x65010077E2965db895A3b536170c8E5a5dDdA575",
//     "fee follow module": "0x0C711C44e29F0e588B19585499668A5df66701DC",
//     "profile follow module": "0xCF73362780857cdB13f4783981aB7bF3c3EAA943",
//     "revert follow module": "0xC69c6f3c733c583d2118035609F4Ae8e0EDfAccb",
//     "follower only reference module": "0x0D1Ea0f46f8Beaf5709AE41A28b4fdCC2f26caf4",
//     "UI data provider": "0xfc6edd01415029511aD7f5F73E1Fc31d84e1351b",
//     "Profile creation proxy": "0x55121684a98bE8919746A1537438aAa2539daDfd"
//   }



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
    let LensHubContract:any = new ethers.Contract(
        "0x51CF51be65E1B820853E527b3f1D824D29307659",
        LensHubContractABI,
        signer
    );

    return [provider, signer, OrchestratorContract, WalletContract, LensHubContract];
}

export const GetMeanSubPrice = async (getProvider : Function) => {
    const [provider, signer, OrchestratorContract, WalletContract, LensHubContract] = await useBlockchain(getProvider);
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
    const [provider, signer, OrchestratorContract, WalletContract, LensHubContract] = await useBlockchain(getProvider);
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
    const [provider, signer, OrchestratorContract, WalletContract, LensHubContract] = await useBlockchain(getProvider);
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
    const [provider, signer, OrchestratorContract, WalletContract, LensHubContract] = await useBlockchain(getProvider);
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

export async function GetFollowersArray(getProvider  : any,  userAddress : any) {
    const [provider, signer, OrchestratorContract, WalletContract, LensHubContract] = await useBlockchain(getProvider);
    let out = "";
    try {
        let count = await OrchestratorContract.followersArray();
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



export async function StartFollowing(getProvider  : any,  userAddress : any, profileids : any, datas : any) {
    const [provider, signer, OrchestratorContract, WalletContract, LensProfileContract] = await useBlockchain(getProvider);
    let out = "";
    try {
        let count = await LensProfileContract.follow(profileids, datas);
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


export async function CreateProfileHub(getProvider  : any) {
    const [provider, signer, OrchestratorContract, WalletContract, LensHubContract] = await useBlockchain(getProvider);
    let out = "";

    const val =  {
        to: "0x67C1dbA6F01fe836E6BB4c8B883392E6CfE92aa9",
        handle: "sdvab",
        imageURI: 'ipfs://bafybeiaahkgliyhug3wg7cjudgubyg5o2j3kcig3kpdfj73xvyegv5bngu',
        followModule: '0x0',
        followModuleInitData: defaultAbiCoder.encode(
          [],
          [
          
          ]
        ),
        followNFTURI: 'ipfs://bafybeiaahkgliyhug3wg7cjudgubyg5o2j3kcig3kpdfj73xvyegv5bngu',
      };
    

    try {
        let count = await LensHubContract.createProfile(val);
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




//get net investment - portfolio total value

//get max invested asset

// get number of followers 

//follow function

//swap functions


