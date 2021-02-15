import { BigNumber } from 'ethers';

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export const LARGEST_UINT256 = BigNumber.from(
  '115792089237316195423570985008687907853269984665640564039457584007913129639935',
);

export const POLLING_INTERVAL =
  process.env.REACT_APP_UI_STATUS_UPDATE_INTERVAL || 1000;

export const HOME_NETWORK = 100;

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
      'https://alm-bsc-xdai.herokuapp.com',
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
      'https://alm-xdai.herokuapp.com',
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
      'https://alm-bsc-xdai.herokuapp.com',
    chainId: 56,
    name: networkNames[56],
  },
};

export const defaultTokens = {
  100: {
    address: '0xCa8d20f3e0144a72C6B5d576e9Bd3Fd8557E2B04',
    chainId: 100,
    name: 'Wrapped BNB on xDai',
    symbol: 'WBNB',
  },
  1: {
    address: '0x0Ae055097C6d159879521C384F1D2123D1f195e6',
    chainId: 1,
    name: 'STAKE',
    symbol: 'STAKE',
  },
  77: {
    address: '0x408ec1bb883da0ea0fb3c955ea6befcd05aa7c3a',
    chainId: 77,
    name: 'STAKE',
    symbol: 'STAKE',
  },
  42: {
    address: '0xFD2df5dCe4c89B007A43CF88d8161dAf1A17C7AB',
    chainId: 42,
    name: 'STAKE',
    symbol: 'STAKE',
  },
  56: {
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    chainId: 56,
    name: 'Wrapped BNB',
    symbol: 'WBNB',
  },
};

export const subgraphNames = {
  100: 'maxaleks/xdai-to-bsc-omnibridge',
  1: 'raid-guild/mainnet-omnibridge',
  77: 'dan13ram/sokol-omnibridge',
  42: 'dan13ram/kovan-omnibridge',
  56: 'bsc-to-xdai-omnibridge',
};

export const graphEndpoints = {
  100: `https://api.thegraph.com/subgraphs/name/${subgraphNames[100]}`,
  1: `https://api.thegraph.com/subgraphs/name/${subgraphNames[1]}`,
  77: `https://api.thegraph.com/subgraphs/name/${subgraphNames[77]}`,
  42: `https://api.thegraph.com/subgraphs/name/${subgraphNames[42]}`,
  56: `https://api.bscgraph.org/subgraphs/name/${subgraphNames[56]}`,
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
    '0x88ad09518695c6c3712AC10a214bE5109a655671',
  100:
    process.env.REACT_APP_HOME_MEDIATOR_ADDRESS ||
    '0x59447362798334d3485c64D1e4870Fde2DDC0d75',
  56:
    process.env.REACT_APP_FOREIGN_MEDIATOR_ADDRESS ||
    '0xF0b456250DC9990662a6F25808cC74A6d1131Ea9',
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
    '0x4C36d2919e407f0Cc2Ee3c993ccF8ac26d9CE64e',
  100:
    process.env.REACT_APP_HOME_AMB_ADDRESS ||
    '0x162E898bD0aacB578C8D5F8d6ca588c13d2A383F',
  56:
    process.env.REACT_APP_FOREIGN_AMB_ADDRESS ||
    '0x05185872898b6f94AA600177EF41B9334B1FA48B',
};

export const REVERSE_BRIDGE_ENABLED =
  process.env.REACT_APP_ENABLE_REVERSED_BRIDGE === 'true';

export const defaultTokensUrl = {
  100: 'https://tokens.honeyswap.org',
  1: 'https://tokens.uniswap.org',
  42: '',
  77: '',
  56: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/smartchain/tokenlist.json',
};

export const GRAPH_HEALTH_ENDPOINT =
  'https://api.thegraph.com/index-node/graphql';
