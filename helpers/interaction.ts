import { defaultAbiCoder } from 'ethers/lib/utils';
import {
  FollowNFT__factory,
  LensHub__factory,
  AlkyneFollowModule__factory,
  ModuleGlobals__factory,
} from '../typechain-types';
import { CreateProfileDataStruct } from '../typechain-types/LensHub';
import {
  deployContract,
  getAddrs,
  initEnv,
  ProtocolState,
  waitForTx,
  ZERO_ADDRESS,
} from './helpers/utils';

// eslint-disable-next-line no-empty-pattern

async function Checker(){
  const CURRENCY_ADDR = '0x2dD9ce3fc29cb2d5218f003B2B4EedE996DD895F';
  let [governance, , user] = await initEnv(hre);
  user = governance;
  console.log('governance', governance.address);
  console.log('user', user.address);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);
  const moduleGlobals = ModuleGlobals__factory.connect(addrs['module globals'], governance);

  // await waitForTx(lensHub.setState(ProtocolState.Unpaused));
  // await waitForTx(lensHub.whitelistProfileCreator(user.address, true));
  // await waitForTx(moduleGlobals.whitelistCurrency(CURRENCY_ADDR, true));

  const inputStruct: CreateProfileDataStruct = {
    to: "0x67C1dbA6F01fe836E6BB4c8B883392E6CfE92aa9",
    handle: "sdvab",
    imageURI: 'ipfs://bafybeiaahkgliyhug3wg7cjudgubyg5o2j3kcig3kpdfj73xvyegv5bngu',
    followModule: '0xCC73FAAA5d08aDe7EB609D7c6BcDEc9B0f0B1009',
    followModuleInitData: defaultAbiCoder.encode(
      ['address', 'address', 'address', 'uint256'],
      [
        "0x2dD9ce3fc29cb2d5218f003B2B4EedE996DD895F",
        "0x67C1dbA6F01fe836E6BB4c8B883392E6CfE92aa9",
        '0xFBfB4A7c17eFAE6E9b72859fBFE88808B5536F42',
        100,
      ]
    ),
    followNFTURI: 'ipfs://bafybeiaahkgliyhug3wg7cjudgubyg5o2j3kcig3kpdfj73xvyegv5bngu',
  };
  console.log(await waitForTx(lensHub.connect(user).createProfile(inputStruct)));

  const secretCodeFollowModule = await deployContract(
    new AlkyneFollowModule__factory(governance).deploy(lensHub.address, moduleGlobals.address)
  );
  console.log(lensHub.address);
  await waitForTx(lensHub.whitelistFollowModule(secretCodeFollowModule.address, true));

  // wait 10 seconds
  console.log('waiting 20 seconds...', secretCodeFollowModule.address);
  // await new Promise((resolve) => setTimeout(resolve, 20000));
  // console.log('waited');

  // const data = defaultAbiCoder.encode(
  //   ['address', 'address', 'address', 'uint256'],
  //   [
  //     CURRENCY_ADDR,
  //     '0x526AFE1742c655D94cB98E6Bf9e9865112C15264',
  //     '0xFBfB4A7c17eFAE6E9b72859fBFE88808B5536F42',
  //     100,
  //   ]
  // );
  // await waitForTx(lensHub.connect(user).setFollowModule(1, secretCodeFollowModule.address, data));

  // const followData = defaultAbiCoder.encode(['uint256'], [1]);
  // await waitForTx(lensHub.connect(user).follow([1], [followData]));

  // const followNFTAddr = await lensHub.getFollowNFT(1);
  // const followNFT = FollowNFT__factory.connect(followNFTAddr, user);

  // const totalSupply = await followNFT.totalSupply();
  // const ownerOf = await followNFT.ownerOf(1);

  // console.log(Follow NFT total supply (should be 1): ${totalSupply});
  // console.log(
  //   Follow NFT owner of ID 1: ${ownerOf}, user address (should be the same): ${user.address}
  // );
};