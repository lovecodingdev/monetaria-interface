import {
  Box,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Button,
  Tab,
  Tabs,
  Switch,
} from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { usePermissions } from 'src/hooks/usePermissions';
import { ConnectWalletPaper } from '../src/components/ConnectWalletPaper';
import { ContentContainer } from '../src/components/ContentContainer';
import { MainLayout } from '../src/layouts/MainLayout';
import { useWeb3Context } from '../src/libs/hooks/useWeb3Context';
import borderGradient from 'src/layouts/borderGradient';
import dynamic from 'next/dynamic';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { SelectPicker, Radio, RadioGroup } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { BasicModal } from 'src/components/primitives/BasicModal';
import TerminalList from 'src/modules/dashboard/lists/TerminalList/TerminalList';
import LongTerminal from 'src/modules/terminal/longTerminal';
import ShortTerminal from 'src/modules/terminal/shortTerminal';
import SwapTerminal from 'src/modules/terminal/swapTerminal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import CodeImg from '/public/icons/code.svg';
import Slippage from '/public/icons/slippage.svg';
import PartialFill from '/public/icons/partial-fill.svg';
import OptimizedRouter from '/public/icons/optimized_router.svg';
import CompatibilityMode from '/public/icons/compatibility-mode.svg';
import LiquiditySources from '/public/icons/liquidity_sources.svg';
import CustomToken from '/public/icons/custom_token.svg';
import InfoIcon from '@mui/icons-material/Info';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface marketTrader {
  size: number;
  time: string;
  price: number;
  isDown: boolean;
}
const DynamicComponent = dynamic(() => import('react-tradingview-widget'), {
  ssr: false,
});

const coinList = [
  {
    label: 'Bitcoin/Tether',
    title: 'BTC/USDT',
    value: '0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1',
    tokenA: 'btc',
    tokenB: 'usdt',
  },
  {
    label: 'Bitcoin/BUSD',
    title: 'BTC/BUSD',
    value: '0xc6CB9A26DD5DFd155864C93B0eF6Af73D0e607b1',
    tokenA: 'btc',
    tokenB: 'busd',
  },
];

const marketTraders: marketTrader[] = [
  {
    size: 0.00600199,
    time: '1/4 21:12',
    price: 16809.6,
    isDown: false,
  },
  {
    size: 0.00600199,
    time: '1/4 21:12',
    price: 16809.6,
    isDown: true,
  },
  {
    size: 0.00600199,
    time: '1/4 21:12',
    price: 16809.6,
    isDown: false,
  },
  {
    size: 0.00600199,
    time: '1/4 21:12',
    price: 16809.6,
    isDown: true,
  },
];

const NewTabs = styled(Tabs)({
  minHeight: '28px',
  '& .MuiTabs-flexContainer': {
    gap: 4,
  },
  '& .MuiTabs-indicator': {
    display: 'none',
  },
  border: '1px solid #F6F8F9',
  padding: '2px',
  borderRadius: '100px',
  width: '100%',
});

const NewTab = styled(Tab)`
  margin: 0px;
  fontweight: 600;
  fontfamily: Gilroy, Arial !important;
  fontstyle: normal !important;
  min-height: 24px;
  border-radius: 100px;
  height: 40px;
  width: 32%;

  color: #b0babf;
  &.Mui-selected,
  &:hover {
    background: #bbfbd0;
    border-radius: 100px;
    color: #066f14;
    font-weight: bold;
  }
`;

