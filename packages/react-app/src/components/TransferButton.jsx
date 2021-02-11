import { Flex, Image, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { utils } from 'ethers';
import React, { useContext } from 'react';

import TransferIcon from '../assets/transfer.svg';
import { BridgeContext } from '../contexts/BridgeContext';
import { Web3Context } from '../contexts/Web3Context';
import { formatValue, isxDaiChain } from '../lib/helpers';
import { ConfirmTransferModal } from './ConfirmTransferModal';
import { isNativexDaiAddress } from './ReverseWarning';

export const TransferButton = () => {
  const { ethersProvider } = useContext(Web3Context);
  const {
    receiver,
    fromAmount: amount,
    fromToken: token,
    toToken,
    fromBalance: balance,
    tokenLimits,
    allowed,
  } = useContext(BridgeContext);
  const isxDai = token && token.chainId && isxDaiChain(token.chainId);
  const isNativexDaiToken = isNativexDaiAddress(toToken);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const showError = msg => {
    if (msg) {
      toast({
        title: 'Error',
        description: msg,
        status: 'error',
        isClosable: 'true',
      });
    }
  };
  const valid = () => {
    if (!ethersProvider) {
      showError('Please connect wallet');
    } else if (tokenLimits && amount.lt(tokenLimits.minPerTx)) {
      showError(
        `Please specify amount more than ${formatValue(
          tokenLimits.minPerTx,
          token.decimals,
        )}`,
      );
    } else if (tokenLimits && amount.gt(tokenLimits.maxPerTx)) {
      showError(
        `Please specify amount less than ${formatValue(
          tokenLimits.maxPerTx,
          token.decimals,
        )}`,
      );
    } else if (balance.lt(amount)) {
      showError('Not enough balance');
    } else if (receiver && !utils.isAddress(receiver)) {
      showError(`Please specify a valid recipient address`);
    } else if (isNativexDaiToken) {
      showError(`Token is native ERC20 on xDai chain`);
    } else {
      return true;
    }
    return false;
  };
  const onClick = () => {
    if (allowed && valid()) {
      onOpen();
    }
  };
  return (
    <Flex
      as="button"
      align="center"
      mt={{ base: 2, md: 2, lg: 3 }}
      color={isxDai ? 'purple.300' : 'blue.500'}
      _hover={
        !allowed
          ? undefined
          : {
              color: isxDai ? 'purple.400' : 'blue.600',
            }
      }
      cursor={!allowed ? 'not-allowed' : 'pointer'}
      transition="0.25s"
      position="relative"
      opacity={!allowed ? 0.4 : 1}
      onClick={onClick}
      borderRadius="0.25rem"
      w={{ base: '10rem', sm: '12rem', lg: 'auto' }}
    >
      <ConfirmTransferModal isOpen={isOpen} onClose={onClose} />
      <svg width="100%" viewBox="0 0 156 42" fill="none">
        <path
          d="M16.914 2.28A4 4 0 0120.526 0h114.948a4 4 0 013.612 2.28l16.19 34c1.264 2.655-.671 5.72-3.611 5.72H4.335C1.395 42-.54 38.935.724 36.28l16.19-34z"
          fill="currentColor"
        />
      </svg>
      <Flex
        position="absolute"
        w="100%"
        h="100%"
        justify="center"
        align="center"
      >
        <Text color="white" fontWeight="bold">
          {isxDai ? 'Request' : 'Transfer'}
        </Text>
        <Image src={TransferIcon} ml={2} />
      </Flex>
    </Flex>
  );
};
