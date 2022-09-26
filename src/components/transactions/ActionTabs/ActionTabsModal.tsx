import React, { useEffect, useState } from 'react';
import {Box, Paper} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';
import { ModalWrapper } from '../FlowCommons/ModalWrapper';
import { SupplyModalContent } from '../Supply/SupplyModalContent';
import { BorrowModalContent } from '../Borrow/BorrowModalContent';
import { WithdrawModalContent } from '../Withdraw/WithdrawModalContent';
import { InterestRate, PERMISSION } from '@monetaria/contract-helpers';

//Repay
import { RepayModalContent } from '../Repay/RepayModalContent';
import { isFeatureEnabled } from 'src/utils/marketsAndNetworksConfig';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { RepayType, RepayTypeSelector } from '../Repay/RepayTypeSelector';
import { CollateralRepayModalContent } from '../Repay/CollateralRepayModalContent';
import { styled } from '@mui/system';
import { BasicModal } from '../../primitives/BasicModal';

const NewTabs = styled(Tabs)({
  '& .MuiTabs-flexContainer': {
    justifyContent: 'space-between',
    padding: '2px',
    borderRadius: '100px',
    border: '1px solid #EEF0F2',
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
});

const NewTab = styled(Tab)`
  margin: 0px;
  min-height: 40px;
  @media (max-width: 639px) {
    min-width: 60px;
    padding: 4px 12px;
  }
  &.Mui-selected, &:hover {
    background: #EEF0F2;
    border-radius: 100px;  
  }
`;

export const ActionTabsModal = () => {
  const { type, close, args, mainTxState } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
    currentRateMode: InterestRate;
    actionTab: ModalType;
  }>;

  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(()=>{
    setSelectedTab(
      args.actionTab === ModalType.Supply ? 0 : 
      args.actionTab === ModalType.Borrow ? 1 :
      args.actionTab === ModalType.Repay ? 2 : 3
    )
  }, [args.actionTab])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const [borrowUnWrapped, setBorrowUnWrapped] = useState(true);

  //Repay
  const { userReserves } = useAppDataContext();
  const { currentMarketData } = useProtocolDataContext();
  const [repayType, setRepayType] = useState(RepayType.BALANCE);

  // repay with collateral is only possible:
  // 1. on chains with paraswap deployed
  // 2. when you have a different supplied(not necessarily collateral) asset then the one your debt is in
  // For repaying your debt with the same assets aToken you can use repayWithAToken on aave protocol v3
  const collateralRepayPossible =
    isFeatureEnabled.collateralRepay(currentMarketData) &&
    userReserves.some(
      (userReserve) =>
        userReserve.scaledATokenBalance !== '0' && userReserve.underlyingAsset !== args.underlyingAsset
    );


  //Withdraw
  const [withdrawUnWrapped, setWithdrawUnWrapped] = useState(true);

  if (args.underlyingAsset == undefined) return <></>;

  return (
    <BasicModal open={type === ModalType.Actions} setOpen={close} withCloseButton={false}>
    {/* <Paper
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        width: '100%', 
        bgcolor: 'background.paper', 
        my: {xs: '16px', md: '24px'},
        mx: 'auto',
        padding: {xs: '16px', md: '24px'},
      })}
    > */}
      <Box>
        <NewTabs
          value={selectedTab}
          onChange={handleChange}
          centered
          sx={{
            mb: 4,
          }}
        >
          <NewTab label="Supply"/>
          <NewTab label="Borrow" />
          <NewTab label="Repay" />
          <NewTab label="Withdraw" />
        </NewTabs>
      </Box>
      {selectedTab == 0 &&
        <ModalWrapper underlyingAsset={args.underlyingAsset} requiredPermission={PERMISSION.DEPOSITOR}>
          {(params) => <SupplyModalContent {...params} />}
        </ModalWrapper>
      }
      {selectedTab == 1 &&
        <ModalWrapper
          underlyingAsset={args.underlyingAsset}
          keepWrappedSymbol={!borrowUnWrapped}
          requiredPermission={PERMISSION.BORROWER}
        >
          {(params) => (
            <BorrowModalContent {...params} unwrap={borrowUnWrapped} setUnwrap={setBorrowUnWrapped} />
          )}
        </ModalWrapper>
      }
      {selectedTab == 2 &&
        <ModalWrapper underlyingAsset={args.underlyingAsset} requiredPermission={PERMISSION.BORROWER}>
          {(params) => {
            return (
              <>
                {collateralRepayPossible && !mainTxState.txHash && (
                  <RepayTypeSelector repayType={repayType} setRepayType={setRepayType} />
                )}
                {repayType === RepayType.BALANCE && (
                  <RepayModalContent {...params} debtType={args.currentRateMode} />
                )}
                {repayType === RepayType.COLLATERAL && (
                  <CollateralRepayModalContent {...params} debtType={args.currentRateMode} />
                )}
              </>
            );
          }}
        </ModalWrapper>
      }
      {selectedTab == 3 &&
        <ModalWrapper
          underlyingAsset={args.underlyingAsset}
          keepWrappedSymbol={!withdrawUnWrapped}
          requiredPermission={PERMISSION.DEPOSITOR}
        >
          {(params) => (
            <WithdrawModalContent
              {...params}
              unwrap={withdrawUnWrapped}
              setUnwrap={setWithdrawUnWrapped}
            />
          )}
        </ModalWrapper>
      }
    </BasicModal>
  );
}
