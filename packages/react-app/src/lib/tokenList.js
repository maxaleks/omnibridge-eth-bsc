// import schema from '@uniswap/token-lists/src/tokenlist.schema.json';
// import Ajv from 'ajv';
import { gql, request } from 'graphql-request';

import {
  getBridgeNetwork,
  getGraphEndpoint,
  getTokenListUrl,
  uniqueTokens,
} from './helpers';
import { fetchTokenDetails } from './token';

export const fetchTokenList = async chainId => {
  const [defaultTokens, subgraphTokens] = await Promise.all([
    fetchDefaultTokens(chainId),
    fetchTokensFromSubgraph(chainId),
  ]);
  const tokens = uniqueTokens(defaultTokens.concat(subgraphTokens));
  return tokens;
};

// const tokenListValidator = new Ajv({ allErrors: true }).compile(schema);

export const fetchDefaultTokens = async chainId => {
  const url = getTokenListUrl(chainId);
  if (url) {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      // if (tokenListValidator(json)) {
      //   return json.tokens.filter(token => token.chainId === chainId);
      // }
      if (chainId === 56) {
        json.tokens = json.tokens.map(token => ({ ...token, chainId }));
      }
      return json.tokens.filter(token => token.chainId === chainId);
    }
  }
  return [];
};

const homeTokensQuery = gql`
  query homeTokens {
    tokens(where: { homeAddress_contains: "0x" }) {
      chainId: homeChainId
      address: homeAddress
      # name: homeName
      # symbol
      # decimals
    }
  }
`;

const foreignTokensQuery = gql`
  query foreignTokens {
    tokens(where: { foreignAddress_contains: "0x" }) {
      chainId: foreignChainId
      address: foreignAddress
      # name: foreignName
      # symbol
      # decimals
    }
  }
`;

export const fetchTokensFromSubgraph = async chainId => {
  const homeEndpoint = getGraphEndpoint(chainId);
  const foreignChainId = getBridgeNetwork(chainId);
  const foreignEndpoint = getGraphEndpoint(foreignChainId);
  const [homeData, foreignData] = await Promise.all([
    request(homeEndpoint, homeTokensQuery),
    request(foreignEndpoint, foreignTokensQuery),
  ]);
  const homeTokens = homeData && homeData.tokens ? homeData.tokens : [];
  const foreignTokens =
    foreignData && foreignData.tokens ? foreignData.tokens : [];
  // return homeTokens.concat(foreignTokens);

  const cachedTokenList = window.localStorage.getItem(`tokens-${chainId}`);
  let cachedTokens = [];
  if (cachedTokenList && cachedTokenList.length > 0) {
    cachedTokens = JSON.parse(cachedTokenList);
  }

  let tokens = homeTokens.concat(foreignTokens);
  tokens = tokens.filter(token => {
    return !cachedTokens.find(
      cached => cached.address.toLowerCase() === token.address.toLowerCase(),
    );
  });
  tokens = await Promise.all(
    tokens.map(async ({ address, chainId: tokenChainId }) =>
      fetchTokenDetails({ address, chainId: tokenChainId }),
    ),
  );
  return tokens.concat(cachedTokens);
};
