import {
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import SearchIcon from '../assets/search.svg';
import { BridgeContext } from '../contexts/BridgeContext';
import { Web3Context } from '../contexts/Web3Context';
import { PlusIcon } from '../icons/PlusIcon';
import { formatValue, logError, uniqueTokens } from '../lib/helpers';
import { fetchTokenBalanceWithProvider } from '../lib/token';
import { fetchTokenList } from '../lib/tokenList';
import { Logo } from './Logo';

export const TokenSelectorModal = ({ isOpen, onClose, onCustom }) => {
  const { account, ethersProvider, providerChainId } = useContext(Web3Context);
  const { setToken } = useContext(BridgeContext);
  const [tokenList, setTokenList] = useState([]);
  const [loading, setLoading] = useState(true);

  const setDefaultTokenList = useCallback(
    async (chainId, customTokens) => {
      try {
        const baseTokenList = await fetchTokenList(chainId);
        const customTokenList = uniqueTokens(
          baseTokenList.concat(
            customTokens.filter(token => token.chainId === chainId),
          ),
        );
        const tokenListWithBalance = await Promise.all(
          customTokenList.map(async token => ({
            ...token,
            balance: await fetchTokenBalanceWithProvider(
              ethersProvider,
              token,
              account,
            ),
          })),
        );
        const sortedTokenList = tokenListWithBalance.sort(function checkBalance(
          { balance: balanceA },
          { balance: balanceB },
        ) {
          if (balanceB.sub(balanceA).gt(0)) {
            return 1;
          }
          return -1;
        });
        setTokenList(sortedTokenList);
        const tokenListToBeCached = sortedTokenList.map(token => ({
          ...token,
          balance: null,
        }));
        window.localStorage.setItem(
          `tokens-${chainId}`,
          JSON.stringify(tokenListToBeCached),
        );
      } catch (fetchTokensError) {
        logError({ fetchTokensError });
      }
      setLoading(false);
    },
    [account, ethersProvider],
  );

  const [filteredTokenList, setFilteredTokenList] = useState([]);

  const onClick = token => {
    setToken(token);
    onClose();
  };

  const initialRef = useRef();

  const onChange = e => {
    const newFilteredTokenList = tokenList.filter(token => {
      const lowercaseSearch = e.target.value.toLowerCase();
      return (
        token.name.toLowerCase().includes(lowercaseSearch) ||
        token.symbol.toLowerCase().includes(lowercaseSearch) ||
        token.address.toLowerCase().includes(lowercaseSearch)
      );
    });
    setFilteredTokenList(newFilteredTokenList);
  };

  useEffect(() => {
    setFilteredTokenList(tokenList);
  }, [tokenList, setFilteredTokenList]);

  useEffect(() => {
    let localTokenList = window.localStorage.getItem('customTokens');
    if (!localTokenList) {
      localTokenList = [];
    }
    if (localTokenList.length < 1) {
      localTokenList = [];
    } else {
      localTokenList = JSON.parse(localTokenList);
    }

    if (!isOpen) return;
    if (providerChainId) {
      setLoading(true);
      const cachedTokenList = window.localStorage.getItem(
        `tokens-${providerChainId}`,
      );
      if (cachedTokenList && cachedTokenList.length > 0) {
        const parsed = JSON.parse(cachedTokenList);
        setTimeout(() => {
          setTokenList(parsed);
          setLoading(false);
        }, 500);
      }
      setDefaultTokenList(providerChainId, localTokenList);
    }
  }, [isOpen, providerChainId, setDefaultTokenList]);

  const smallScreen = useBreakpointValue({ sm: false, base: true });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      isCentered
      initialFocusRef={initialRef}
    >
      <ModalOverlay background="modalBG">
        <ModalContent
          boxShadow="0px 1rem 2rem #617492"
          borderRadius="1rem"
          pb={4}
          pt={2}
          maxW="30rem"
          mx={{ base: 12, lg: 0 }}
        >
          <ModalHeader pb={0}>
            <Flex align="center" justify="space-between">
              Select a Token
              <Link
                fontSize="md"
                color="blue.500"
                fontWeight="normal"
                onClick={onCustom}
              >
                <Flex align="center">
                  <PlusIcon mr={2} />
                  <Text>{smallScreen ? 'Custom' : 'Add Custom Token'}</Text>
                </Flex>
              </Link>
            </Flex>
          </ModalHeader>
          <ModalCloseButton
            size="lg"
            top={-10}
            right={-10}
            color="white"
            p={2}
          />
          <ModalBody>
            <Text color="grey" mb={2}>
              Search Name or Paste Token Contract Address
            </Text>
            <InputGroup mb={4} borderColor="#DAE3F0">
              <Input
                placeholder="Search ..."
                onChange={onChange}
                _placeholder={{ color: 'grey' }}
                ref={initialRef}
              />
              <InputRightElement px={0}>
                <Image src={SearchIcon} />
              </InputRightElement>
            </InputGroup>
            {loading && (
              <Flex w="100%" align="center" justify="center">
                <Spinner color="blue.500" />
              </Flex>
            )}
            {!loading &&
              filteredTokenList.map(token => (
                <Button
                  variant="outline"
                  size="lg"
                  width="100%"
                  borderColor="#DAE3F0"
                  key={token.address}
                  onClick={() => onClick(token)}
                  mb={2}
                  px={4}
                >
                  <Flex align="center" width="100%" justify="space-between">
                    <Flex align="center">
                      <Flex
                        justify="center"
                        align="center"
                        background="white"
                        border="1px solid #DAE3F0"
                        boxSize={8}
                        overflow="hidden"
                        borderRadius="50%"
                      >
                        <Logo uri={token.logoURI} />
                      </Flex>
                      <Text fontSize="lg" fontWeight="bold" mx={2}>
                        {token.symbol}
                      </Text>
                    </Flex>
                    {token.balance ? (
                      <Text color="grey" fontWeight="normal">
                        {formatValue(token.balance, token.decimals)}
                      </Text>
                    ) : (
                      <Spinner size="sm" color="grey" />
                    )}
                  </Flex>
                </Button>
              ))}
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};
