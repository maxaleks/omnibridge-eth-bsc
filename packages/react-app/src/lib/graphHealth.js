import { gql, request } from 'graphql-request';

import { GRAPH_HEALTH_ENDPOINT, HOME_NETWORK } from './constants';
import { getBridgeNetwork, getSubgraphName, logError } from './helpers';

const FOREIGN_NETWORK = getBridgeNetwork(HOME_NETWORK);

const HOME_SUBGRAPH = getSubgraphName(HOME_NETWORK);
const FOREIGN_SUBGRAPH = getSubgraphName(FOREIGN_NETWORK);

const healthQuery = gql`
  query getHealthStatus($subgraph: String!) {
    indexingStatusForCurrentVersion(subgraphName: $subgraph) {
      synced
      health
      fatalError {
        message
        block {
          number
          hash
        }
        handler
      }
      chains {
        chainHeadBlock {
          number
        }
        latestBlock {
          number
        }
      }
    }
  }
`;

const extractStatus = ({ fatalError, synced, chains }) => ({
  isReachable: true,
  isFailed: !!fatalError,
  isSynced: synced,
  latestBlockNumber: Number(chains[0].latestBlock.number),
});

const failedStatus = {
  isReachable: false,
  isFailed: true,
  isSynced: false,
  latestBlockNumber: 0,
};

export const getHealthStatus = async () => {
  try {
    const [homeData, foreignData] = await Promise.all([
      request(GRAPH_HEALTH_ENDPOINT, healthQuery, { subgraph: HOME_SUBGRAPH }),
      request('https://api.bscgraph.org/graphql', healthQuery, {
        subgraph: FOREIGN_SUBGRAPH,
      }),
    ]);
    return {
      homeHealth: extractStatus(homeData.indexingStatusForCurrentVersion),
      foreignHealth: extractStatus(foreignData.indexingStatusForCurrentVersion),
    };
  } catch (graphHealthError) {
    logError({ graphHealthError });
  }
  return {
    homeHealth: failedStatus,
    foreignHealth: failedStatus,
  };
};
