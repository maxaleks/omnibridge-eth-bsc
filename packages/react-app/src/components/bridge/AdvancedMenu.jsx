import { Flex, Input, Text, useDisclosure } from '@chakra-ui/react';
import { ReactComponent as AdvancedImage } from 'assets/advanced.svg';
import { BridgeContext } from 'contexts/BridgeContext';
import { utils } from 'ethers';
import React, { useContext } from 'react';

export const AdvancedMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { receiver, setReceiver } = useContext(BridgeContext);
  const close = () => {
    setReceiver('');
    onClose();
  };

  return (
    <Flex
      position="relative"
      w="100%"
      color="greyText"
      mb={4}
      px={{ base: 2, lg: 0 }}
      align="center"
      justify="center"
    >
      <Flex
        w="100%"
        maxW="26.25rem"
        align="center"
        justify="center"
        borderRadius="0.5rem"
        direction="column"
        transition="all 0.25s"
      >
        {isOpen && (
          <Input
            borderColor="#DAE3F0"
            bg="white"
            my={2}
            placeholder="Recipient Address"
            value={receiver}
            onChange={e => setReceiver(e.target.value)}
            isInvalid={!!receiver && !utils.isAddress(receiver)}
          />
        )}
        <Flex
          w="100%"
          onClick={isOpen ? close : onOpen}
          cursor="pointer"
          align="center"
          justify="center"
          p={1}
          color="blue.400"
        >
          <AdvancedImage width="1.25rem" />
          <Text ml={2}>Advanced</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
