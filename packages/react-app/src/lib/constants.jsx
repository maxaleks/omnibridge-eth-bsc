import { BigNumber } from 'ethers';
import React from 'react';

import { NetworkIcon } from '../icons/NetworkIcon';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export const LARGEST_UINT256 = BigNumber.from(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
);

export const POLLING_INTERVAL =
  process.env.REACT_APP_UI_STATUS_UPDATE_INTERVAL || 1000;

export const HOME_NETWORK = 56;

// export const networkOptions = [ // prod
//   {
//     value: 100,
//     key: 0,
//     bridge: { chainId: 1, name: 'ETH Mainnet' },
//     label: 'xDai',
//     name: 'xDai Chain',
//     icon: <NetworkIcon />,
//   },
//   {
//     value: 1,
//     key: 1,
//     bridge: { chainId: 100, name: 'xDai Chain' },
//     label: 'Mainnet',
//     name: 'ETH Mainnet',
//     icon: <NetworkIcon />,
//   },
// ];
export const networkOptions = [
  // stage
  {
    value: 56,
    key: 0,
    bridge: { chainId: 1, name: 'ETH Mainnet' },
    label: 'Binance Smart Chain',
    name: 'Binance Smart Chain',
    icon: <NetworkIcon />,
  },
  {
    value: 1,
    key: 1,
    bridge: { chainId: 56, name: 'Binance Smart Chain' },
    label: 'Mainnet',
    name: 'ETH Mainnet',
    icon: <NetworkIcon />,
  },
  // {
  //   value: 100,
  //   key: 0,
  //   bridge: { chainId: 1, name: 'ETH Mainnet' },
  //   label: 'xDai',
  //   name: 'xDai Chain',
  //   icon: <NetworkIcon />,
  // },
  // {
  //   value: 1,
  //   key: 1,
  //   bridge: { chainId: 100, name: 'xDai Chain' },
  //   label: 'Mainnet',
  //   name: 'ETH Mainnet',
  //   icon: <NetworkIcon />,
  // },
  // {
  //   value: 77,
  //   key: 2,
  //   bridge: { chainId: 42, name: 'Kovan Testnet' },
  //   label: 'Sokol',
  //   name: 'Sokol Testnet',
  //   icon: <NetworkIcon />,
  // },
  // {
  //   value: 42,
  //   key: 3,
  //   bridge: { chainId: 77, name: 'Sokol Testnet' },
  //   label: 'Kovan',
  //   name: 'Kovan Testnet',
  //   icon: <NetworkIcon />,
  // },
];

export const networkNames = {
  100: 'xDai Chain',
  1: 'ETH Mainnet',
  77: 'Sokol Testnet',
  42: 'Kovan Testnet',
  56: 'Binance Smart Chain',
};

export const networkLabels = {
  1: 'Mainnet',
  42: 'Kovan',
  56: 'BSC',
  77: 'Sokol',
  100: 'xDai',
};

export const chainUrls = {
  100: {
    rpc: 'https://xdai.poanetwork.dev',
    explorer: 'https://blockscout.com/poa/xdai',
    chainId: 100,
    name: 'xDai Chain',
  },
  1: {
    rpc: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
    explorer: 'https://etherscan.io',
    chainId: 1,
    name: 'ETH Mainnet',
    monitor: 'http://alm-bsc.herokuapp.com',
  },
  77: {
    rpc: 'https://sokol.poa.network',
    explorer: 'https://blockscout.com/poa/sokol',
    chainId: 77,
    name: 'Sokol Testnet',
  },
  42: {
    rpc: `https://kovan.infura.io/v3/${process.env.REACT_APP_INFURA_ID}`,
    explorer: 'https://kovan.etherscan.io',
    chainId: 42,
    name: 'Kovan Testnet',
  },
  56: {
    rpc: 'https://bsc-dataseed.binance.org/',
    explorer: 'https://bscscan.com',
    chainId: 56,
    name: 'Binance Smart Chain',
    monitor: 'http://alm-bsc.herokuapp.com',
  },
};

export const defaultTokens = {
  100: {
    name: 'Stake on xDai',
    address: '0xb7D311E2Eb55F2f68a9440da38e7989210b9A05e',
    symbol: 'STAKE',
    decimals: 18,
    chainId: 100,
  },
  1: {
    name: 'STAKE',
    address: '0x0Ae055097C6d159879521C384F1D2123D1f195e6',
    symbol: 'STAKE',
    decimals: 18,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0Ae055097C6d159879521C384F1D2123D1f195e6/logo.png',
  },
  77: {
    name: 'FaucetToken on xDai',
    address: '0x1b457c787792d17bea8d41885ada00e764712cdd',
    symbol: 'FAU',
    decimals: 18,
    chainId: 77,
  },
  42: {
    name: 'FaucetToken',
    address: '0xfab46e002bbf0b4509813474841e0716e6730136',
    symbol: 'FAU',
    decimals: 18,
    chainId: 42,
  },
  56: {
    name: 'STAKE on BSC',
    address: '0xe55e614862694214f0339adb551393cb56149323',
    symbol: 'STAKE',
    decimals: 18,
    chainId: 56,
  },
};

export const graphEndpoints = {
  // 100: 'https://api.thegraph.com/subgraphs/name/dan13ram/xdai-omnibridge',
  // 1: 'https://api.thegraph.com/subgraphs/name/dan13ram/mainnet-omnibridge',
  // 77: 'https://api.thegraph.com/subgraphs/name/dan13ram/sokol-omnibridge',
  // 42: 'https://api.thegraph.com/subgraphs/name/dan13ram/kovan-omnibridge',
  1: 'https://api.thegraph.com/subgraphs/name/maxaleks/mainnet-to-bsc-omnibridge',
  56: 'https://api.bscgraph.org/subgraphs/name/bsc-to-mainnet-omnibridge',
};

export const mediators = {
  // 42: '0xA960d095470f7509955d5402e36d9DB984B5C8E2',
  // 77: '0x40CdfF886715A4012fAD0219D15C98bB149AeF0e',
  // 1: '0x88ad09518695c6c3712AC10a214bE5109a655671',
  // 100: '0xf6A78083ca3e2a662D6dd1703c939c8aCE2e268d',
  1: '0x69c707d975e8d883920003CC357E556a4732CD03',
  56: '0xD83893F31AA1B6B9D97C9c70D3492fe38D24d218',
};

export const ambs = {
  // 42: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560',
  // 77: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560',
  // 1: '0x4C36d2919e407f0Cc2Ee3c993ccF8ac26d9CE64e',
  // 100: '0x75Df5AF045d91108662D8080fD1FEFAd6aA0bb59',
  1: '0x07955be2967B655Cf52751fCE7ccC8c61EA594e2',
  56: '0x6943A218d58135793F1FE619414eD476C37ad65a',
};

export const defaultTokensUrl = {
  100: 'https://tokens.honeyswap.org',
  1: 'https://tokens.uniswap.org',
  42: '',
  77: '',
  56: '',
};
