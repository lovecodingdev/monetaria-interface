import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { Table } from 'rsuite';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { RewardType } from './RewardType';
import { Reward } from 'src/helpers/types';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { normalize, UserIncentiveData } from '@monetaria/math-utils';
import { SortType } from 'src/helpers/rsuite-types';

const { Column, HeaderCell, Cell } = Table;
const data: RewardType[] = [
  {
    asset: 'ETH',
    symbol: 'eth',
    network: 'Ethereum',
    vAPY: 5.45,
    tAPR: 539,
    balance: 2329,
    profit_usd: 239,
    claimable_tokens: 2345,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    network: 'Ethereum',
    vAPY: 5.45,
    tAPR: 539,
    balance: 2329,
    profit_usd: 239,
    claimable_tokens: 2345,
  },
  {
    asset: 'ETH',
    symbol: 'eth',
    network: 'Ethereum',
    vAPY: 5.45,
    tAPR: 5329,
    balance: 23219,
    profit_usd: 2392,
    claimable_tokens: 23345,
  },
];

export const RewardTable = () => {
  const [sortColumn, setSortColumn] = useState("");
  const [sortType, setSortType] = useState("desc" as SortType);
  const [loading, setLoading] = useState(false);
  const [claimableUsd, setClaimableUsd] = useState('0');
  const { user, reserves } = useAppDataContext();
  const [selectedRewardSymbol, setSelectedRewardSymbol] = useState<string>('all');
  const [allReward, setAllReward] = useState<Reward>();
  const [rewards, setRewards] = useState<Reward[]>([]);

  // get all rewards
  useEffect(() => {
    const userIncentives: Reward[] = [];
    let totalClaimableUsd = Number(claimableUsd);
    const allAssets: string[] = [];
    Object.keys(user.calculatedUserIncentives).forEach((rewardTokenAddress) => {
      const incentive: UserIncentiveData = user.calculatedUserIncentives[rewardTokenAddress];
      const rewardBalance = normalize(incentive.claimableRewards, incentive.rewardTokenDecimals);

      let tokenPrice = Number(incentive.rewardPriceFeed);

      const rewardBalanceUsd = Number(rewardBalance) * tokenPrice;

      if (rewardBalanceUsd > 0) {
        incentive.assets.forEach((asset) => {
          if (allAssets.indexOf(asset) === -1) {
            allAssets.push(asset);
          }
        });

        userIncentives.push({
          assets: incentive.assets,
          incentiveControllerAddress: incentive.incentiveControllerAddress,
          symbol: incentive.rewardTokenSymbol,
          balance: rewardBalance,
          balanceUsd: rewardBalanceUsd.toString(),
          rewardTokenAddress,
        });

        totalClaimableUsd = totalClaimableUsd + Number(rewardBalanceUsd);
      }
    });

    // if (userIncentives.length === 1) {
    //   setSelectedRewardSymbol(userIncentives[0].symbol);
    // } else if (userIncentives.length > 1 && !selectedReward) {
    //   const allRewards = {
    //     assets: allAssets,
    //     incentiveControllerAddress: userIncentives[0].incentiveControllerAddress,
    //     symbol: 'all',
    //     balance: '0',
    //     balanceUsd: totalClaimableUsd.toString(),
    //     rewardTokenAddress: '',
    //   };
    //   setSelectedRewardSymbol('all');
    //   setAllReward(allRewards);
    // }

    setRewards(userIncentives);
    setClaimableUsd(totalClaimableUsd.toString());
  }, []);

  const handleSortColumn = (sortColumn: string, sortType?: SortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType!);
    }, 500);
  };

  return (
    <Table
      autoHeight
      data={rewards}
      sortColumn={sortColumn}
      sortType={sortType}
      onSortColumn={handleSortColumn}
      loading={loading}
      cellBordered={false}
      rowHeight={60}
    >
      <Column flexGrow={2} align="left" fixed sortable verticalAlign="middle">
        <HeaderCell>Pool</HeaderCell>
        <Cell>
          {(rowData: Reward) => (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 4,
                justifyContent: 'start',
                alignItems: 'center',
              }}
            >
              <TokenIcon
                symbol={rowData.symbol}
                sx={{ fontSize: `24px`, ml: -1 }}
                key={rowData.symbol}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.05em',
                  justifyContent: 'start',
                }}
              >
                <Box sx={{ fontSize: '14px', fontWeight: 400, textAlign: 'left' }}>
                  {rowData.symbol}
                </Box>
                {/* <Box
                  sx={{ fontSize: '12px', fontWeight: 400, color: '#84919A', textAlign: 'left' }}
                >
                  {rowData.network}
                </Box> */}
              </Box>
            </Box>
          )}
        </Cell>
      </Column>

      <Column flexGrow={2} align="right" sortable verticalAlign="middle">
        <HeaderCell>Balance</HeaderCell>
        <Cell>{(rowData: Reward) => `${rowData.balance}`}</Cell>
      </Column>

      <Column flexGrow={2} align="right" sortable verticalAlign="middle">
        <HeaderCell>USD Profits</HeaderCell>
        <Cell>{(rowData: Reward) => `$${rowData.balanceUsd}`}</Cell>
      </Column>
      <Column flexGrow={3} align="right" verticalAlign="middle" fixed="right">
        <HeaderCell>Claimable Tokens</HeaderCell>
        <Cell>
          <Button
            sx={{
              backgroundColor: 'rgba(21, 126, 255, 0.05)',
              border: '1px solid rgba(21, 126, 255, 0.2)',
              color: '#074592',
              fontWeight: 600,
              fontSize: '16px',
              marginTop: '-4px',
            }}
          >
            Claim
          </Button>
        </Cell>
      </Column>
    </Table>
  );
};
