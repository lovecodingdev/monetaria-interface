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
import { SelectPicker, InputNumber, ButtonToolbar, ButtonGroup } from 'rsuite';
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

export default function FarmDetail() {
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
              padding: { xs: '24px 8px', sm: '24px' },
              mt: { xs: '8px', md: '12px' },
              color: '#F1F1F3',
              ...borderGradient,
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}> </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

FarmDetail.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
