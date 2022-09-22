import React, { useContext } from 'react';
import { WalletBalanceProvider } from '@monetaria/contract-helpers';
import { normalize } from '@monetaria/math-utils';
import { mntGovernanceConfig } from 'src/ui-config/governanceConfig';
import { getProvider } from 'src/utils/marketsAndNetworksConfig';
import { useProtocolDataContext } from '../useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { usePolling } from '../usePolling';

type WalletBalanceProviderContext = {
  mntTokens: { mnt: string; mMnt: string; stkMnt: string };
  loading: boolean;
};

const Context = React.createContext<WalletBalanceProviderContext>(
  {} as WalletBalanceProviderContext
);

/**
 * This is required for token delegation, as we need to know the users balance.
 */
export const MntTokensBalanceProvider: React.FC = ({ children }) => {
  const { currentNetworkConfig, jsonRpcProvider, currentChainId } = useProtocolDataContext();
  const { currentAccount: walletAddress, chainId } = useWeb3Context();
  const [mntTokens, setMntTokens] = React.useState({
    mnt: '0',
    mMnt: '0',
    stkMnt: '0',
  });
  const [mntTokensLoading, setMntTokensLoading] = React.useState(false);

  const isGovernanceFork =
    currentNetworkConfig.isFork &&
    currentNetworkConfig.underlyingChainId === mntGovernanceConfig.chainId;
  const rpcProvider = isGovernanceFork ? jsonRpcProvider : getProvider(mntGovernanceConfig.chainId);

  const fetchMntTokenBalances = async () => {
    setMntTokensLoading(true);
    try {
      const contract = new WalletBalanceProvider({
        walletBalanceProviderAddress: mntGovernanceConfig.walletBalanceProvider,
        provider: rpcProvider,
      });
      const balances = await contract.batchBalanceOf(
        [walletAddress],
        [
          mntGovernanceConfig.mntTokenAddress,
          mntGovernanceConfig.mMntTokenAddress,
          mntGovernanceConfig.stkMntTokenAddress,
        ]
      );
      setMntTokens({
        mnt: normalize(balances[0].toString(), 18),
        mMnt: normalize(balances[1].toString(), 18),
        stkMnt: normalize(balances[2].toString(), 18),
      });
    } catch (e) {
      console.log(e);
    }
    setMntTokensLoading(false);
  };

  usePolling(fetchMntTokenBalances, 60000, !walletAddress || !mntGovernanceConfig, [
    walletAddress,
    currentChainId,
  ]);

  return (
    <Context.Provider
      value={{
        mntTokens: mntTokens,
        loading: mntTokensLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMntTokensProviderContext = () => useContext(Context);
