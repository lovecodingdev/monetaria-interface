import { Box, Container, Paper, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { MainLayout } from '../src/layouts/MainLayout';
import borderGradient from 'src/layouts/borderGradient';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { Input, InputGroup, SelectPicker } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import 'rsuite/dist/rsuite.min.css';
import { RewardTable } from 'src/modules/dashboard/lists/ActivePoolList/RewardTable';
import { RewardMobileList } from 'src/modules/dashboard/lists/ActivePoolList/RewardMobileList';

interface dex_type {
  img: string;
  label: string;
  value: string;
}

interface token_type {
  label: string;
  value: string;
}

const arrDex: dex_type[] = [
  {
    img: '/icons/swap/bsw.svg',
    label: 'Biswap',
    value: 'Biswap',
  },
  {
    img: '/icons/swap/pancakeswap.svg',
    label: 'Pancakeswap',
    value: 'Pancakeswap',
  },
  {
    img: '/icons/swap/mdex.svg',
    label: 'MDEX',
    value: 'MDEX',
  },
];

const arrTokens: token_type[] = [
  {
    label: 'ALPACA',
    value: 'alpaca',
  },
  {
    label: 'CAKE',
    value: 'cake',
  },
  {
    label: 'BNB',
    value: 'bnb',
  },
  {
    label: 'BUSD',
    value: 'busd',
  },
  {
    label: 'USDT',
    value: 'usdt',
  },
  {
    label: 'USDC',
    value: 'usdc',
  },
  {
    label: 'TUSD',
    value: 'tusd',
  },
  {
    label: 'BTCB',
    value: 'btc',
  },
  {
    label: 'ETH',
    value: 'eth',
  },
];

export default function Farm() {
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [dexList, setDexList] = useState('Biswap');
  const [pairedAssets, setPairedAssets] = useState('alpaca');

  return (
    <Container
      sx={{
        pb: 0,
        flexGrow: 0,
        width: '100%',
        fontFamily: 'Gilroy, Arial !important',
        fontStyle: 'normal',
        paddingTop: '33px',
      }}
    >
      <Paper
        sx={{
          bgcolor: 'background.header',
          padding: '24px',
          mt: { xs: '8px', md: '12px' },
          color: '#F1F1F3',
          ...borderGradient,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: { xs: 'flex-start', sm: 'space-between' },
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: 500, fontSize: '20px', color: '#080F26' }}>
                Active Pools
              </Typography>
            </Box>
            <Box>
              <InputGroup>
                <Input placeholder="Search token" />
                <InputGroup.Button>
                  <SearchIcon />
                </InputGroup.Button>
              </InputGroup>
            </Box>
          </Box>
          {downToXSM && (
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
                  DEX
                </label>
                <SelectPicker
                  data={arrDex}
                  style={{ width: '100%' }}
                  value={dexList}
                  onChange={setDexList}
                  placeholder="DEX"
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
                          {' '}
                          <img src={item.img} />
                        </Box>
                        <Box>
                          {' '}
                          <span style={{ fontWeight: 400, fontSize: '12px', color: '#5B6871' }}>
                            {item.label}
                          </span>
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
                          gap: 2,
                          alignItems: 'center',
                        }}
                      >
                        <Box>
                          {' '}
                          <img src={item.img} />
                        </Box>
                        <Box>
                          {' '}
                          <span style={{ fontWeight: 400, fontSize: '12px', color: '#5B6871' }}>
                            {item.value}
                          </span>
                        </Box>
                      </Box>
                    );
                  }}
                />
              </Box>
              <Box>
                {' '}
                <label
                  style={{
                    display: 'block',
                    color: '#252C32',
                    fontWeight: 400,
                    fontSize: '14px',
                    paddingBottom: '5px',
                  }}
                >
                  Paired assets
                </label>
                <SelectPicker
                  data={arrTokens}
                  style={{ width: '100%' }}
                  value={pairedAssets}
                  onChange={setPairedAssets}
                  placeholder="Assets"
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
                          {' '}
                          <TokenIcon symbol={item.value} sx={{ fontSize: '24px', mr: 1 }} />
                        </Box>
                        <Box>
                          {' '}
                          <span style={{ fontWeight: 400, fontSize: '12px', color: '#5B6871' }}>
                            {label.toUpperCase()}
                          </span>
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
                          gap: 2,
                          alignItems: 'center',
                        }}
                      >
                        <Box>
                          {' '}
                          <TokenIcon symbol={value} sx={{ fontSize: '24px', mr: 1 }} />
                        </Box>
                        <Box>
                          {' '}
                          <span style={{ fontWeight: 400, fontSize: '12px', color: '#5B6871' }}>
                            {value.toUpperCase()}
                          </span>
                        </Box>
                      </Box>
                    );
                  }}
                />
              </Box>
            </Box>
          )}
          {!downToXSM && (
            <>
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
                  DEX:
                </label>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px', flexWrap: 'wrap' }}>
                  <Box>
                    <Button
                      sx={{
                        backgroundColor: '#074592',
                        color: '#FFF',
                        fontWeight: 700,
                        fontSize: '12px',
                      }}
                      variant="contained"
                    >
                      All
                    </Button>
                  </Box>
                  {arrDex &&
                    arrDex.map((dex, idx) => (
                      <Box key={idx}>
                        <Button
                          sx={{
                            backgroundColor: '#F6F8F9',
                            color: '#000',
                            fontWeight: 700,
                            fontSize: '12px',
                            width: '144px',
                          }}
                          variant="outlined"
                          startIcon={<img src={dex.img} />}
                        >
                          {dex.label}
                        </Button>
                      </Box>
                    ))}
                </Box>
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
                  Paired assets:
                </label>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '4px', flexWrap: 'wrap' }}>
                  <Box>
                    <Button
                      sx={{
                        backgroundColor: '#074592',
                        color: '#FFF',
                        fontWeight: 700,
                        fontSize: '12px',
                      }}
                      variant="contained"
                    >
                      All
                    </Button>
                  </Box>
                  {arrTokens &&
                    arrTokens.map((token, idx) => (
                      <Box key={idx}>
                        <Button
                          sx={{
                            backgroundColor: '#F6F8F9',
                            color: '#000',
                            fontWeight: 700,
                            fontSize: '12px',
                            width: '94px',
                          }}
                          variant="outlined"
                          startIcon={
                            <TokenIcon symbol={token.value} sx={{ fontSize: '24px', mr: 1 }} />
                          }
                        >
                          {token.label}
                        </Button>
                      </Box>
                    ))}
                </Box>
              </Box>
            </>
          )}

          <Box>{!downToXSM ? <RewardTable /> : <RewardMobileList />}</Box>
        </Box>
      </Paper>
    </Container>
  );
}

Farm.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
