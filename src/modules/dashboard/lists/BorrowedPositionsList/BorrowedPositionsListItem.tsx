import { InterestRate } from '@monetaria/contract-helpers';
import { Trans } from '@lingui/macro';
import { Button } from '@mui/material';
import { useModalContext, ModalType } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

import { ListColumn } from '../../../../components/lists/ListColumn';
import { ComputedUserReserveData } from '../../../../hooks/app-data-provider/useAppDataProvider';
import { ListAPRColumn } from '../ListAPRColumn';
import { ListButtonsColumn } from '../ListButtonsColumn';
import { ListItemAPYButton } from '../ListItemAPYButton';
import { ListItemWrapper } from '../ListItemWrapper';
import { ListValueColumn } from '../ListValueColumn';
import { Link, ROUTES } from '../../../../components/primitives/Link';

export const BorrowedPositionsListItem = ({
  reserve,
  variableBorrows,
  variableBorrowsUSD,
  stableBorrows,
  stableBorrowsUSD,
  borrowRateMode,
  stableBorrowAPY,
}: ComputedUserReserveData & { borrowRateMode: InterestRate }) => {
  const { openActions, openBorrow, openRepay, openRateSwitch } = useModalContext();
  const { currentMarket } = useProtocolDataContext();
  const {
    isActive,
    isFrozen,
    borrowingEnabled,
    stableBorrowRateEnabled,
    sIncentivesData,
    vIncentivesData,
    variableBorrowAPY,
  } = reserve;

  return (
    <ListItemWrapper
      symbol={reserve.symbol}
      iconSymbol={reserve.iconSymbol}
      name={reserve.name}
      detailsAddress={reserve.underlyingAsset}
      currentMarket={currentMarket}
      frozen={reserve.isFrozen}
      data-cy={`dashboardBorrowedListItem_${reserve.symbol.toUpperCase()}_${borrowRateMode}`}
    >
      <ListValueColumn
        symbol={reserve.symbol}
        value={Number(borrowRateMode === InterestRate.Variable ? variableBorrows : stableBorrows)}
        subValue={Number(
          borrowRateMode === InterestRate.Variable ? variableBorrowsUSD : stableBorrowsUSD
        )}
      />

      <ListAPRColumn
        value={Number(
          borrowRateMode === InterestRate.Variable ? variableBorrowAPY : stableBorrowAPY
        )}
        incentives={borrowRateMode === InterestRate.Variable ? vIncentivesData : sIncentivesData}
        symbol={reserve.symbol}
      />

      <ListColumn>
        <ListItemAPYButton
          stableBorrowRateEnabled={stableBorrowRateEnabled}
          borrowRateMode={borrowRateMode}
          disabled={!stableBorrowRateEnabled || isFrozen || !isActive}
          onClick={() => openRateSwitch(reserve.underlyingAsset, borrowRateMode)}
          stableBorrowAPY={reserve.stableBorrowAPY}
          variableBorrowAPY={reserve.variableBorrowAPY}
          underlyingAsset={reserve.underlyingAsset}
          currentMarket={currentMarket}
        />
      </ListColumn>
      <ListButtonsColumn>
        <Button
          variant="outlined"
          onClick={() => openActions(reserve.underlyingAsset, ModalType.Borrow)}
        >
          <Trans>Borrow</Trans>
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            openActions(reserve.underlyingAsset, ModalType.Repay, {
              currentRateMode: borrowRateMode,
            })
          }
        >
          <Trans>Repay</Trans>
        </Button>
      </ListButtonsColumn>
    </ListItemWrapper>
  );
};
