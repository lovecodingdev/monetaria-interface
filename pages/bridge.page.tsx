import {
  Box,
  Container,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { MainLayout } from '../src/layouts/MainLayout';
import borderGradient from 'src/layouts/borderGradient';
import { SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import SyncIcon from '@mui/icons-material/Sync';
import Logo from '/public/logo_green.svg';
import Cup from '/public/icons/cup.svg';
import { BaseNetworkConfig } from 'src/ui-config/networksConfig';
import {
  availableMarkets,
  CustomMarket,
  MarketDataType,
  marketsData,
  networkConfigs,
} from 'src/utils/marketsAndNetworksConfig';

export const getMarketInfoById = (marketId: CustomMarket) => {
  const market: MarketDataType = marketsData[marketId as CustomMarket];
  const network: BaseNetworkConfig = networkConfigs[market.chainId];

  return { market, network };
};

const getMarketHelpData = (marketName: string) => {
  const testChains = ['Görli', 'Ropsten', 'Mumbai', 'Fuji', 'Testnet', 'Kovan', 'Rinkeby'];
  const arrayName = marketName.split(' ');
  const testChainName = arrayName.filter((el) => testChains.indexOf(el) > -1);
  const marketTitle = arrayName.filter((el) => !testChainName.includes(el)).join(' ');
  return {
    name: marketTitle,
    testChainName: testChainName[0],
  };
};

interface Network {
  label: string;
  value: string;
  img: string;
}

const all_networks: Network[] = [];

availableMarkets.map((marketId: CustomMarket) => {
  const { market, network } = getMarketInfoById(marketId);
  const marketNaming = getMarketHelpData(market.marketTitle);
  all_networks.push({
    label: `${marketNaming.name}`,
    value: market.marketTitle,
    img: network.networkLogoPath,
  });
});

export default function Calc() {
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [approveAmt, setApproveAmt] = useState(12.4);
  const [networks, setNetworks] = useState([]);
  const [firstNetwork, setFirstNetwork] = useState('Ethereum');
  const [secondNetwork, setSecondNetwork] = useState('Polygon');

  const exchangeNetwork = () => {
    const first = firstNetwork;
    const second = secondNetwork;

    setFirstNetwork(second);
    setSecondNetwork(first);
  };

  return (
    <Container
      sx={{
        pb: 0,
        flexGrow: 0,
        width: { xs: '100%', sm: '700px' },
        fontFamily: 'Gilroy, Arial !important',
        fontStyle: 'normal',
      }}
    >
      <Paper
        sx={{
          bgcolor: 'background.header',
          padding: { xs: '24px 8px', sm: '24px' },
          mt: { xs: '8px', md: '12px' },
          color: '#F1F1F3',
          ...borderGradient,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {' '}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box>
              <Logo />
            </Box>
            <Box>
              <Typography sx={{ color: '#252C32', fontSize: '20px', fontWeight: 600 }}>
                MNT
              </Typography>
            </Box>{' '}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              alignItems: 'end',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <label
                style={{
                  display: 'block',
                  color: '#252C32',
                  fontWeight: 600,
                  fontSize: '14px',
                  paddingBottom: '5px',
                }}
              >
                From
              </label>

              <SelectPicker
                data={all_networks}
                style={{ width: !downToXSM ? '200px' : '140px' }}
                value={firstNetwork}
                onChange={(value: string, e) => {
                  const second = secondNetwork;
                  if (value === second) {
                    exchangeNetwork();
                  } else {
                    setFirstNetwork(value);
                  }
                }}
                cleanable={false}
                placeholder="Select a gauge"
                searchable={false}
                renderMenuItem={(label, item) => {
                  return (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 2,
                        alignItems: 'center',
                        fontFamily: 'Gilroy, Arial !important',
                      }}
                    >
                      <Box>
                        <img src={item?.img} width="22" height="22" />
                      </Box>
                      <Box>{item?.label}</Box>
                    </Box>
                  );
                }}
                renderValue={(value, item) => {
                  return (
                    <Box
                      sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
                    >
                      <Box>
                        <img src={item?.img} width="22" height="22" />
                      </Box>
                      <Box sx={{ color: '#252C32', fontWeight: 400, fontSize: '14px' }}>
                        {item?.label}
                      </Box>
                    </Box>
                  );
                }}
              />
            </Box>
            <Box>
              <IconButton onClick={exchangeNetwork}>
                <SyncIcon sx={{ color: '#6E7C87' }} />
              </IconButton>
            </Box>
            <Box>
              <label
                style={{
                  display: 'block',
                  color: '#252C32',
                  fontWeight: 600,
                  fontSize: '14px',
                  paddingBottom: '5px',
                }}
              >
                To
              </label>
              <SelectPicker
                data={all_networks}
                style={{ width: !downToXSM ? '200px' : '140px' }}
                value={secondNetwork}
                onChange={(value: string, e) => {
                  const first = firstNetwork;
                  if (value === first) {
                    exchangeNetwork();
                  } else {
                    setSecondNetwork(value);
                  }
                }}
                cleanable={false}
                placeholder="Select a gauge"
                searchable={false}
                renderMenuItem={(label, item) => {
                  return (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 1,
                        alignItems: 'center',
                        fontFamily: 'Gilroy, Arial !important',
                      }}
                    >
                      <Box>
                        <img src={item?.img} width="24" height="24" />
                      </Box>
                      <Box>{label}</Box>
                    </Box>
                  );
                }}
                renderValue={(value, item) => {
                  return (
                    <Box
                      sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}
                    >
                      <Box>
                        <img src={item?.img} width="24" height="24" />
                      </Box>
                      <Box sx={{ color: '#252C32', fontWeight: 400, fontSize: '14px' }}>
                        {value}
                      </Box>
                    </Box>
                  );
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#EEF0F2',
              borderRadius: '16px',
              padding: '12px 20px',
              alignItems: 'center',
            }}
          >
            <Box>
              <input
                value={approveAmt}
                className="stake-input"
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onChange={(e) => setApproveAmt(e.target.value)}
                type="number"
                onKeyDown={(e) => {
                  if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
                    e.preventDefault();
                  }
                }}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'black',
                  fontSize: '28px',
                  outline: 'none',
                  fontWeight: 500,
                  width: '170px',
                }}
              />
              <Box sx={{ color: '#9AA6AC', fontSize: '12px', fontWeight: 400 }}>$179,721,98</Box>
            </Box>

            <Button
              sx={{
                color: '#074592',
                fontWeight: 600,
                fontSize: '14px',
                backgroundColor: 'rgba(21, 126, 255, 0.05)',
                border: '1px solid rgba(21, 126, 255, 0.2)',
              }}
            >
              {' '}
              Max
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Cup />
            </Box>
            <Box>
              <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '14px' }}>
                $0.18
              </Typography>
            </Box>
          </Box>
          <Button
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundImage: 'linear-gradient(270deg, #393DFF 0%, #9582FF 100%)',
              height: '40px',
              color: '#F6F8F9',
              fontWeight: 600,
              fontSize: '14px',
            }}
          >
            Approve
          </Button>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                Wallet Balance
              </Typography>
            </Box>
            <Box>
              <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                0 USDT
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              border: '1px solid #EBF7FF',
              borderRadius: '8px',
              padding: '8px 16px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                  Daily Quota of Current Network
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                  0 / 60000 USDT
                </Typography>
              </Box>
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
                <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                  Minimum Amount
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                  60 USDT
                </Typography>
              </Box>
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
                <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                  Maximum Amount
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                  10000 USDT
                </Typography>
              </Box>
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
                <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                  Est. Time Required
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                  10min ～ 3h
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

Calc.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
