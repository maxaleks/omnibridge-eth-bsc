import { useWeb3Context } from 'contexts/Web3Context';
import { Contract, utils } from 'ethers';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import { executeSignatures } from 'lib/amb';
import { getNetworkName } from 'lib/helpers';
import { getEthersProvider } from 'lib/providers';
import { useCallback } from 'react';

const getMessageData = async (ethersProvider, txHash) => {
  const abi = new utils.Interface([
    'event UserRequestForSignature(bytes32 indexed messageId, bytes encodedData)',
  ]);
  let receipt;
  try {
    receipt = await ethersProvider.getTransactionReceipt(txHash);
  } catch (error) {
    throw Error('Invalid hash.');
  }
  if (!receipt || !receipt.logs) {
    throw Error('No transaction found.');
  }
  const eventFragment = abi.events[Object.keys(abi.events)[0]];
  const eventTopic = abi.getEventTopic(eventFragment);
  const event = receipt.logs.find(e => e.topics[0] === eventTopic);
  if (!event) {
    throw Error(
      'It is not a bridge transaction. Specify hash of a transaction sending tokens to the bridge.',
    );
  }
  const decodedLog = abi.decodeEventLog(
    eventFragment,
    event.data,
    event.topics,
  );
  return decodedLog.encodedData;
};

const getMessage = async (homeProvider, homeAmbAddress, txHash) => {
  const msgData = await getMessageData(homeProvider, txHash);
  const messageHash = utils.solidityKeccak256(['bytes'], [msgData]);

  const abi = [
    'event CollectedSignatures(address authorityResponsibleForRelay, bytes32 messageHash, uint256 NumberOfCollectedSignatures)',
    'function signature(bytes32 _hash, uint256 _index) public view returns (bytes)',
  ];
  const homeAMB = new Contract(homeAmbAddress, abi, homeProvider);
  let events = await homeAMB.queryFilter('CollectedSignatures', 12123723);
  events = events.filter(x => x.args.messageHash === messageHash);
  if (events.length === 0) {
    throw Error(
      'Transaction to the bridge is found but oracles’ confirmations are not collected yet. Wait for a minute and try again.',
    );
  }
  const event = events[0];
  const n = parseInt(event.args.NumberOfCollectedSignatures, 10);
  const signatures = await Promise.all(
    Array(n)
      .fill(null)
      .map((_item, index) => homeAMB.signature(messageHash, index)),
  );
  return {
    msgData,
    signatures,
  };
};

export function useManualClaim() {
  const {
    homeChainId,
    homeAmbAddress,
    foreignChainId,
    foreignAmbAddress,
  } = useBridgeDirection();
  const { providerChainId, ethersProvider } = useWeb3Context();

  return useCallback(
    async txHash => {
      if (providerChainId !== foreignChainId) {
        throw Error(
          `Wrong network. Please connect your wallet to ${getNetworkName(
            foreignChainId,
          )}.`,
        );
      }
      const homeProvider = await getEthersProvider(homeChainId);
      const message = await getMessage(homeProvider, homeAmbAddress, txHash);
      const abi = [
        'function relayedMessages(bytes32 _txHash) public view returns (bool)',
      ];
      const foreignAMB = new Contract(foreignAmbAddress, abi, ethersProvider);
      const claimed = await foreignAMB.relayedMessages(txHash);
      if (claimed) {
        throw Error(
          `Tokens are already claimed. Check your token balance on ${getNetworkName(
            foreignChainId,
          )}.`,
        );
      }
      await executeSignatures(ethersProvider, foreignAmbAddress, message);
      return true;
    },
    [
      homeChainId,
      homeAmbAddress,
      foreignChainId,
      foreignAmbAddress,
      providerChainId,
      ethersProvider,
    ],
  );
}
