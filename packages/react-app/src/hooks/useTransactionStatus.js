import { BridgeContext } from 'contexts/BridgeContext';
import { useWeb3Context } from 'contexts/Web3Context';
import { useBridgeDirection } from 'hooks/useBridgeDirection';
import { getMessageFromTxHash, getMessageStatus } from 'lib/amb';
import { POLLING_INTERVAL } from 'lib/constants';
import { logError } from 'lib/helpers';
import { useCallback, useContext, useEffect, useState } from 'react';
import { defer } from 'rxjs';

export const useTransactionStatus = () => {
  const {
    homeChainId,
    getBridgeChainId,
    getGraphEndpoint,
  } = useBridgeDirection();
  const { ethersProvider, providerChainId } = useWeb3Context();
  const {
    loading,
    setLoading,
    txHash,
    setTxHash,
    updateAllowance,
    totalConfirms,
  } = useContext(BridgeContext);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [loadingText, setLoadingText] = useState();
  const [receipt, setReceipt] = useState();
  const completeReceipt = useCallback(() => {
    setTxHash();
    updateAllowance();
    setLoadingText();
    setReceipt();
    setLoading(false);
  }, [setLoading, updateAllowance, setTxHash]);

  const incompleteReceipt = useCallback(() => {
    updateAllowance();
    setLoadingText();
    setReceipt();
    setLoading(false);
  }, [setLoading, updateAllowance]);

  useEffect(() => {
    const subscriptions = [];
    const unsubscribe = () => {
      subscriptions.forEach(s => {
        clearTimeout(s);
      });
    };

    if (!txHash || !ethersProvider || !loading) {
      setReceipt();
      setLoadingText();
      return unsubscribe;
    }

    const chainId = providerChainId;
    let message = null;
    let status = false;
    const isHome = chainId === homeChainId;
    setLoadingText('Waiting for Block Confirmations');

    const getReceipt = async () => {
      try {
        const txReceipt = await ethersProvider.getTransactionReceipt(txHash);
        if (txReceipt) {
          setReceipt(txReceipt);
          if (txReceipt.confirmations >= totalConfirms) {
            setLoadingText(
              isHome ? 'Collecting Signatures' : 'Waiting for Execution',
            );
          }

          if (txReceipt && (!message || (isHome && !message.signatures))) {
            message = await getMessageFromTxHash(
              getGraphEndpoint(chainId),
              txHash,
            );
          }

          if (isHome) {
            if (message && message.signatures) {
              setNeedsConfirmation(true);
              incompleteReceipt();
              unsubscribe();
              return;
            }
          } else if (message) {
            status = await getMessageStatus(
              getGraphEndpoint(getBridgeChainId(chainId)),
              message.msgId,
            );
            if (status) {
              completeReceipt();
              unsubscribe();
              return;
            }
          }
        }

        if (
          !txReceipt ||
          !message ||
          (isHome ? !message.signatures : !status)
        ) {
          const timeoutId = setTimeout(() => getReceipt(), POLLING_INTERVAL);
          subscriptions.push(timeoutId);
        }
      } catch (txStatusError) {
        completeReceipt();
        unsubscribe();
        logError({ txStatusError });
      }
    };

    // unsubscribe from previous polls
    unsubscribe();

    const deferral = defer(() => getReceipt()).subscribe();
    // unsubscribe when unmount component
    return () => {
      unsubscribe();
      deferral.unsubscribe();
    };
  }, [
    loading,
    providerChainId,
    txHash,
    ethersProvider,
    totalConfirms,
    completeReceipt,
    incompleteReceipt,
    setReceipt,
    homeChainId,
    getBridgeChainId,
    getGraphEndpoint,
  ]);

  useEffect(() => {
    setNeedsConfirmation(needs => providerChainId === homeChainId && needs);
  }, [homeChainId, providerChainId]);

  return {
    loadingText,
    needsConfirmation,
    setNeedsConfirmation,
    confirmations: receipt ? receipt.confirmations : 0,
  };
};
