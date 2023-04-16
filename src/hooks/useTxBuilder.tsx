import {
  FaucetService,
  IncentivesControllerInterface,
  IncentivesControllerV2Interface,
  LendingPool,
  PoolInterface,
  VotingEscrow,
  GaugeController,
  LiquidityGauge
} from '@monetaria/contract-helpers';
import React, { useContext } from 'react';

export interface TxBuilderContextInterface {
  lendingPool: LendingPool | PoolInterface;
  faucetService: FaucetService;
  incentivesTxBuilder: IncentivesControllerInterface;
  incentivesTxBuilderV2: IncentivesControllerV2Interface;
  votingEscrow: VotingEscrow;
  gaugeController: GaugeController; 
  gauges: Record<string, LiquidityGauge>;
}

export const TxBuilderContext = React.createContext({} as TxBuilderContextInterface);
export const useTxBuilderContext = () => useContext(TxBuilderContext);
