import { Trans } from '@lingui/macro';
import { useState } from 'react';
import { Button, Typography, Box, Paper, Container } from '@mui/material';
import borderGradient from "src/layouts/borderGradient";
import { PageTitle, PageTitleProps } from 'src/components/TopInfoPanel/PageTitle';
import ReferralList from './ReferralList'

export const ReferralTopPanel = () => {
  const [referralLink, setReferralLink] = useState('https://monetaria.io/8239481');
  return (
    <Container 
      sx={{ 
        pb: 0, 
        flexGrow: 0, 
        display: 'flex', 
        flexDirection: 'row',
        gap: 4,
      }}
    >
      <Paper
        sx={{
          flex: 1,
          bgcolor: 'background.header',
          py: { xs: 9, md: 10, lg: '20px', xl: '20px', xxl: '20px' },
          mt: '24px',
          color: '#F1F1F3',
          ...borderGradient
        }}
      >
        <Box sx={{
          px: { xs: 4, xsm: 6 },
          display: 'flex',
          flexDirection: 'column', 
          justifyContent: 'space-between',
        }}>
          <PageTitle
            pageTitle={<Trans>Referral Program</Trans>}
          />
          <Typography variant="secondary16" 
            sx={{
              color: 'text.primary',
            }}
          >
            Invite Your Friends. Earn Cryptocurrency Together.
          </Typography>
          <Box
            sx={{
              flex: 1,
              mt: '12px',
              padding: '12px',
              color: '#F1F1F3',
              borderRadius: '8px',
              border: '1px solid #D5DADD'
            }}
          >
            <Typography variant="secondary16" 
              sx={{
                color: 'text.primary',
              }}
            >
              Referral Link
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mt: '12px',
                padding: '12px',
                color: '#F1F1F3',
                borderRadius: '8px',
                background: '#EEF0F2',
              }}
            >
              <Typography variant="secondary16" 
                sx={{
                  color: 'text.primary',
                }}
              >
                {referralLink}
              </Typography>
              <Button onClick={() => navigator.clipboard.writeText(referralLink)}>Copy</Button>
            </Box>
          </Box>
        </Box>
      </Paper >
      <Box
        sx={{
          flex: 1,
          mt: '24px',
          color: '#F1F1F3',
        }}
      >
        <ReferralList/>
      </Box>
    </Container>
  );
};