export default function Terminal() {
  const { currentAccount, loading: web3Loading } = useWeb3Context();
  const { isPermissionsLoading } = usePermissions();
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [curCoin, setCurCoin] = useState('0xc6CB9A26DD5DFd155864C93C0eF6Af73D0e600b1');
  const [selectedTab, setSelectedTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [isPartialFilled, setIsPartialFilled] = useState(true);
  const [isRoutedPreset, setIsRoutedPreset] = useState(false);
  const [isCompatibilityMode, setIsCompatibilityMode] = useState(false);
  const [isV4, setIsV4] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <ContentContainer>
        {currentAccount && !isPermissionsLoading ? (
          <Box sx={{ fontFamily: 'Gilroy, Arial !important', fontStyle: 'normal' }}>
            <BasicModal open={openModal} setOpen={setOpenModal} withCloseButton={false}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <IconButton onClick={() => setOpenModal(!openModal)}>
                  <KeyboardArrowLeftIcon sx={{ fontSize: '24px', color: '#252C32' }} />
                </IconButton>
                <Typography sx={{ color: '#06070A', fontSize: '20px', fontWeight: 500 }}>
                  Settings
                </Typography>
                <Button sx={{ color: '#06070A', fontSize: '16px', fontWeight: 400 }}>Reset</Button>
              </Box>
              <Box sx={{ paddingTop: '15px' }}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '14px',
                        alignItems: 'center',
                      }}
                    >
                      <Box>
                        <CodeImg />
                      </Box>
                      <Typography sx={{ color: '#222222', fontWeight: 400, fontSize: '16px' }}>
                        Gas price
                      </Typography>
                      <Typography sx={{ color: '#6C86AD', fontWeight: 400, fontSize: '15px' }}>
                        Market (35.64 - 37.51 Gwei)
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                      <RadioGroup name="radioList">
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px',
                            border: '1px solid #EFF1F5',
                            height: '48px',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px',
                          }}
                        >
                          <Box>
                            <Radio value={'market'}>
                              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
                                <Typography
                                  sx={{ color: '#06070A', fontWeight: 400, fontSize: '13px' }}
                                >
                                  Market
                                </Typography>
                                <Typography
                                  sx={{ color: '#6C86AD', fontWeight: 400, fontSize: '13px' }}
                                >
                                  ~12 sec
                                </Typography>
                              </Box>
                            </Radio>
                          </Box>
                          <Box>
                            <Typography
                              sx={{ color: '#06070A', fontWeight: 400, fontSize: '13px' }}
                            >
                              35.64 - 37.51 Gwei
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px',
                            border: '1px solid #EFF1F5',
                            height: '48px',
                          }}
                        >
                          <Box>
                            <Radio value={'Aggressive'}>
                              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
                                <Typography
                                  sx={{ color: '#06070A', fontWeight: 400, fontSize: '13px' }}
                                >
                                  Aggressive
                                </Typography>
                                <Typography
                                  sx={{ color: '#6C86AD', fontWeight: 400, fontSize: '13px' }}
                                >
                                  {'<'} 10 sec
                                </Typography>
                              </Box>
                            </Radio>
                          </Box>
                          <Box>
                            <Typography
                              sx={{ color: '#06070A', fontWeight: 400, fontSize: '13px' }}
                            >
                              35.64 - 48.77 Gwei
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '10px',
                            border: '1px solid #EFF1F5',
                            height: '48px',
                            borderBottomLeftRadius: '8px',
                            borderBottomRightRadius: '8px',
                          }}
                        >
                          <Box>
                            <Radio value={'Custom'}>
                              <Box sx={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
                                <Typography
                                  sx={{ color: '#06070A', fontWeight: 400, fontSize: '13px' }}
                                >
                                  Custom
                                </Typography>
                                <Typography
                                  sx={{ color: '#6C86AD', fontWeight: 400, fontSize: '13px' }}
                                >
                                  ~12 sec
                                </Typography>
                              </Box>
                            </Radio>
                          </Box>
                          <Box>
                            <Typography
                              sx={{ color: '#06070A', fontWeight: 400, fontSize: '13px' }}
                            >
                              35.64 - 37.51 Gwei
                            </Typography>
                          </Box>
                        </Box>
                      </RadioGroup>
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '14px',
                        alignItems: 'center',
                      }}
                    >
                      <Box>
                        <Slippage />
                      </Box>
                      <Typography sx={{ color: '#222222', fontWeight: 400, fontSize: '16px' }}>
                        Slippage tolerance
                      </Typography>
                      <Typography sx={{ color: '#6C86AD', fontWeight: 400, fontSize: '15px' }}>
                        0.5% Auto
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        sx={{ backgroundColor: '#023997', width: '80px', color: 'white' }}
                        variant="contained"
                      >
                        Auto
                      </Button>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          gap: '0',
                          backgroundColor: '#ECF0F9',
                          borderRadius: '8px',
                        }}
                      >
                        <Button
                          sx={{
                            color: '#06070A',
                            fontWeight: 400,
                            fontSize: '13px',
                            minWidth: 'auto',
                          }}
                        >
                          0.1%
                        </Button>
                        <Button
                          sx={{
                            color: '#06070A',
                            fontWeight: 400,
                            fontSize: '13px',
                            minWidth: 'auto',
                          }}
                        >
                          0.5%
                        </Button>
                        <Button
                          sx={{
                            color: '#06070A',
                            fontWeight: 400,
                            fontSize: '13px',
                            minWidth: 'auto',
                          }}
                        >
                          1%
                        </Button>
                        <Button
                          sx={{
                            color: '#9BAFCD',
                            fontWeight: 400,
                            fontSize: '13px',
                            minWidth: 'auto',
                          }}
                        >
                          Custom
                        </Button>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '5px', paddingTop: '15px' }}
              >
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
                      flexDirection: 'row',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <PartialFill sx={{ width: '24px' }} />
                    </Box>
                    <Typography sx={{ color: '#222222', fontWeight: 400, fontSize: '16px' }}>
                      Partial fill
                    </Typography>
                    <InfoIcon sx={{ fontSize: '16px', color: '#B0BABF' }} />
                  </Box>
                  <Box>
                    <Switch
                      checked={isPartialFilled}
                      onChange={() => setIsPartialFilled(!isPartialFilled)}
                    />
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
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <OptimizedRouter sx={{ width: '24px' }} />
                    </Box>
                    <Typography sx={{ color: '#222222', fontWeight: 400, fontSize: '16px' }}>
                      Routing preset
                    </Typography>
                    <InfoIcon sx={{ fontSize: '16px', color: '#B0BABF' }} />
                  </Box>
                  <Box>
                    <Switch
                      checked={isRoutedPreset}
                      onChange={() => setIsRoutedPreset(!isRoutedPreset)}
                    />
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
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <CompatibilityMode sx={{ width: '24px' }} />
                    </Box>
                    <Typography sx={{ color: '#222222', fontWeight: 400, fontSize: '16px' }}>
                      Compatibility mode
                    </Typography>
                    <InfoIcon sx={{ fontSize: '16px', color: '#B0BABF' }} />
                  </Box>
                  <Box>
                    <Switch
                      checked={isCompatibilityMode}
                      onChange={() => setIsCompatibilityMode(!isCompatibilityMode)}
                    />
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
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <LiquiditySources sx={{ width: '24px' }} />
                    </Box>
                    <Typography sx={{ color: '#222222', fontWeight: 400, fontSize: '16px' }}>
                      Liquidity sources
                    </Typography>
                    <InfoIcon sx={{ fontSize: '16px', color: '#B0BABF' }} />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '4px',
                      alignItems: 'center',
                      color: '#6C86AD',
                      fontWeight: 400,
                    }}
                  >
                    <Typography sx={{ fontSize: '16px' }}>95</Typography> <KeyboardArrowRightIcon />
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
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <CustomToken sx={{ width: '24px' }} />
                    </Box>
                    <Typography sx={{ color: '#222222', fontWeight: 400, fontSize: '16px' }}>
                      Custom tokens
                    </Typography>
                    <InfoIcon sx={{ fontSize: '16px', color: '#B0BABF' }} />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '4px',
                      alignItems: 'center',
                      color: '#6C86AD',
                      fontWeight: 400,
                    }}
                  >
                    <Typography sx={{ fontSize: '16px' }}>0</Typography> <KeyboardArrowRightIcon />
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
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <OptimizedRouter sx={{ width: '24px' }} />
                    </Box>
                    <Typography sx={{ color: '#222222', fontWeight: 400, fontSize: '16px' }}>
                      Use Router V4
                    </Typography>
                    <InfoIcon sx={{ fontSize: '16px', color: '#B0BABF' }} />
                  </Box>
                  <Box>
                    <Switch checked={isV4} onChange={() => setIsV4(!isV4)} />
                  </Box>
                </Box>
              </Box>
            </BasicModal>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row', gap: '24px' },
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ flex: 2 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Paper
                    sx={{
                      bgcolor: 'background.header',
                      padding: '24px',
                      mt: { xs: '8px', md: '12px' },
                      color: '#F1F1F3',
                      ...borderGradient,
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: 'center',
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: { xs: '16px', sm: '42px' },
                            alignItems: 'center',
                          }}
                        >
                          {' '}
                          <Box className="pool-select">
                            <SelectPicker
                              data={coinList}
                              style={{ width: '207px' }}
                              value={curCoin}
                              onChange={setCurCoin}
                              placeholder="Select a coin"
                              searchable={false}
                              cleanable={false}
                              renderMenuItem={(label, item) => {
                                return (
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'row',

                                      alignItems: 'center',
                                      fontFamily: 'Gilroy, Arial !important',
                                      gap: '28px',
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
                                        symbol={item.tokenA}
                                        sx={{ fontSize: '40px', mr: 1, zIndex: 10 }}
                                      />{' '}
                                      <TokenIcon
                                        symbol={item.tokenB}
                                        sx={{
                                          fontSize: '40px',
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
                                        alignItems: 'center',
                                      }}
                                    >
                                      {' '}
                                      <Typography
                                        sx={{ fontWeight: 700, fontSize: '16px', color: '#080F26' }}
                                      >
                                        {item.title}
                                      </Typography>{' '}
                                      <Typography
                                        sx={{ fontWeight: 400, fontSize: '12px', color: '#D4D5DA' }}
                                      >
                                        {' '}
                                        ({item.label})
                                      </Typography>
                                    </Box>
                                  </Box>
                                );
                              }}
                              renderValue={(value, item) => {
                                return (
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      flexDirection: 'row',
                                      gap: '28px',
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
                                        symbol={item.tokenA}
                                        sx={{ fontSize: '40px', mr: 1, zIndex: 10 }}
                                      />{' '}
                                      <TokenIcon
                                        symbol={item.tokenB}
                                        sx={{
                                          fontSize: '40px',
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
                                        alignItems: 'center',
                                      }}
                                    >
                                      {' '}
                                      <Typography
                                        sx={{ fontWeight: 700, fontSize: '16px', color: '#080F26' }}
                                      >
                                        {item.title}
                                      </Typography>{' '}
                                      <Typography
                                        sx={{ fontWeight: 400, fontSize: '12px', color: '#D4D5DA' }}
                                      >
                                        {' '}
                                        ({item.label})
                                      </Typography>
                                    </Box>
                                  </Box>
                                );
                              }}
                            />
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: { xs: 'space-between', sm: 'flex-start' },
                            }}
                          >
                            <Box>
                              <Typography
                                sx={{ color: '#080F26', fontWeight: 500, fontSize: '20px' }}
                              >
                                16,629.4
                              </Typography>
                            </Box>
                            <Box>
                              {' '}
                              <Typography
                                sx={{ color: '#22C348', fontWeight: 500, fontSize: '12px' }}
                              >
                                +0.41%
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      {!downToXSM && (
                        <Box
                          sx={{
                            flex: 1,
                            borderLeft: { xs: 'none', sm: '1px solid rgba(95, 100, 108, 0.6)' },
                            paddingLeft: { xs: '0px', sm: '32px' },
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: { xs: 'column', sm: 'row' },
                              gap: { xs: '0', sm: '42px' },
                            }}
                          >
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: { xs: 'row', sm: 'column' },
                                alignItems: 'center',
                                justifyContent: { xs: 'space-between', sm: 'flex-start' },
                              }}
                            >
                              <Box>
                                <Typography
                                  sx={{ color: '#D4D5DA', fontWeight: 400, fontSize: '12px' }}
                                >
                                  24h Change
                                </Typography>
                              </Box>
                              <Box>
                                {' '}
                                <Typography
                                  sx={{ color: '#22C348', fontWeight: 500, fontSize: '20px' }}
                                >
                                  +0.41%
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: { xs: 'row', sm: 'column' },
                                alignItems: 'center',
                                justifyContent: { xs: 'space-between', sm: 'flex-start' },
                              }}
                            >
                              <Box>
                                <Typography
                                  sx={{ color: '#D4D5DA', fontWeight: 400, fontSize: '12px' }}
                                >
                                  24h High
                                </Typography>
                              </Box>
                              <Box>
                                {' '}
                                <Typography
                                  sx={{ color: '#080F26', fontWeight: 500, fontSize: '20px' }}
                                >
                                  667,024.2
                                </Typography>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: { xs: 'row', sm: 'column' },
                                alignItems: 'center',
                                justifyContent: { xs: 'space-between', sm: 'flex-start' },
                              }}
                            >
                              <Box>
                                <Typography
                                  sx={{ color: '#D4D5DA', fontWeight: 400, fontSize: '12px' }}
                                >
                                  24h Low
                                </Typography>
                              </Box>
                              <Box>
                                {' '}
                                <Typography
                                  sx={{ color: '#080F26', fontWeight: 500, fontSize: '20px' }}
                                >
                                  15,629.4
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Paper>
                  <Paper
                    sx={{
                      bgcolor: 'background.header',
                      padding: '24px',
                      mt: { xs: '8px', md: '12px' },
                      color: '#F1F1F3',
                      ...borderGradient,
                    }}
                  >
                    <DynamicComponent
                      symbol="BTCUSDT"
                      width={'779px'}
                      height="419px"
                      interval="60"
                      autosize={downToXSM ? true : false}
                    />
                  </Paper>
                  <Paper
                    sx={{
                      bgcolor: 'background.header',
                      padding: '24px',
                      mt: { xs: '8px', md: '12px' },
                      color: '#F1F1F3',
                      ...borderGradient,
                    }}
                  >
                    <TerminalList />
                  </Paper>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <Box>
                    {' '}
                    <Paper
                      sx={{
                        bgcolor: 'background.header',
                        padding: '24px',
                        mt: { xs: '8px', md: '12px' },
                        color: '#F1F1F3',
                        ...borderGradient,
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Box>
                          <NewTabs
                            value={selectedTab}
                            onChange={handleChange}
                            sx={{
                              mb: 2,
                            }}
                          >
                            <NewTab
                              label="Long"
                              sx={{
                                fontSize: { xs: '14px', md: '14px' },
                                fontFamily: 'Gilroy,Arial !important',
                                fontStyle: 'normal',
                              }}
                            />
                            <NewTab
                              label="Short"
                              sx={{
                                fontSize: { xs: '14px', md: '14px' },
                                fontFamily: 'Gilroy,Arial !important',
                                fontStyle: 'normal',
                              }}
                            />
                            <NewTab
                              label="Swap"
                              sx={{
                                fontSize: { xs: '14px', md: '14px' },
                                fontFamily: 'Gilroy,Arial !important',
                                fontStyle: 'normal',
                              }}
                            />
                          </NewTabs>
                        </Box>
                        <Box>
                          {selectedTab == 0 && <LongTerminal setOpenModal={setOpenModal} />}
                          {selectedTab == 1 && <ShortTerminal />}
                          {selectedTab == 2 && <SwapTerminal />}
                        </Box>
                      </Box>
                    </Paper>
                  </Box>
                  <Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        paddingRight: { xs: '6px', sm: '11px' },
                        border: '1px solid #EBEFF0',
                        padding: '10px',
                        borderRadius: '8px',
                      }}
                    >
                      <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '14px' }}>
                        Long BTC
                      </Typography>{' '}
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                          Entry Price
                        </Typography>
                        <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                          16,822.3
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                          Exit Price
                        </Typography>
                        <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                          16.8392
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                          Borrow Fee
                        </Typography>
                        <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                          0.0028% / 1h
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '12px' }}>
                          Available Liquidity
                        </Typography>
                        <Typography sx={{ color: '#252C32', fontWeight: 400, fontSize: '12px' }}>
                          $9,931,264.64
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <ConnectWalletPaper loading={web3Loading} />
        )}
      </ContentContainer>
    </>
  );
}

Terminal.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
