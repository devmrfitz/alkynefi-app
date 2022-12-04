//@ts-ignore
import React, { useContext, useEffect, useState } from "react";
import web3 from "web3";
import { ethers } from "ethers";
import { AuthContext,AuthContextProps } from "../context/AuthContext";
import AlkyneWalletContractABI from '../contract/AlkyneWalletContractABI.json';
// import OrchestratorContractABI from '../contract/OrchestratorContractABI.json';
// import LensHubContractABI from '../contract/LensHubContractABI';
import { AbiCoder, defaultAbiCoder } from "ethers/lib/utils";


let OrchestratorContractABI = [
	{
		"inputs": [],
		"name": "createProfile1",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "handle",
				"type": "string"
			}
		],
		"name": "createProfile2",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_alkyneFollowModule",
				"type": "address"
			}
		],
		"name": "setAlkyneFollowModule",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_alkyneToken",
				"type": "address"
			}
		],
		"name": "setAlkyneToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_lensHubAddress",
				"type": "address"
			}
		],
		"name": "setLensHubAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_swapRouter",
				"type": "address"
			}
		],
		"name": "setSwapRouter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "alkyneFollowModule",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "alkyneToken",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "alkyneWallets",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getAlkyneWallet",
		"outputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getProfileId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRegisteredUsers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "lensHubAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lensProfiles",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "swapRouter",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]


