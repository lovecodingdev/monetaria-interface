import { API_ETH_MOCK_ADDRESS } from '@monetaria/contract-helpers';
import { Trans } from '@lingui/macro';
import { useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { StableAPYTooltip } from 'src/components/infoTooltips/StableAPYTooltip';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { fetchIconSymbolAndName } from 'src/ui-config/reservePatches';

import { ListColumn } from '../../components/lists/ListColumn';
import { ListHeaderTitle } from '../../components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from '../../components/lists/ListHeaderWrapper';
import { ListWrapper } from '../../components/lists/ListWrapper';
import { useProtocolDataContext } from '../../hooks/useProtocolDataContext';
import { AssetsListItem } from './AssetsListItem';
import { AssetsListItemLoader } from './AssetsListItemLoader';
import { AssetsListMobileItem } from './AssetsListMobileItem';
import { AssetsListMobileItemLoader } from './AssetsListMobileItemLoader';

export default function AssetsList() {
  const { reserves, loading } = useAppDataContext();
  const { currentMarketData, currentNetworkConfig } = useProtocolDataContext();

  const theme = useTheme();
  const isTableChangedToCards = useMediaQuery(theme.breakpoints.down('xsm'));

  const filteredData = reserves
    .filter((res) => res.isActive && !res.isFrozen)
    .map((reserve) => ({
      ...reserve,
      ...(reserve.isWrappedBaseAsset
        ? fetchIconSymbolAndName({
            symbol: currentNetworkConfig.baseAssetSymbol,
            underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
          })
        : {}),
    }));

  const [sortName, setSortName] = useState('');
  const [sortDesc, setSortDesc] = useState(false);
  const [search, setSearch] = useState('');

  if (sortDesc) {
    if (sortName === 'symbol') {
      filteredData.sort((a, b) => (a.symbol.toUpperCase() < b.symbol.toUpperCase() ? -1 : 1));
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      filteredData.sort((a, b) => a[sortName] - b[sortName]);
    }
  } else {
    if (sortName === 'symbol') {
      filteredData.sort((a, b) => (b.symbol.toUpperCase() < a.symbol.toUpperCase() ? -1 : 1));
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      filteredData.sort((a, b) => b[sortName] - a[sortName]);
    }
  }

  const header = [
    {
      title: <Trans>Asset</Trans>,
      sortKey: 'symbol',
    },
    {
      title: <Trans>Total supplied</Trans>,
      sortKey: 'totalLiquidityUSD',
    },
    {
      title: <Trans>Supply APY</Trans>,
      sortKey: 'supplyAPY',
    },
    {
      title: <Trans>Total borrowed</Trans>,
      sortKey: 'totalDebtUSD',
    },
    {
      title: (
        <VariableAPYTooltip
          text={<Trans>Borrow APY, variable</Trans>}
          key="APY_list_variable_type"
          variant="subheader2"
        />
      ),
      sortKey: 'variableBorrowAPY',
    },
    {
      title: (
        <StableAPYTooltip
          text={<Trans>Borrow APY, stable</Trans>}
          key="APY_list_stable_type"
          variant="subheader2"
        />
      ),
      sortKey: 'stableBorrowAPY',
    },
  ];

  // const header = [
  //   {
  //     title: <Trans>Asset name</Trans>,
  //     sortKey: 'symbol',
  //   },
  //   {
  //     title: <Trans>TVL</Trans>,
  //     sortKey: 'tvl',
  //   },
  //   {
  //     title: <Trans>Total supplyd</Trans>,
  //     sortKey: 'totalLiquidityUSD',
  //   },
  //   {
  //     title: <Trans>Supply APR</Trans>,
  //     sortKey: 'supplyAPY',
  //   },
  //   {
  //     title: <Trans>Total borrowed</Trans>,
  //     sortKey: 'totalDebtUSD',
  //   },
  //   {
  //     title: (
  //       <VariableAPYTooltip
  //         text={<Trans>Borrow APY</Trans>}
  //         key="APY_list_variable_type"
  //         variant="subheader2"
  //       />
  //     ),
  //     sortKey: 'BorrowAPY',
  //   },
  // ];

  return (
    <ListWrapper
      title={<Trans>Assets</Trans>}
      captionSize="h2"
      onSearch={(search) => setSearch(search.toLowerCase())}
    >
      {!isTableChangedToCards && (
        <ListHeaderWrapper px={6}>
          {header.map((col) => (
            <ListColumn
              isRow={col.sortKey === 'symbol'}
              // align='right'
              maxWidth={col.sortKey === 'symbol' ? 280 : undefined}
              key={col.sortKey}
            >
              <ListHeaderTitle
                sortName={sortName}
                sortDesc={sortDesc}
                setSortName={setSortName}
                setSortDesc={setSortDesc}
                sortKey={col.sortKey}
              >
                {col.title}
              </ListHeaderTitle>
            </ListColumn>
          ))}
          {/* <ListColumn maxWidth={95} minWidth={95} /> */}
        </ListHeaderWrapper>
      )}

      {loading ? (
        isTableChangedToCards ? (
          <>
            <AssetsListMobileItemLoader />
            <AssetsListMobileItemLoader />
            <AssetsListMobileItemLoader />
          </>
        ) : (
          <>
            <AssetsListItemLoader />
            <AssetsListItemLoader />
            <AssetsListItemLoader />
            <AssetsListItemLoader />
            <AssetsListItemLoader />
          </>
        )
      ) : (
        filteredData
          .filter((r) => r.symbol.toLowerCase().includes(search))
          .map((reserve) =>
          isTableChangedToCards ? (
            <AssetsListMobileItem {...reserve} key={reserve.id} />
          ) : (
            <AssetsListItem {...reserve} key={reserve.id} />
          )
        )
      )}
    </ListWrapper>
  );
}
