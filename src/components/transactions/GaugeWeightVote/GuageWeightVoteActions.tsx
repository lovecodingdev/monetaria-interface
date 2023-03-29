import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';
import { useTransactionHandler } from 'src/helpers/useTransactionHandler';
import { useTxBuilderContext } from 'src/hooks/useTxBuilder';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { TxActionsWrapper } from '../TxActionsWrapper';

export interface GuageWeightVoteActionsProps extends BoxProps {
  gaugeAddr: string;
  userWeight: number;
  isWrongNetwork: boolean;
  blocked: boolean;
}

export const GuageWeightVoteActions = ({
  gaugeAddr,
  userWeight,
  blocked,
  isWrongNetwork,
  sx,
}: GuageWeightVoteActionsProps) => {
  const { gaugeController } = useTxBuilderContext();
  const { currentAccount } = useWeb3Context();

  const { action, loadingTxns, mainTxState, requiresApproval, approvalTxState } =
    useTransactionHandler({
      tryPermit: false,
      handleGetTxns: async () => {
        return gaugeController.voteForGaugeWeights({
          user: currentAccount,
          gaugeAddr,
          userWeight,
        });
      },
      skip: blocked,
      deps: [],
    });

  return (
    <TxActionsWrapper
      blocked={blocked}
      mainTxState={mainTxState}
      approvalTxState={approvalTxState}
      requiresAmount={true}
      isWrongNetwork={isWrongNetwork}
      handleAction={action}
      actionText={<Trans>Submit</Trans>}
      actionInProgressText={<Trans>Submiting</Trans>}
      requiresApproval={requiresApproval}
      preparingTransactions={loadingTxns}
      sx={sx}
    />
  );
};