let  LensHubContractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pubId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "data",
				"type": "bytes"
			}
		],
		"name": "collect",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "collector",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "profileId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pubId",
						"type": "uint256"
					},
					{
						"internalType": "bytes",
						"name": "data",
						"type": "bytes"
					},
					{
						"components": [
							{
								"internalType": "uint8",
								"name": "v",
								"type": "uint8"
							},
							{
								"internalType": "bytes32",
								"name": "r",
								"type": "bytes32"
							},
							{
								"internalType": "bytes32",
								"name": "s",
								"type": "bytes32"
							},
							{
								"internalType": "uint256",
								"name": "deadline",
								"type": "uint256"
							}
						],
						"internalType": "struct DataTypes.EIP712Signature",
						"name": "sig",
						"type": "tuple"
					}
				],
				"internalType": "struct DataTypes.CollectWithSigData",
				"name": "vars",
				"type": "tuple"
			}
		],
		"name": "collectWithSig",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "profileId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "profileIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pubIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "bytes",
						"name": "referenceModuleData",
						"type": "bytes"
					},
					{
						"internalType": "address",
						"name": "collectModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "collectModuleInitData",
						"type": "bytes"
					},
					{
						"internalType": "address",
						"name": "referenceModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "referenceModuleInitData",
						"type": "bytes"
					}
				],
				"internalType": "struct DataTypes.CommentData",
				"name": "vars",
				"type": "tuple"
			}
		],
		"name": "comment",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "profileId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "profileIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pubIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "bytes",
						"name": "referenceModuleData",
						"type": "bytes"
					},
					{
						"internalType": "address",
						"name": "collectModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "collectModuleInitData",
						"type": "bytes"
					},
					{
						"internalType": "address",
						"name": "referenceModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "referenceModuleInitData",
						"type": "bytes"
					},
					{
						"components": [
							{
								"internalType": "uint8",
								"name": "v",
								"type": "uint8"
							},
							{
								"internalType": "bytes32",
								"name": "r",
								"type": "bytes32"
							},
							{
								"internalType": "bytes32",
								"name": "s",
								"type": "bytes32"
							},
							{
								"internalType": "uint256",
								"name": "deadline",
								"type": "uint256"
							}
						],
						"internalType": "struct DataTypes.EIP712Signature",
						"name": "sig",
						"type": "tuple"
					}
				],
				"internalType": "struct DataTypes.CommentWithSigData",
				"name": "vars",
				"type": "tuple"
			}
		],
		"name": "commentWithSig",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "to",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "handle",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "imageURI",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "followModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "followModuleInitData",
						"type": "bytes"
					},
					{
						"internalType": "string",
						"name": "followNFTURI",
						"type": "string"
					}
				],
				"internalType": "struct DataTypes.CreateProfileData",
				"name": "vars",
				"type": "tuple"
			}
		],
		"name": "createProfile",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "wallet",
				"type": "address"
			}
		],
		"name": "defaultProfile",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pubId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "collectNFTId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "emitCollectNFTTransferEvent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "followNFTId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			}
		],
		"name": "emitFollowNFTTransferEvent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256[]",
				"name": "profileIds",
				"type": "uint256[]"
			},
			{
				"internalType": "bytes[]",
				"name": "datas",
				"type": "bytes[]"
			}
		],
		"name": "follow",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "follower",
						"type": "address"
					},
					{
						"internalType": "uint256[]",
						"name": "profileIds",
						"type": "uint256[]"
					},
					{
						"internalType": "bytes[]",
						"name": "datas",
						"type": "bytes[]"
					},
					{
						"components": [
							{
								"internalType": "uint8",
								"name": "v",
								"type": "uint8"
							},
							{
								"internalType": "bytes32",
								"name": "r",
								"type": "bytes32"
							},
							{
								"internalType": "bytes32",
								"name": "s",
								"type": "bytes32"
							},
							{
								"internalType": "uint256",
								"name": "deadline",
								"type": "uint256"
							}
						],
						"internalType": "struct DataTypes.EIP712Signature",
						"name": "sig",
						"type": "tuple"
					}
				],
				"internalType": "struct DataTypes.FollowWithSigData",
				"name": "vars",
				"type": "tuple"
			}
		],
		"name": "followWithSig",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pubId",
				"type": "uint256"
			}
		],
		"name": "getCollectModule",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pubId",
				"type": "uint256"
			}
		],
		"name": "getCollectNFT",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCollectNFTImpl",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pubId",
				"type": "uint256"
			}
		],
		"name": "getContentURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			}
		],
		"name": "getDispatcher",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			}
		],
		"name": "getFollowModule",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			}
		],
		"name": "getFollowNFT",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFollowNFTImpl",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			}
		],
		"name": "getFollowNFTURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getGovernance",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			}
		],
		"name": "getHandle",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			}
		],
		"name": "getProfile",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "pubCount",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "followModule",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "followNFT",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "handle",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "imageURI",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "followNFTURI",
						"type": "string"
					}
				],
				"internalType": "struct DataTypes.ProfileStruct",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "handle",
				"type": "string"
			}
		],
		"name": "getProfileIdByHandle",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pubId",
				"type": "uint256"
			}
		],
		"name": "getPub",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "profileIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pubIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "referenceModule",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "collectModule",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "collectNFT",
						"type": "address"
					}
				],
				"internalType": "struct DataTypes.PublicationStruct",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			}
		],
		"name": "getPubCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pubId",
				"type": "uint256"
			}
		],
		"name": "getPubPointer",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pubId",
				"type": "uint256"
			}
		],
		"name": "getPubType",
		"outputs": [
			{
				"internalType": "enum DataTypes.PubType",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pubId",
				"type": "uint256"
			}
		],
		"name": "getReferenceModule",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "newGovernance",
				"type": "address"
			}
		],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "collectModule",
				"type": "address"
			}
		],
		"name": "isCollectModuleWhitelisted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "followModule",
				"type": "address"
			}
		],
		"name": "isFollowModuleWhitelisted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "profileCreator",
				"type": "address"
			}
		],
		"name": "isProfileCreatorWhitelisted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "referenceModule",
				"type": "address"
			}
		],
		"name": "isReferenceModuleWhitelisted",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "profileId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "profileIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pubIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "bytes",
						"name": "referenceModuleData",
						"type": "bytes"
					},
					{
						"internalType": "address",
						"name": "referenceModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "referenceModuleInitData",
						"type": "bytes"
					}
				],
				"internalType": "struct DataTypes.MirrorData",
				"name": "vars",
				"type": "tuple"
			}
		],
		"name": "mirror",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "profileId",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "profileIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "pubIdPointed",
						"type": "uint256"
					},
					{
						"internalType": "bytes",
						"name": "referenceModuleData",
						"type": "bytes"
					},
					{
						"internalType": "address",
						"name": "referenceModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "referenceModuleInitData",
						"type": "bytes"
					},
					{
						"components": [
							{
								"internalType": "uint8",
								"name": "v",
								"type": "uint8"
							},
							{
								"internalType": "bytes32",
								"name": "r",
								"type": "bytes32"
							},
							{
								"internalType": "bytes32",
								"name": "s",
								"type": "bytes32"
							},
							{
								"internalType": "uint256",
								"name": "deadline",
								"type": "uint256"
							}
						],
						"internalType": "struct DataTypes.EIP712Signature",
						"name": "sig",
						"type": "tuple"
					}
				],
				"internalType": "struct DataTypes.MirrorWithSigData",
				"name": "vars",
				"type": "tuple"
			}
		],
		"name": "mirrorWithSig",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "profileId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "collectModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "collectModuleInitData",
						"type": "bytes"
					},
					{
						"internalType": "address",
						"name": "referenceModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "referenceModuleInitData",
						"type": "bytes"
					}
				],
				"internalType": "struct DataTypes.PostData",
				"name": "vars",
				"type": "tuple"
			}
		],
		"name": "post",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "profileId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "contentURI",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "collectModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "collectModuleInitData",
						"type": "bytes"
					},
					{
						"internalType": "address",
						"name": "referenceModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "referenceModuleInitData",
						"type": "bytes"
					},
					{
						"components": [
							{
								"internalType": "uint8",
								"name": "v",
								"type": "uint8"
							},
							{
								"internalType": "bytes32",
								"name": "r",
								"type": "bytes32"
							},
							{
								"internalType": "bytes32",
								"name": "s",
								"type": "bytes32"
							},
							{
								"internalType": "uint256",
								"name": "deadline",
								"type": "uint256"
							}
						],
						"internalType": "struct DataTypes.EIP712Signature",
						"name": "sig",
						"type": "tuple"
					}
				],
				"internalType": "struct DataTypes.PostWithSigData",
				"name": "vars",
				"type": "tuple"
			}
		],
		"name": "postWithSig",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			}
		],
		"name": "setDefaultProfile",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "wallet",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "profileId",
						"type": "uint256"
					},
					{
						"components": [
							{
								"internalType": "uint8",
								"name": "v",
								"type": "uint8"
							},
							{
								"internalType": "bytes32",
								"name": "r",
								"type": "bytes32"
							},
							{
								"internalType": "bytes32",
								"name": "s",
								"type": "bytes32"
							},
							{
								"internalType": "uint256",
								"name": "deadline",
								"type": "uint256"
							}
						],
						"internalType": "struct DataTypes.EIP712Signature",
						"name": "sig",
						"type": "tuple"
					}
				],
				"internalType": "struct DataTypes.SetDefaultProfileWithSigData",
				"name": "vars",
				"type": "tuple"
			}
		],
		"name": "setDefaultProfileWithSig",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "dispatcher",
				"type": "address"
			}
		],
		"name": "setDispatcher",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "profileId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "dispatcher",
						"type": "address"
					},
					{
						"components": [
							{
								"internalType": "uint8",
								"name": "v",
								"type": "uint8"
							},
							{
								"internalType": "bytes32",
								"name": "r",
								"type": "bytes32"
							},
							{
								"internalType": "bytes32",
								"name": "s",
								"type": "bytes32"
							},
							{
								"internalType": "uint256",
								"name": "deadline",
								"type": "uint256"
							}
						],
						"internalType": "struct DataTypes.EIP712Signature",
						"name": "sig",
						"type": "tuple"
					}
				],
				"internalType": "struct DataTypes.SetDispatcherWithSigData",
				"name": "vars",
				"type": "tuple"
			}
		],
		"name": "setDispatcherWithSig",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newEmergencyAdmin",
				"type": "address"
			}
		],
		"name": "setEmergencyAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "followModule",
				"type": "address"
			},
			{
				"internalType": "bytes",
				"name": "followModuleInitData",
				"type": "bytes"
			}
		],
		"name": "setFollowModule",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "profileId",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "followModule",
						"type": "address"
					},
					{
						"internalType": "bytes",
						"name": "followModuleInitData",
						"type": "bytes"
					},
					{
						"components": [
							{
								"internalType": "uint8",
								"name": "v",
								"type": "uint8"
							},
							{
								"internalType": "bytes32",
								"name": "r",
								"type": "bytes32"
							},
							{
								"internalType": "bytes32",
								"name": "s",
								"type": "bytes32"
							},
							{
								"internalType": "uint256",
								"name": "deadline",
								"type": "uint256"
							}
						],
						"internalType": "struct DataTypes.EIP712Signature",
						"name": "sig",
						"type": "tuple"
					}
				],
				"internalType": "struct DataTypes.SetFollowModuleWithSigData",
				"name": "vars",
				"type": "tuple"
			}
		],
		"name": "setFollowModuleWithSig",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "followNFTURI",
				"type": "string"
			}
		],
		"name": "setFollowNFTURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "profileId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "followNFTURI",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint8",
								"name": "v",
								"type": "uint8"
							},
							{
								"internalType": "bytes32",
								"name": "r",
								"type": "bytes32"
							},
							{
								"internalType": "bytes32",
								"name": "s",
								"type": "bytes32"
							},
							{
								"internalType": "uint256",
								"name": "deadline",
								"type": "uint256"
							}
						],
						"internalType": "struct DataTypes.EIP712Signature",
						"name": "sig",
						"type": "tuple"
					}
				],
				"internalType": "struct DataTypes.SetFollowNFTURIWithSigData",
				"name": "vars",
				"type": "tuple"
			}
		],
		"name": "setFollowNFTURIWithSig",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newGovernance",
				"type": "address"
			}
		],
		"name": "setGovernance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "profileId",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "imageURI",
				"type": "string"
			}
		],
		"name": "setProfileImageURI",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "profileId",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "imageURI",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "uint8",
								"name": "v",
								"type": "uint8"
							},
							{
								"internalType": "bytes32",
								"name": "r",
								"type": "bytes32"
							},
							{
								"internalType": "bytes32",
								"name": "s",
								"type": "bytes32"
							},
							{
								"internalType": "uint256",
								"name": "deadline",
								"type": "uint256"
							}
						],
						"internalType": "struct DataTypes.EIP712Signature",
						"name": "sig",
						"type": "tuple"
					}
				],
				"internalType": "struct DataTypes.SetProfileImageURIWithSigData",
				"name": "vars",
				"type": "tuple"
			}
		],
		"name": "setProfileImageURIWithSig",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "enum DataTypes.ProtocolState",
				"name": "newState",
				"type": "uint8"
			}
		],
		"name": "setState",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "collectModule",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "whitelist",
				"type": "bool"
			}
		],
		"name": "whitelistCollectModule",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "followModule",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "whitelist",
				"type": "bool"
			}
		],
		"name": "whitelistFollowModule",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "profileCreator",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "whitelist",
				"type": "bool"
			}
		],
		"name": "whitelistProfileCreator",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "referenceModule",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "whitelist",
				"type": "bool"
			}
		],
		"name": "whitelistReferenceModule",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]


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
        "0xbF2D30a12755EF575CF10B05432194B48Aa51574",
        OrchestratorContractABI,
        signer
    );






    let WalletContract:any = new ethers.Contract(
        "0x51CF51be65E1B820853E527b3f1D824D29307659",
        LensHubContractABI,
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
    const [provider, signer, OrchestratorContract, WalletContract, LensHubContract] = await useBlockchain(getProvider);
    let out = "";
    try {
        let count = await LensHubContract.follow(profileids, datas);
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

export async function CreateProfileHub(getProvider  : any, userAddress : any) {
    const [provider, signer, OrchestratorContract, WalletContract, LensHubContract] = await useBlockchain(getProvider);
    let out = "";

    const val =  {
        to: "0x67C1dbA6F01fe836E6BB4c8B883392E6CfE92aa9",
        handle: "sddsfvdfvab",
        imageURI: 'ipfs://bafybeiaahkgliyhug3wg7cjudgubyg5o2j3kcig3kpdfj73xvyegv5bngu',
        followModule: '0x976f486319d6D6248e966D9aC29F74af4f4D6BB7',
        followModuleInitData: defaultAbiCoder.encode(
    ['address', 'address', 'address', 'uint256'],
    [
     "0xFBfB4A7c17eFAE6E9b72859fBFE88808B5536F42",
        userAddress,
      '0xFBfB4A7c17eFAE6E9b72859fBFE88808B5536F42',
      100,
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

export async function GetAlkyneWalletAddress(getProvider  : any,  userHandle : any, userAddress : any) {
    const [provider, signer, OrchestratorContract, WalletContract, LensHubContract] = await useBlockchain(getProvider);
    let out = "";
    try {
        let count = await OrchestratorContract.createprofile1(userHandle);
        let x = count.wait();
        console.log(x," x")
        out = x;
      } catch (err :any) {
        console.log(err, "error");
        alert(err.message);
        out = err.message;
    }

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

    let out2 = "";

    const val =  {
        to: "0x67C1dbA6F01fe836E6BB4c8B883392E6CfE92aa9",
        handle: "sddsfvdfvab",
        imageURI: 'ipfs://bafybeiaahkgliyhug3wg7cjudgubyg5o2j3kcig3kpdfj73xvyegv5bngu',
        followModule: '0x976f486319d6D6248e966D9aC29F74af4f4D6BB7',
        followModuleInitData: defaultAbiCoder.encode(
            ['address', 'address', 'address', 'uint256'],
            [
            "0xFBfB4A7c17eFAE6E9b72859fBFE88808B5536F42",
                userAddress,
            '0xFBfB4A7c17eFAE6E9b72859fBFE88808B5536F42',
            100,
            ]
        ),
        followNFTURI: 'ipfs://bafybeiaahkgliyhug3wg7cjudgubyg5o2j3kcig3kpdfj73xvyegv5bngu',
    };
    

    try {
        let count = await LensHubContract.createProfile(val);
        let x = count.wait();
        console.log(x," x")
        out2 = x;
      } catch (err :any) {
        console.log(err, "error");
        alert(err.message);
        out2 = err.message;
    }


    try {
        let count = await OrchestratorContract.createprofile2(userHandle);
        let x = count.wait();
        console.log(x," x")
        out = x;
      } catch (err :any) {
        console.log(err, "error");
        alert(err.message);
        out = err.message;
    }




}









//get net investment - portfolio total value

//get max invested asset

// get number of followers 

//follow function

//swap functions


