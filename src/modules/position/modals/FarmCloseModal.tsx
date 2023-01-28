import React from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  IconButton,
  Tabs,
  Tab,
} from '@mui/material';
import { BasicModal } from 'src/components/primitives/BasicModal';
import Slider from '@mui/material/Slider';
import SettingsIcon from '@mui/icons-material/Settings';
import { InformationCircleIcon } from '@heroicons/react/outline';
import { TokenPair } from 'src/components/primitives/TokenPair';
import { Input, SelectPicker } from 'rsuite';
import { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { TokenIcon } from 'src/components/primitives/TokenIcon';

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
  padding: 0 20px;
  color: #000000;
  border-radius: 10px;
  min-height: 24px;
  &.Mui-selected,
  &:hover {
    background: #074592;
    border-radius: 10px;
    color: #ffffff;
    font-weight: bold;
  }
`;

const closeOptionData = ['Close Your Entire Position', 'Partially Close Your Position'].map(
  (item, index) => ({
    label: item,
    value: index,
  })
);

const investMarks = [
  {
    value: 1,
    label: '1%',
  },
  {
    value: 50,
    label: '50%',
  },
  {
    value: 100,
    label: '100%',
  },
];

interface FarmCloseModalProps {
  isOpenFarmCloseModal: boolean;
  setOpen: (value: boolean) => void;
}

export const FarmCloseModal = ({ isOpenFarmCloseModal, setOpen }: FarmCloseModalProps) => {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  const [optionValue, setOptionValue] = useState(0);
  const [selectedTab, setSelectedTab] = useState(0);
  const [investDay, setInvestDay] = useState(180);

  const handleSelectedTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const valuetextForInvest = (_value: number) => {
    setInvestDay(_value);
  };

  return (
    <BasicModal
      open={isOpenFarmCloseModal}
      setOpen={setOpen}
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
        cleanable={false}
      />
      {optionValue == 0 && (
        <>
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
          {selectedTab == 0 && (
            <>
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
                  We will convert the minimum required amount of tokens into BUSD to pay back the
                  debt and return the remaining assets to you. This can potentially save on slippage
                  and trading fees.
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
            </>
          )}

          {selectedTab == 1 && (
            <>
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
                  Your position value will all be converted to BUSD and returned to you after paying
                  back the debt.
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
                    0.00 USDT (0.00%)
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
            </>
          )}
        </>
      )}
      {optionValue == 1 && (
        <>
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
          {selectedTab == 0 && (
            <>
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
                  We will convert the minimum required amount of tokens into BUSD to pay back the
                  debt and return the remaining assets to you. This can potentially save on slippage
                  and trading fees.
                </Typography>
              </Box>
              <Typography sx={{ color: '#000000', fontWeight: 700, fontSize: '18px' }}>
                What percentage of position value would you like to close?
                <br />
                (aka withdraw collateral)
              </Typography>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    my: '30px',
                  }}
                >
                  <Box sx={{ flex: 1, padding: '0 10px' }}>
                    <Slider
                      aria-label="Custom marks"
                      defaultValue={50}
                      step={1}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetextForInvest}
                      min={1}
                      max={100}
                      marks={investMarks}
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
                  <Box sx={{ width: '100px' }}>
                    <Input value={investDay} />
                  </Box>
                </Box>
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
                          20.01 USDT + 20.01 BUSD
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
                          20.00 USDT + 20.01 BUSD
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
                      Updated Position Value Assets
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
                    20.00 USDT + 20.01 BUSD
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'first-start',
                    borderBottom: '4px solid #E5E9EB',
                    pb: 3,
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
                    00.00 USDT (0.00%)
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
                      Updated Equity Value
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                    39.98 BUSD {'->'} 39.98 BUSD
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
                      Updated Debt Value
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                    0.00 BUSD {'->'} 0.00 BUSD
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
                      Updated Debt Ratio (Leverage)
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
                        (Max Leverage Allowed: 6x)
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                    0.00% (1.00x ) {'->'} 0.00% (1.00x)
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
                      Updated Safety Buffer
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                    92.00% {'->'} 92.00%
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
                      Yield Farm APR
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                    0.00% {'->'} 0.00%
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
                      Trading Fees APR (7-day avg.)
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                    1.03% {'->'} 1.03%
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
                      ALPACA Rewards APR
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                    0.00% {'->'} 0.00%
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
                      Borrowing Interest APR
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#F76659', fontWeight: 600, fontSize: '12px' }}>
                    1.03% {'->'} 1.03%
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
                      Total APR
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
                        (Yield Farming + Trading Fees + ALPACA Rewards – Borrowing Interest)
                      </Typography>
                    </Box>
                  </Box>
                  <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                    0.00% (1.00x ) {'->'} 0.00% (1.00x)
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
                      Total APY
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
                    1.03% {'->'} 1.03%
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: '#59729D', fontWeight: 700, fontSize: '14px' }}>
                    Summary
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
                      Total Assets in Position Value
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
                    20.00 USDT + 20.01 BUSD
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
                  <Box
                    sx={{
                      dispaly: 'flex',
                      flexDirection: 'column',
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
                        Price Impact and Trading Fees
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
                    <Typography sx={{ color: '#59729D', fontWeight: 400, fontSize: '12px' }}>
                      (Percent impact calculated based on your equity value)
                    </Typography>
                  </Box>
                  <Typography sx={{ color: '#59729D', fontWeight: 600, fontSize: '14px' }}>
                    0.00% (1.00x ) {'->'} 0.00% (1.00x)
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
                      Converted Position Value Assets
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
                    0.00 USDT + 0.00 BUSD
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
                      Amount of Debt to Repay
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
            </>
          )}

          {selectedTab == 1 && (
            <>
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
                  We will convert the minimum required amount of tokens into BUSD to pay back the
                  debt and return the remaining assets to you. This can potentially save on slippage
                  and trading fees.
                </Typography>
              </Box>
            </>
          )}
        </>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <IconButton>
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
          >
            Close Position
          </Button>
        </Box>
      </Box>
    </BasicModal>
  );
};
