import { useState } from 'react';
import {
  Box,
  Button,
  useMediaQuery,
  Typography,
  useTheme,
  Tabs,
  Tab,
  IconButton,
  SvgIcon,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { InformationCircleIcon } from '@heroicons/react/outline';
import { styled } from '@mui/system';
import { Table, SelectPicker } from 'rsuite';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { PositionType } from './positionType';
import { useRouter } from 'next/router';
import { BasicModal } from 'src/components/primitives/BasicModal';
import { TokenPair } from 'src/components/primitives/TokenPair';

const { Column, HeaderCell, Cell } = Table;
const data: PositionType[] = [
  {
    asset: 'BUSD',
    symbol: 'busd',
    no: 57287,
    tokenA: 'bnb',
    tokenB: 'busd',
    protocol: 'Pancake Swap',
    position_value: 39.98,
    debt_value: 0,
    current_apy: 1.03,
    debt_ratio: 0,
    liq_threshold: 'No Debt',
    safety_buffer: 'No Debt',
  },
  {
    asset: 'BUSD',
    symbol: 'busd',
    no: 57288,
    tokenA: 'bnb',
    tokenB: 'usdt',
    protocol: 'Pancake Swap',
    position_value: 39.98,
    debt_value: 0,
    current_apy: 1.03,
    debt_ratio: 0,
    liq_threshold: 'No Debt',
    safety_buffer: 'No Debt',
  },
  {
    asset: 'BUSD',
    symbol: 'busd',
    no: 57289,
    tokenA: 'bnb',
    tokenB: 'cake',
    protocol: 'Pancake Swap',
    position_value: 39.98,
    debt_value: 0,
    current_apy: 1.03,
    debt_ratio: 0,
    liq_threshold: 'No Debt',
    safety_buffer: 'No Debt',
  },
];

const closeOptionData = ['Close Your Entire Position', 'Partially Close Your Position'].map(
  (item) => ({
    label: item,
    value: item,
  })
);

// Tab CSS
const NewTabs = styled(Tabs)({
  '& .MuiTabs-flexContainer': {
    gap: '8px',
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  padding: '0px',
});

const NewTab = styled(Tab)`
  margin: 0px;
  fontweight: 600;
  fontfamily: Gilroy, Arial !important;
  fontstyle: normal !important;
  background: #f6f8f9;
  padding: 5px 20px;
  color: #000000;
  border-radius: 5px;
  min-height: 24px;
  &.Mui-selected,
  &:hover {
    background: #074592;
    border-radius: 5px;
    color: #ffffff;
    font-weight: bold;
  }
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export const PositionTable = () => {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [optionValue, setOptionValue] = useState('Close Your Entire Position');
  const [selectedTab, setSelectedTab] = useState(0);

  const handleSelectedTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

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
      <BasicModal
        open={openModal}
        setOpen={setOpenModal}
        withCloseButton={true}
        contentMaxWidth={731}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '20px' }}>
            Close Position
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#080F26',
              fontSize: '16px',
              fontWeight: 400,
            }}
          >
            <TokenPair tokenA={'bnb'} tokenB={'usdt'} />{' '}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingLeft: '8px',
                pr: 12,
              }}
            >
              <Typography sx={{ color: '#080F26', fontSize: '16px' }}>SHB-BNB</Typography>
              <Typography sx={{ color: '#84919A' }}>BUSD#57287</Typography>
            </Box>
          </Box>
        </Box>
        <SelectPicker
          data={closeOptionData}
          style={{ width: downToXSM ? '140px' : '230px' }}
          value={optionValue}
          onChange={setOptionValue}
          searchable={false}
          menuStyle={{ zIndex: 2000 }}
        />
        <NewTabs
          value={selectedTab}
          onChange={handleSelectedTabChange}
          sx={{
            my: 4,
          }}
        >
          <NewTab label="Minimize Trading" />
          <NewTab label="Convert to BUSD" />
        </NewTabs>
        <Box
          sx={{
            background: '#EBF7FF',
            border: '1px solid #D7EDFF',
            borderRadius: '6px',
            mb: 4,
          }}
        >
          <Typography
            sx={{
              color: '#080F26',
              fontWeight: 400,
              fontSize: '14px',
              padding: '16px',
              lineHeight: '24px',
            }}
          >
            We will convert the minimum required amount of tokens into BUSD to pay back the debt and
            return the remaining assets to you. This can potentially save on slippage and trading
            fees.
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid #D7EDFF',
            borderRadius: '6px',
            mb: 4,
            padding: '16px',
            gap: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'first-start',
            }}
          >
            <Box>
              <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                Position Volue Assedts
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  color: '#080F26',
                  fontSize: '16px',
                  fontWeight: 400,
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#080F26',
                    fontSize: '16px',
                    fontWeight: 400,
                  }}
                >
                  <TokenIcon
                    symbol="bnb"
                    sx={{
                      fontSize: '32px',
                      mr: 1,
                      width: '16px',
                      height: '16px',
                    }}
                  />
                  <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                    1 USDT = 0.999 BUSD
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#080F26',
                    fontSize: '16px',
                    fontWeight: 400,
                  }}
                >
                  <TokenIcon
                    symbol="usdt"
                    sx={{
                      fontSize: '32px',
                      width: '16px',
                      height: '16px',
                      mr: 1,
                    }}
                  />
                  <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                    1 BUSD = 1.00 BUSD
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
              20.01 USDT+ 20.01 BUSD
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                Amount to Trade
              </Typography>
              <IconButton
                sx={{
                  display: 'flex',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  p: 0,
                  minWidth: 0,
                  ml: 1.5,
                  background: 'rgba(89, 114, 157, 0.25)',
                }}
              >
                <InformationCircleIcon />
              </IconButton>
            </Box>
            <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
              0.00 USDT
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'first-start',
            }}
          >
            <Box>
              <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                Price Impactand Trading Fees
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  color: '#080F26',
                  fontSize: '16px',
                  fontWeight: 400,
                  gap: 3,
                }}
              >
                <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                  (Percent impact calculatedbased on your equity value)
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
              20.01 USDT+ 20.01 BUSD
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                Converted PositionValue Assets
              </Typography>
              <IconButton
                sx={{
                  display: 'flex',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  p: 0,
                  minWidth: 0,
                  ml: 1.5,
                  background: 'rgba(89, 114, 157, 0.25)',
                }}
              >
                <InformationCircleIcon />
              </IconButton>
            </Box>
            <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
              20.00 USDT+ 20.01 BUSD
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '4px solid #E5E9EB',
              pb: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                Debt Value
              </Typography>
              <IconButton
                sx={{
                  display: 'flex',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  p: 0,
                  minWidth: 0,
                  ml: 1.5,
                  background: 'rgba(89, 114, 157, 0.25)',
                }}
              >
                <InformationCircleIcon />
              </IconButton>
            </Box>
            <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
              0.00 BUSD
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography sx={{ color: '#59729D', fontWeight: 700, fontSize: '14px' }}>
                You will receive approximately
              </Typography>
            </Box>
            <Typography sx={{ color: '#59729D', fontWeight: 700, fontSize: '14px' }}>
              20.00 USDT+ 20.01 BUSD
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Typography sx={{ color: '#59729D', fontWeight: 500, fontSize: '12px' }}>
                Minimum Received
              </Typography>
              <IconButton
                sx={{
                  display: 'flex',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  p: 0,
                  minWidth: 0,
                  ml: 1.5,
                  background: 'rgba(89, 114, 157, 0.25)',
                }}
              >
                <InformationCircleIcon />
              </IconButton>
            </Box>
            <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '12px' }}>
              19.95 USDT+ 20.01 BUSD
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <IconButton onClick={() => setOpenModal(true)}>
              <SettingsIcon sx={{ color: '#84919A' }} />
            </IconButton>
          </Box>
          <Box>
            <Button
              sx={{
                backgroundColor: '#074592',
                color: 'white',
                fontWeight: 600,
                fontSize: '16px',
                marginTop: '-4px',
                px: 30,
              }}
              variant="contained"
              onClick={() => setOpenModal(true)}
            >
              Close Position
            </Button>
          </Box>
        </Box>
      </BasicModal>
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
        <Column width={165} align="left" fixed sortable verticalAlign="middle">
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
                    onClick={() => setOpenModal(true)}
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
