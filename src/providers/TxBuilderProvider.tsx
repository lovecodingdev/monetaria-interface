import {
  FaucetService,
  IncentivesController,
  IncentivesControllerInterface,
  IncentivesControllerV2,
  IncentivesControllerV2Interface,
  LendingPool,
  Pool,
  PoolInterface,
  VotingEscrow,
  GaugeController,
} from '@monetaria/contract-helpers';
import React, { ReactElement } from 'react';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { TxBuilderContext } from 'src/hooks/useTxBuilder';

export interface TxBuilderContextInterface {
  lendingPool: LendingPool | PoolInterface;
  faucetService: FaucetService;
  incentivesTxBuilder: IncentivesControllerInterface;
  incentivesTxBuilderV2: IncentivesControllerV2Interface;
  votingEscrow: VotingEscrow;
  gaugeController: GaugeController;
}

export const TxBuilderProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const { currentMarketData, jsonRpcProvider } = useProtocolDataContext();

  let lendingPool;
  if (!currentMarketData.v3) {
    lendingPool = new LendingPool(jsonRpcProvider, {
      LENDING_POOL: currentMarketData.addresses.LENDING_POOL,
      REPAY_WITH_COLLATERAL_ADAPTER: currentMarketData.addresses.REPAY_WITH_COLLATERAL_ADAPTER,
      SWAP_COLLATERAL_ADAPTER: currentMarketData.addresses.SWAP_COLLATERAL_ADAPTER,
      WETH_GATEWAY: currentMarketData.addresses.WETH_GATEWAY,
    });
  } else {
    lendingPool = new Pool(jsonRpcProvider, {
      POOL: currentMarketData.addresses.LENDING_POOL,
      REPAY_WITH_COLLATERAL_ADAPTER: currentMarketData.addresses.REPAY_WITH_COLLATERAL_ADAPTER,
      SWAP_COLLATERAL_ADAPTER: currentMarketData.addresses.SWAP_COLLATERAL_ADAPTER,
      WETH_GATEWAY: currentMarketData.addresses.WETH_GATEWAY,
      L2_ENCODER: currentMarketData.addresses.L2_ENCODER,
    });
  }

  const faucetService = new FaucetService(jsonRpcProvider, currentMarketData.addresses.FAUCET);

  const incentivesTxBuilder: IncentivesControllerInterface = new IncentivesController(
    jsonRpcProvider
  );
  const incentivesTxBuilderV2: IncentivesControllerV2Interface = new IncentivesControllerV2(
    jsonRpcProvider
  );

  const votingEscrow: VotingEscrow = new VotingEscrow(jsonRpcProvider, {
    VOTING_ESCROW: currentMarketData.addresses.VOTING_ESCROW,
    MNT: currentMarketData.addresses.MNT,
  });

  const gaugeController: GaugeController = new GaugeController(jsonRpcProvider, {
    VOTING_ESCROW: currentMarketData.addresses.VOTING_ESCROW,
    MNT: currentMarketData.addresses.MNT,
  });

  return (
    <TxBuilderContext.Provider
      value={{
        lendingPool,
        faucetService,
        incentivesTxBuilder,
        incentivesTxBuilderV2,
        votingEscrow,
        gaugeController,
      }}
    >
      {children}
    </TxBuilderContext.Provider>
  );
};
