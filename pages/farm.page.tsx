import { Box, Container, Paper, Typography, useMediaQuery, useTheme, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { MainLayout } from '../src/layouts/MainLayout';
import borderGradient from 'src/layouts/borderGradient';
import { InputNumber, Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import 'rsuite/dist/rsuite.min.css';

import BISWAP from '/public/icons/swap/bsw.svg';
import PANCAKESWAP from '/public/icons/swap/pancakeswap.svg';
import MDEX from '/public/icons/swap/mdex.svg';

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
              <Box>
                <Button
                  sx={{
                    backgroundColor: '#F6F8F9',
                    color: '#000',
                    fontWeight: 700,
                    fontSize: '12px',
                    width: '144px',
                  }}
                  startIcon={<BISWAP />}
                  variant="outlined"
                >
                  Biswap
                </Button>
              </Box>
              <Box>
                {' '}
                <Button
                  sx={{
                    backgroundColor: '#F6F8F9',
                    color: '#000',
                    fontWeight: 700,
                    fontSize: '12px',
                    width: '144px',
                  }}
                  startIcon={<PANCAKESWAP />}
                  variant="outlined"
                >
                  PancakeSwap
                </Button>
              </Box>
              <Box>
                {' '}
                <Button
                  sx={{
                    backgroundColor: '#F6F8F9',
                    color: '#000',
                    fontWeight: 700,
                    fontSize: '12px',
                    width: '144px',
                  }}
                  startIcon={<MDEX />}
                  variant="outlined"
                >
                  MDEX
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

Farm.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
