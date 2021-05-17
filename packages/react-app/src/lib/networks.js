export const ETH_XDAI_BRIDGE = 'eth-xdai';
export const BSC_XDAI_BRIDGE = 'bsc-xdai';
export const KOVAN_SOKOL_BRIDGE = 'kovan-sokol';
export const ETH_BSC_BRIDGE = 'eth-bsc';

const ETH_XDAI_BRIDGE_CONFIG = {
  label: 'eth⥊xdai',
  homeChainId: 100,
  foreignChainId: 1,
  enableReversedBridge: false,
  enableForeignCurrencyBridge: false,
  foreignMediatorAddress: '0x88ad09518695c6c3712AC10a214bE5109a655671'.toLowerCase(),
  homeMediatorAddress: '0xf6A78083ca3e2a662D6dd1703c939c8aCE2e268d'.toLowerCase(),
  foreignAmbAddress: '0x4C36d2919e407f0Cc2Ee3c993ccF8ac26d9CE64e'.toLowerCase(),
  homeAmbAddress: '0x75Df5AF045d91108662D8080fD1FEFAd6aA0bb59'.toLowerCase(),
  foreignGraphName: 'raid-guild/mainnet-omnibridge',
  homeGraphName: 'raid-guild/xdai-omnibridge',
  ambLiveMonitorPrefix: 'https://alm-xdai.herokuapp.com',
};

const BSC_XDAI_BRIDGE_CONFIG = {
  label: 'bsc⥊xdai',
  homeChainId: 100,
  foreignChainId: 56,
  enableReversedBridge: true,
  enableForeignCurrencyBridge: true,
  foreignMediatorAddress: '0xF0b456250DC9990662a6F25808cC74A6d1131Ea9'.toLowerCase(),
  homeMediatorAddress: '0x59447362798334d3485c64D1e4870Fde2DDC0d75'.toLowerCase(),
  foreignAmbAddress: '0x05185872898b6f94AA600177EF41B9334B1FA48B'.toLowerCase(),
  homeAmbAddress: '0x162E898bD0aacB578C8D5F8d6ca588c13d2A383F'.toLowerCase(),
  foreignGraphName: 'maxaleks/bsc-to-xdai-omnibridge',
  homeGraphName: 'maxaleks/xdai-to-bsc-omnibridge',
  ambLiveMonitorPrefix: 'https://alm-bsc-xdai.herokuapp.com',
};

const KOVAN_SOKOL_BRIDGE_CONFIG = {
  label: 'kovan⥊sokol',
  homeChainId: 77,
  foreignChainId: 42,
  enableReversedBridge: true,
  enableForeignCurrencyBridge: true,
  foreignMediatorAddress: '0xA960d095470f7509955d5402e36d9DB984B5C8E2'.toLowerCase(),
  homeMediatorAddress: '0x40CdfF886715A4012fAD0219D15C98bB149AeF0e'.toLowerCase(),
  foreignAmbAddress: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560'.toLowerCase(),
  homeAmbAddress: '0xFe446bEF1DbF7AFE24E81e05BC8B271C1BA9a560'.toLowerCase(),
  foreignGraphName: 'dan13ram/kovan-omnibridge',
  homeGraphName: 'dan13ram/sokol-omnibridge',
  ambLiveMonitorPrefix: 'https://alm-test-amb.herokuapp.com',
};

const ETH_BSC_BRIDGE_CONFIG = {
  label: 'eth⥊bsc',
  homeChainId: 56,
  foreignChainId: 1,
  enableReversedBridge: true,
  foreignMediatorAddress: '0x69c707d975e8d883920003CC357E556a4732CD03'.toLowerCase(),
  homeMediatorAddress: '0xD83893F31AA1B6B9D97C9c70D3492fe38D24d218'.toLowerCase(),
  foreignAmbAddress: '0x07955be2967B655Cf52751fCE7ccC8c61EA594e2'.toLowerCase(),
  homeAmbAddress: '0x6943A218d58135793F1FE619414eD476C37ad65a'.toLowerCase(),
  foreignGraphName: 'maxaleks/mainnet-to-bsc-omnibridge',
  homeGraphName: 'maxaleks/bsc-to-mainnet-omnibridge',
  ambLiveMonitorPrefix: 'http://alm-bsc.herokuapp.com',
};

const ENABLE_SOKOL = process.env.REACT_APP_ENABLE_SOKOL_BRIDGE === 'true';

export const networks = ENABLE_SOKOL
  ? {
      [ETH_XDAI_BRIDGE]: ETH_XDAI_BRIDGE_CONFIG,
      [BSC_XDAI_BRIDGE]: BSC_XDAI_BRIDGE_CONFIG,
      [KOVAN_SOKOL_BRIDGE]: KOVAN_SOKOL_BRIDGE_CONFIG,
    }
  : {
      // [ETH_XDAI_BRIDGE]: ETH_XDAI_BRIDGE_CONFIG,
      // [BSC_XDAI_BRIDGE]: BSC_XDAI_BRIDGE_CONFIG,
      [ETH_BSC_BRIDGE]: ETH_BSC_BRIDGE_CONFIG,
    };
