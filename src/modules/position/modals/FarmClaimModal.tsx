import React from 'react';
import { Box, Typography, Button, Tabs, Tab } from '@mui/material';
import { BasicModal } from 'src/components/primitives/BasicModal';
import { styled } from '@mui/system';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { useEffect, useState } from 'react';

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

const rewardsData = [
  {
    symbol: 'eth',
    earned: 4.5,
  },
  {
    symbol: 'mnt',
    earned: 5.45,
  },
  {
    symbol: 'bnb',
    earned: 13.567,
  },
  {
    symbol: 'eth',
    earned: 13.567,
  },
  {
    symbol: 'bnb',
    earned: 13.567,
  },
];

const poolRewardsData = [
  {
    symbol: 'eth',
    campaignContent: 'pSTAKE rewards for LYF positions (11 Aug - 6 Oct):',
    earned: 4.57,
  },
  {
    symbol: 'mnt',
    campaignContent:
      'After the community voting of AIP-1, all unclaimed ITAM rewards were converted into ALPACA. Users will have until 15 March 2023 to claim their rewards. Any remaining unclaimed ALPACA will be burned.',
    earned: 13.75,
  },
  {
    symbol: 'bnb',
    campaignContent:
      'After the community voting of AIP-1, all unclaimed ITAM rewards were converted into ALPACA. Users will have until 15 March 2023 to claim their rewards. Any remaining unclaimed ALPACA will be burned.',
    earned: 3.54,
  },
];

interface FarmClaimModalProps {
  isOpenClaimModal: boolean;
  setOpen: (value: boolean) => void;
}

export const FarmClaimModal = ({ isOpenClaimModal, setOpen }: FarmClaimModalProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleSelectedTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <BasicModal
      open={isOpenClaimModal}
      setOpen={setOpen}
      withCloseButton={true}
      contentMaxWidth={731}
    >
      <Typography sx={{ color: '#080F26', fontWeight: 500, fontSize: '20px' }}>
        Available Leveraged Yield Farming Rewards
      </Typography>
      {/** Tab for Overview and Simulator */}
      <Box sx={{ flex: 1 }}>
        <NewTabs
          value={selectedTab}
          onChange={handleSelectedTabChange}
          sx={{
            my: 4,
          }}
        >
          <NewTab label="Rewards" />
          <NewTab label="Featured Pool Rewards" />
        </NewTabs>

        {selectedTab == 0 &&
          rewardsData.map((row) => (
            <Box
              sx={{
                px: 8,
                py: '12px',
                display: 'flex',
                flexDirection: 'row',
                border: '1px solid #F6F8F9',
                mb: 2,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                  gap: '6px',
                }}
              >
                <TokenIcon symbol={row.symbol} sx={{ fontSize: `32px`, mr: 2 }} />
                <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#252C32' }}>
                  SHB Pairs
                </Typography>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#252C32' }}>
                  Earned
                </Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#252C32' }}>
                  {row.earned}
                </Typography>
              </Box>
              <Box>
                <Button
                  sx={{ backgroundColor: '#074592', fontWeight: 600, fontSize: '16px' }}
                  variant="contained"
                >
                  Claim
                </Button>
              </Box>
            </Box>
          ))}

        {selectedTab == 1 &&
          poolRewardsData.map((row) => (
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <TokenIcon symbol={row.symbol} sx={{ fontSize: `32px`, mr: 4 }} />
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  border: '1px solid #F6F8F9',
                  mb: 2,
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    flex: 2,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '6px',
                  }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#252C32' }}>
                      Compaigns Completed
                    </Typography>
                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#252C32', pr: 2 }}>
                      {row.campaignContent}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#252C32' }}>
                    Your rewards (pSTAKE)
                  </Typography>
                  <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#252C32' }}>
                    {row.earned}
                  </Typography>
                </Box>
                <Box>
                  <Button
                    sx={{ backgroundColor: '#074592', fontWeight: 600, fontSize: '16px' }}
                    variant="contained"
                  >
                    Claim
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
      </Box>
    </BasicModal>
  );
};
