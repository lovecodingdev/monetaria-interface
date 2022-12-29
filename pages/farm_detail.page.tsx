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
import { useEffect, useState } from 'react';
import { MainLayout } from '../src/layouts/MainLayout';
import borderGradient from 'src/layouts/borderGradient';
import { InputGroup, Input } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { BaseNetworkConfig } from 'src/ui-config/networksConfig';
import {
  availableMarkets,
  CustomMarket,
  MarketDataType,
  marketsData,
  networkConfigs,
} from 'src/utils/marketsAndNetworksConfig';
import Slider from '@mui/material/Slider';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import MntShiba from '/public/icons/tokens/mnt-shiba.svg';

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

const marks = [
  {
    value: 1,
    label: '1.00x',
  },
  {
    value: 1.5,
    label: '1.50x',
  },
  {
    value: 2,
    label: '2.00x',
  },
];

export default function FarmDetail() {
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [amtOfMnt, setAmtOfMnt] = useState(0);
  const [amtOfCoin, setAmtOfCoin] = useState(0);
  const [times, setTimes] = useState(1.5);

  const valuetext = (value: number) => {
    setTimes(value);
    return `${value} Week(s)`;
  };

  return (
    <Container
      sx={{
        pb: 0,
        flexGrow: 0,
        width: { xs: '100%', sm: '700px' },
        fontFamily: 'Gilroy, Arial !important',
        fontStyle: 'normal',
        paddingTop: '33px',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: { xs: '24px', sm: '98px' } }}>
          <Box>
            <Button
              startIcon={<KeyboardArrowLeftIcon />}
              href="/farm"
              sx={{
                backgroundColor: 'white',
                border: '1px solid #DDE2E4',
                borderRadius: '8px',
                color: '#252C32',
              }}
            >
              Back
            </Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '3px' }}>
            <Typography sx={{ color: '#080F26', fontWeight: 700, fontSize: '24px' }}>
              Farming
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MntShiba /> MNT - Shiba
            </Box>
          </Box>
        </Box>
        <Box>
          <Paper
            sx={{
              bgcolor: 'background.header',
              padding: { xs: '24px 8px', sm: '24px 22px' },
              mt: { xs: '8px', md: '12px' },
              color: '#F1F1F3',
              ...borderGradient,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Box>
                <label
                  style={{
                    display: 'block',
                    color: '#252C32',
                    fontWeight: 400,
                    fontSize: '14px',
                    paddingBottom: '5px',
                  }}
                >
                  MNT
                </label>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#F6F8F9',
                    border: '1px solid #EEF0F2',
                    height: '48px',
                    alignItems: 'center',
                    padding: '0 17px',
                    borderRadius: '8px',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    <TokenIcon symbol={'mnt'} sx={{ fontSize: '24px', mr: 1 }} />
                    <input
                      type="number"
                      className="stake-input"
                      placeholder="0.00"
                      step={0.01}
                      value={amtOfMnt}
                      onChange={(e) => setAmtOfMnt(e.target.value)}
                      style={{
                        outline: 'none',
                        border: 'none',
                        backgroundColor: 'transparent',
                        fontWeight: 500,
                        fontSize: '18px',
                        color: '#D5DADD',
                        width: downToXSM ? '120px' : '100%',
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                    <Typography sx={{ color: '#9AA6AC', fontWeight: 400, fontSize: '12px' }}>
                      Balance: <span style={{ fontWeight: 600 }}>179 MNT</span>
                    </Typography>
                    <Typography
                      sx={{
                        color: '#9AA6AC',
                        fontWeight: 400,
                        fontSize: '12px',
                        textDecoration: 'underline',
                      }}
                    >
                      Buy
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                <Button
                  sx={{
                    flex: 1,
                    backgroundColor: '#EEF0F2',
                    color: '#000000',
                    borderRadius: '8px',
                    height: '33px',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  25%
                </Button>
                <Button
                  sx={{
                    flex: 1,
                    backgroundColor: '#EEF0F2',
                    color: '#000000',
                    borderRadius: '8px',
                    height: '33px',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  50%
                </Button>
                <Button
                  sx={{
                    flex: 1,
                    backgroundColor: '#EEF0F2',
                    color: '#000000',
                    borderRadius: '8px',
                    height: '33px',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  75%
                </Button>
                <Button
                  sx={{
                    flex: 1,
                    backgroundColor: '#EEF0F2',
                    color: '#000000',
                    borderRadius: '8px',
                    height: '33px',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  100%
                </Button>
              </Box>
              <Box>
                <label
                  style={{
                    display: 'block',
                    color: '#252C32',
                    fontWeight: 400,
                    fontSize: '14px',
                    paddingBottom: '5px',
                  }}
                >
                  COIN
                </label>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#F6F8F9',
                    border: '1px solid #EEF0F2',
                    height: '48px',
                    alignItems: 'center',
                    padding: '0 17px',
                    borderRadius: '8px',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                    <TokenIcon symbol={'bnb'} sx={{ fontSize: '24px', mr: 1 }} />
                    <input
                      type="number"
                      className="stake-input"
                      placeholder="0.00"
                      step={0.01}
                      value={amtOfCoin}
                      onChange={(e) => setAmtOfCoin(e.target.value)}
                      style={{
                        outline: 'none',
                        border: 'none',
                        backgroundColor: 'transparent',
                        fontWeight: 500,
                        fontSize: '18px',
                        color: '#D5DADD',
                        width: downToXSM ? '120px' : '100%',
                      }}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px' }}>
                    <Typography sx={{ color: '#9AA6AC', fontWeight: 400, fontSize: '12px' }}>
                      Balance: <span style={{ fontWeight: 600 }}>179 COIN</span>
                    </Typography>
                    <Typography
                      sx={{
                        color: '#9AA6AC',
                        fontWeight: 400,
                        fontSize: '12px',
                        textDecoration: 'underline',
                      }}
                    >
                      Buy
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
                <Button
                  sx={{
                    flex: 1,
                    backgroundColor: '#EEF0F2',
                    color: '#000000',
                    borderRadius: '8px',
                    height: '33px',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  25%
                </Button>
                <Button
                  sx={{
                    flex: 1,
                    backgroundColor: '#EEF0F2',
                    color: '#000000',
                    borderRadius: '8px',
                    height: '33px',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  50%
                </Button>
                <Button
                  sx={{
                    flex: 1,
                    backgroundColor: '#EEF0F2',
                    color: '#000000',
                    borderRadius: '8px',
                    height: '33px',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  75%
                </Button>
                <Button
                  sx={{
                    flex: 1,
                    backgroundColor: '#EEF0F2',
                    color: '#000000',
                    borderRadius: '8px',
                    height: '33px',
                    fontSize: '14px',
                    fontWeight: 600,
                  }}
                >
                  100%
                </Button>
              </Box>
              <Box>
                <label
                  style={{
                    display: 'block',
                    color: '#252C32',
                    fontWeight: 400,
                    fontSize: '14px',
                    paddingBottom: '5px',
                  }}
                >
                  Leverage
                </label>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <Box sx={{ flex: 3, padding: '0 10px' }}>
                    {' '}
                    <Slider
                      aria-label="Custom marks"
                      defaultValue={1.5}
                      step={0.5}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      min={1}
                      max={2}
                      marks={marks}
                      sx={{
                        '& .MuiSlider-thumb': {
                          backgroundColor: '#F6F8F9',
                          border: '1px solid #B0BABF',
                          opacity: 1,
                          '&:focus, &:hover, &.Mui-active': {
                            boxShadow:
                              '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
                            // Reset on touch devices, it doesn't add specificity
                          },
                        },
                        '& .MuiSlider-track': {
                          border: 'none',
                          backgroundColor: '#074592',
                        },
                        '& .MuiSlider-rail': {
                          opacity: 1,
                          backgroundColor: '#DDE2E4',
                        },
                        '& .MuiSlider-mark': {
                          backgroundColor: '#bfbfbf',
                          height: '2px',
                          '&.MuiSlider-markActive': {
                            opacity: 1,
                            backgroundColor: '#F6F8F9',
                          },
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    {' '}
                    <InputGroup inside>
                      <Input value={times} />
                      <InputGroup.Addon>X</InputGroup.Addon>
                    </InputGroup>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

FarmDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
