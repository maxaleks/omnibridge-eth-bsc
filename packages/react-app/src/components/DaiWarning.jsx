import { Alert, AlertIcon, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';

import { isxDaiChain } from '../lib/helpers';

const ERC20DaiAddress = {
  100: '0x44fA8E6f47987339850636F88629646662444217',
  1: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  42: '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa',
  77: '0xa844e8c64608dede1f22f519ad0e98e2629684df',
  56: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
};

export const isERC20DaiAddress = token => {
  if (!token) {
    return false;
  }

  const isxDai = isxDaiChain(token.chainId);
  return (
    !isxDai &&
    token.address.toLowerCase() === ERC20DaiAddress[token.chainId].toLowerCase()
  );
};

const TokenLink = () => (
  <Link
    href="https://blockscout.com/poa/xdai/tokens/0xFc8B2690F66B46fEC8B3ceeb95fF4Ac35a0054BC/token-transfers"
    color="blue.500"
    isExternal
  >
    Token Address
  </Link>
);

const XDaiBridgeLink = () => (
  <Link href="https://bridge.xdaichain.com/" color="blue.500" isExternal>
    xDai Ethereum Bridge
  </Link>
);

export const DaiWarning = () => {
  return (
    <Flex align="flex-middle" direction="column">
      <Alert status="warning" borderRadius={5} mb={5}>
        <AlertIcon minWidth="20px" />
        <Text fontSize="small">
          Bridging to the DAI Token on xDai (<TokenLink />
          ). To mint native xDai coins, use the <XDaiBridgeLink />.
        </Text>
      </Alert>
    </Flex>
  );
};
