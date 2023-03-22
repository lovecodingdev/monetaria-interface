import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';
import { useTransactionHandler } from 'src/helpers/useTransactionHandler';
import { useTxBuilderContext } from 'src/hooks/useTxBuilder';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { TxActionsWrapper } from '../TxActionsWrapper';

export interface LockActionsProps extends BoxProps {
  amountToLock: string;
  unlockTime: number;
  isWrongNetwork: boolean;
  blocked: boolean;
}

export const LockActions = ({
  amountToLock,
  unlockTime,
  blocked,
  isWrongNetwork,
  sx,
}: LockActionsProps) => {
  const { votingEscrow } = useTxBuilderContext();
  const { currentAccount, chainId: connectedChainId } = useWeb3Context();
  const { currentChainId: marketChainId } = useProtocolDataContext();

  const { action, loadingTxns, mainTxState, approval, requiresApproval, approvalTxState } =
    useTransactionHandler({
      tryPermit: false,
      handleGetTxns: async () => {
        return votingEscrow.createLock({
          user: currentAccount,
          amount: amountToLock,
          unlockTime: unlockTime,
        });
      },
      skip: !amountToLock || amountToLock === '0' || blocked,
      deps: [amountToLock, unlockTime],
    });

  return (
    <TxActionsWrapper
      blocked={blocked}
      mainTxState={mainTxState}
      approvalTxState={approvalTxState}
      requiresAmount={true}
      amount={amountToLock}
      isWrongNetwork={isWrongNetwork}
      handleAction={action}
      actionText={<Trans>Create Lock</Trans>}
      actionInProgressText={<Trans>Creating Lock</Trans>}
      handleApproval={approval}
      requiresApproval={requiresApproval}
      preparingTransactions={loadingTxns}
      sx={sx}
    />
  );
};
