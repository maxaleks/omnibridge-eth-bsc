import { BigNumber } from 'ethers';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export const LARGEST_UINT256 = BigNumber.from(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
);

export const POLLING_INTERVAL =
  process.env.REACT_APP_UI_STATUS_UPDATE_INTERVAL || 1000;

export const HOME_NETWORK = 56;

export const INFURA_ID = process.env.REACT_APP_INFURA_ID;

export const networkNames = {
  1: 'ETH Mainnet',
  42: 'Kovan Testnet',
  56: 'Binance Smart Chain',
  77: 'Sokol Testnet',
  100: 'xDai Chain',
};

export const networkLabels = {
  1: 'Mainnet',
  42: 'Kovan',
  56: 'Binance Smart Chain',
  77: 'Sokol',
  100: 'xDai',
};

export const chainUrls = {
  100: {
    rpc: process.env.REACT_APP_HOME_RPC_URL || 'https://xdai.poanetwork.dev',
    explorer:
      process.env.REACT_APP_HOME_EXPLORER_PREFIX ||
      'https://blockscout.com/poa/xdai',
    monitor:
      process.env.REACT_APP_AMB_LIVE_MONITOR_PREFIX ||
      'https://alm-xdai.herokuapp.com',
    chainId: 100,
    name: networkNames[100],
  },
  1: {
    rpc:
      process.env.REACT_APP_FOREIGN_RPC_URL ||
      `https://mainnet.infura.io/v3/${INFURA_ID}`,
    explorer:
      process.env.REACT_APP_FOREIGN_EXPLORER_PREFIX ||
      'https://blockscout.com/eth/mainnet',
    monitor:
      process.env.REACT_APP_AMB_LIVE_MONITOR_PREFIX ||
      'http://alm-bsc.herokuapp.com',
    chainId: 1,
    name: networkNames[1],
  },
  77: {
    rpc: process.env.REACT_APP_HOME_RPC_URL || 'https://sokol.poa.network',
    explorer:
      process.env.REACT_APP_HOME_EXPLORER_PREFIX ||
      'https://blockscout.com/poa/sokol',
    monitor:
      process.env.REACT_APP_AMB_LIVE_MONITOR_PREFIX ||
      'https://alm-test-amb.herokuapp.com',
    chainId: 77,
    name: networkNames[77],
  },
  42: {
    rpc:
      process.env.REACT_APP_FOREIGN_RPC_URL ||
      `https://kovan.infura.io/v3/${INFURA_ID}`,
    explorer:
      process.env.REACT_APP_FOREIGN_EXPLORER_PREFIX ||
      'https://blockscout.com/eth/kovan',
    monitor:
      process.env.REACT_APP_AMB_LIVE_MONITOR_PREFIX ||
      'https://alm-test-amb.herokuapp.com',
    chainId: 42,
    name: networkNames[42],
  },
  56: {
    rpc:
      process.env.REACT_APP_FOREIGN_RPC_URL ||
      'https://bsc-dataseed.binance.org/',
    explorer:
      process.env.REACT_APP_FOREIGN_EXPLORER_PREFIX || 'https://bscscan.com',
    monitor:
      process.env.REACT_APP_AMB_LIVE_MONITOR_PREFIX ||
      'http://alm-bsc.herokuapp.com',
    chainId: 56,
    name: networkNames[56],
  },
};

export const defaultTokens = {
  100: {
    name: 'Stake on xDai',
    address: '0xb7D311E2Eb55F2f68a9440da38e7989210b9A05e',
    symbol: 'STAKE',
    decimals: 18,
    chainId: 100,
    mode: 'erc677',
  },
  1: {
    name: 'STAKE',
    address: '0x0Ae055097C6d159879521C384F1D2123D1f195e6',
    symbol: 'STAKE',
    decimals: 18,
    chainId: 1,
    logoURI:
      'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0Ae055097C6d159879521C384F1D2123D1f195e6/logo.png',
    mode: 'erc20',
  },
  77: {
    address: '0x408ec1bb883da0ea0fb3c955ea6befcd05aa7c3a',
    chainId: 77,
    decimals: 18,
    mode: 'erc677',
    name: 'STAKE on xDai',
    symbol: 'STAKE',
  },
  42: {
    address: '0xFD2df5dCe4c89B007A43CF88d8161dAf1A17C7AB',
    chainId: 42,
    decimals: 18,
    mode: 'erc20',
    name: 'STAKE',
    symbol: 'STAKE',
  },
  56: {
    address: '0xe55e614862694214f0339adb551393cb56149323',
    chainId: 56,
    decimals: 18,
    mode: 'erc677',
    name: 'STAKE on BSC',
    symbol: 'STAKE',
  },
};

export const graphEndpoints = {
  100: 'https://api.thegraph.com/subgraphs/name/raid-guild/xdai-omnibridge',
  1: 'https://api.thegraph.com/subgraphs/name/maxaleks/mainnet-to-bsc-omnibridge',
  77: 'https://api.thegraph.com/subgraphs/name/dan13ram/sokol-omnibridge',
  42: 'https://api.thegraph.com/subgraphs/name/dan13ram/kovan-omnibridge',
  56: 'https://api.bscgraph.org/subgraphs/name/bsc-to-mainnet-omnibridge',
};

export const mediators = {
  42:
    process.env.REACT_APP_FOREIGN_MEDIATOR_ADDRESS ||
    '0xA960d095470f7509955d5402e36d9DB984B5C8E2',
  77:
    process.env.REACT_APP_HOME_MEDIATOR_ADDRESS ||
    '0x40CdfF886715A4012fAD0219D15C98bB149AeF0e',
  1:
    process.env.REACT_APP_FOREIGN_MEDIATOR_ADDRESS ||
    '0x69c707d975e8d883920003CC357E556a4732CD03',
  100:
    process.env.REACT_APP_HOME_MEDIATOR_ADDRESS ||
    '0xf6A78083ca3e2a662D6dd1703c939c8aCE2e268d',
  56:
    process.env.REACT_APP_HOME_MEDIATOR_ADDRESS ||
    '0xD83893F31AA1B6B9D97C9c70D3492fe38D24d218',
};

export const ambs = {
  42:
    process.env.REACT_APP_HOME_AMB_ADDRESS ||
    '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560',
  77:
    process.env.REACT_APP_FOREIGN_AMB_ADDRESS ||
    '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560',
  1:
    process.env.REACT_APP_HOME_AMB_ADDRESS ||
    '0x07955be2967B655Cf52751fCE7ccC8c61EA594e2',
  100:
    process.env.REACT_APP_FOREIGN_AMB_ADDRESS ||
    '0x75Df5AF045d91108662D8080fD1FEFAd6aA0bb59',
  56:
    process.env.REACT_APP_FOREIGN_AMB_ADDRESS ||
    '0x6943A218d58135793F1FE619414eD476C37ad65a',
};

export const defaultTokensUrl = {
  100: 'https://tokens.honeyswap.org',
  1: 'https://tokens.uniswap.org',
  42: '',
  77: '',
  56: '',
};
