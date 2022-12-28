import { Box, Container, Paper, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { MainLayout } from '../src/layouts/MainLayout';
import borderGradient from 'src/layouts/borderGradient';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import 'rsuite/dist/rsuite.min.css';
import { RewardTable } from 'src/modules/dashboard/lists/ActivePoolList/RewardTable';
import { RewardMobileList } from 'src/modules/dashboard/lists/ActivePoolList/RewardMobileList';

interface dex_type {
  img: string;
  title: string;
}

interface token_type {
  name: string;
  symbol: string;
}

const arrDex: dex_type[] = [
  {
    img: '/icons/swap/bsw.svg',
    title: 'Biswap',
  },
  {
    img: '/icons/swap/pancakeswap.svg',
    title: 'Pancakeswap',
  },
  {
    img: '/icons/swap/mdex.svg',
    title: 'MDEX',
  },
];

const arrTokens: token_type[] = [
  {
    name: 'ALPACA',
    symbol: 'alpaca',
  },
  {
    name: 'CAKE',
    symbol: 'cake',
  },
  {
    name: 'BNB',
    symbol: 'bnb',
  },
  {
    name: 'BUSD',
    symbol: 'busd',
  },
  {
    name: 'USDT',
    symbol: 'usdt',
  },
  {
    name: 'USDC',
    symbol: 'usdc',
  },
  {
    name: 'TUSD',
    symbol: 'tusd',
  },
  {
    name: 'BTCB',
    symbol: 'btc',
  },
  {
    name: 'ETH',
    symbol: 'eth',
  },
];

export default function Farm() {
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));

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
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
                      {dex.title}
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
                        <TokenIcon symbol={token.symbol} sx={{ fontSize: '24px', mr: 1 }} />
                      }
                    >
                      {token.name}
                    </Button>
                  </Box>
                ))}
            </Box>
          </Box>
          <Box>{!downToXSM ? <RewardTable /> : <RewardMobileList />}</Box>
        </Box>
      </Paper>
    </Container>
  );
}

Farm.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
