import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Table } from 'rsuite';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { useRouter } from 'next/router';
import { PositionType } from './positionType';

const { Column, HeaderCell, Cell } = Table;

interface farmPositionProps {
  data: PositionType[];
  chooseOpenModalTwo: any;
}

export const PositionTable = ({ data, chooseOpenModalTwo }: farmPositionProps) => {
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getData = () => {
    if (sortColumn && sortType) {
      return data.sort((a, b) => {
        let x = a[sortColumn];
        let y = b[sortColumn];
        if (typeof x === 'string') {
          x = x.charCodeAt();
        }
        if (typeof y === 'string') {
          y = y.charCodeAt();
        }
        if (sortType === 'asc') {
          return x - y;
        } else {
          return y - x;
        }
      });
    }
    return data;
  };

  const handleSortColumn = (sortColumn, sortType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSortColumn(sortColumn);
      setSortType(sortType);
    }, 500);
  };

  return (
    <>
      <Table
        autoHeight={true}
        data={getData()}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        loading={loading}
        cellBordered={false}
        rowHeight={60}
      >
        <Column width={94} align="center" fixed sortable verticalAlign="middle">
          <HeaderCell>#</HeaderCell>
          <Cell>
            {(rowData) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  fontSize: '14px',
                  fontWeight: 400,
                }}
              >
                <Typography>{rowData.asset}</Typography>
                <Typography>#{rowData.no}</Typography>
              </Box>
            )}
          </Cell>
        </Column>
        <Column minWidth={185} flexGrow={1} align="left" fixed sortable verticalAlign="middle">
          <HeaderCell>Pool</HeaderCell>
          <Cell>
            {(rowData) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 8,
                  justifyContent: 'start',
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    position: 'relative',
                  }}
                >
                  {' '}
                  <TokenIcon
                    symbol={rowData.tokenA}
                    sx={{ fontSize: '32px', mr: 1, zIndex: 10 }}
                  />{' '}
                  <TokenIcon
                    symbol={rowData.tokenB}
                    sx={{
                      fontSize: '32px',
                      mr: 1,
                      position: 'absolute',
                      left: '24px',
                      zIndex: 9,
                    }}
                  />{' '}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.05em',
                    justifyContent: 'start',
                  }}
                >
                  <Box sx={{ fontSize: '14px', fontWeight: 400, textAlign: 'left' }}>
                    {rowData.asset}
                  </Box>
                  <Box
                    sx={{ fontSize: '12px', fontWeight: 400, color: '#84919A', textAlign: 'left' }}
                  >
                    {rowData.protocol}
                  </Box>
                </Box>
              </Box>
            )}
          </Cell>
        </Column>

        <Column width={140} align="left" sortable verticalAlign="middle">
          <HeaderCell>Position Value</HeaderCell>
          <Cell>
            {(rowData) => (
              <Typography
                sx={{ fontSize: '14px', fontWeight: 400 }}
              >{`${rowData.position_value} ${rowData.asset}`}</Typography>
            )}
          </Cell>
        </Column>

        <Column width={119} align="left" sortable verticalAlign="middle">
          <HeaderCell>Debt Value</HeaderCell>
          <Cell>
            {(rowData) => (
              <Typography
                sx={{ fontSize: '14px', fontWeight: 400 }}
              >{`${rowData.debt_value} ${rowData.asset}`}</Typography>
            )}
          </Cell>
        </Column>

        <Column width={119} align="left" sortable verticalAlign="middle">
          <HeaderCell>Current APY</HeaderCell>
          <Cell>
            {(rowData) => (
              <Typography
                sx={{ fontSize: '14px', fontWeight: 400 }}
              >{`${rowData.current_apy} %`}</Typography>
            )}
          </Cell>
        </Column>

        <Column width={119} align="left" sortable verticalAlign="middle">
          <HeaderCell>Debt Ratio</HeaderCell>
          <Cell>
            {(rowData) => (
              <Typography
                sx={{ fontSize: '14px', fontWeight: 400 }}
              >{`${rowData.debt_ratio} %`}</Typography>
            )}
          </Cell>
        </Column>

        <Column width={112} align="left" sortable verticalAlign="middle">
          <HeaderCell>Liquidation Threshold</HeaderCell>
          <Cell>{(rowData) => `${rowData.liq_threshold}`}</Cell>
        </Column>

        <Column width={112} align="left" sortable verticalAlign="middle">
          <HeaderCell>Safety Buffer</HeaderCell>
          <Cell>{(rowData) => `${rowData.safety_buffer}`}</Cell>
        </Column>

        <Column width={179} align="right" verticalAlign="middle" fixed="right">
          <HeaderCell>Action</HeaderCell>
          <Cell>
            {(rowData) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box>
                  {' '}
                  <Button
                    onClick={() =>
                      router.push({
                        pathname: '/position_adjust',
                        query: { tknA: 'bnb', tknB: 'busd' },
                      })
                    }
                    sx={{
                      backgroundColor: 'rgba(21, 126, 255, 0.05)',
                      border: '1px solid rgba(21, 126, 255, 0.2)',
                      color: '#074592',
                      fontWeight: 600,
                      fontSize: '16px',
                      marginTop: '-4px',
                    }}
                  >
                    Adjust
                  </Button>
                </Box>
                <Box>
                  <Button
                    sx={{
                      backgroundColor: '#074592',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '16px',
                      marginTop: '-4px',
                    }}
                    variant="contained"
                    onClick={() => chooseOpenModalTwo(true)}
                  >
                    Close
                  </Button>
                </Box>
              </Box>
            )}
          </Cell>
        </Column>
      </Table>
    </>
  );
};
