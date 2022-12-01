import React from 'react';
import { Box, Button, Typography } from '@mui/material';

function HeaderDashboard() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: '40px',
        fontFamily: 'Gilroy,Arial !important',
        padding: { xs: '20px 0px', sm: '20px' },
        alignItems: { xs: 'center', sm: 'start' },
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: '40px',
          alignItems: 'center',
          flexWrap: { xs: 'nowrap', sm: 'wrap' },
          width: { xs: '300px', sm: 'auto' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignSelf: 'start' }}>
          <Box
            sx={{ color: '#080F26 !important', fontSize: '14px', fontWeight: 400, opacity: 0.4 }}
          >
            Total Balances
          </Box>
          <Box sx={{ color: '#080F26 !important', fontWeight: 500, fontSize: '20px' }}>
            $ 56,560.02
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'column' },
            justifyContent: { xs: 'space-between' },
            paddingRight: { xs: '0px', sm: '40px' },
            borderRight: { xs: 'none', sm: '1px solid #E5E9EB' },
            alignSelf: 'stretch',
          }}
        >
          <Box
            sx={{ color: '#080F26 !important', fontSize: '14px', fontWeight: 400, opacity: 0.4 }}
          >
            Total veCRV
          </Box>
          <Box sx={{ color: '#080F26 !important', fontWeight: 500, fontSize: '16px' }}>
            veCRV-0
            <br />
            Locked for 0 days
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'column' },
            alignSelf: 'stretch',
            justifyContent: { xs: 'space-between' },
          }}
        >
          <Box sx={{ color: '#080F26 !important' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 400, opacity: 0.4 }}>
              Rewards
            </Typography>
            <Typography sx={{ fontWeight: 500, fontSize: '16px' }}>0.003 crv</Typography>
          </Box>
          <Box>
            <Button
              variant="outlined"
              size="small"
              sx={{
                color: '#074592',
                fontSize: '14px',
                fontWeight: 600,
                backgroundColor: 'rgba(21, 126, 255, 0.05)',
                border: '1px solid rgba(21, 126, 255, 0.2)',
                borderRadius: '8px',
              }}
            >
              Claim
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: '8px 16px',
          border: '1px solid #EBF7FF',
          borderRadius: '8px',
          width: '308px',
          color: '#59729D',
        }}
      >
        <Box sx={{ fontWeight: 500, fontSize: '14px' }}>Total Daily profits</Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ fontWeight: 400, fontSize: '12px' }}>Base</Box>
          <Box sx={{ fontWeight: 600, fontSize: '14px' }}>0</Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Box sx={{ fontWeight: 400, fontSize: '12px' }}>CRV</Box>
          <Box sx={{ fontWeight: 600, fontSize: '14px' }}>0</Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Box sx={{ fontWeight: 400, fontSize: '12px' }}>USD Total</Box>
          <Box sx={{ fontWeight: 600, fontSize: '14px' }}>0</Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: '8px 16px',
          border: '1px solid #EBF7FF',
          borderRadius: '8px',
          width: '308px',
          color: '#59729D',
        }}
      >
        <Box sx={{ fontWeight: 500, fontSize: '14px' }}>Claimable Tokens</Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Box sx={{ fontWeight: 400, fontSize: '12px' }}>CRV</Box>
          <Box sx={{ fontWeight: 600, fontSize: '14px' }}>0</Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Box sx={{ fontWeight: 400, fontSize: '12px' }}>USD Total</Box>
          <Box sx={{ fontWeight: 600, fontSize: '14px' }}>0</Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HeaderDashboard;
