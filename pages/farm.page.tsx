import {
  Box,
  Container,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Tab,
  Tabs,
} from '@mui/material';
import { styled } from '@mui/system';
import { useEffect, useState } from 'react';
import { MainLayout } from '../src/layouts/MainLayout';
import borderGradient from 'src/layouts/borderGradient';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { Input, InputGroup, SelectPicker } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import 'rsuite/dist/rsuite.min.css';
import { RewardTable } from 'src/modules/dashboard/lists/ActivePoolList/RewardTable';
import { RewardMobileList } from 'src/modules/dashboard/lists/ActivePoolList/RewardMobileList';
import { BasicModal } from 'src/components/primitives/BasicModal';

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
});

const NewTab = styled(Tab)`
  margin: 0px;
  fontweight: 600;
  fontfamily: Gilroy, Arial !important;
  fontstyle: normal !important;
  min-height: 24px;
  border-radius: 6px;
  height: 24px;
  width: 30%;
  color: #b0babf;
  &.Mui-selected,
  &:hover {
    background: #eef0f2;
    border-radius: 6px;
    color: #000000;
    font-weight: bold;
  }
`;

interface dex_type {
  img: string;
  label: string;
  value: string;
}

interface token_type {
  label: string;
  value: string;
}

interface price_btn_type {
  title: string;
  isClicked: boolean;
  value: number;
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

const priceBtns: price_btn_type[] = [
  {
    title: '1d',
    isClicked: true,
    value: 1,
  },
  {
    title: '7d',
    isClicked: false,
    value: 7,
  },
  {
    title: '14d',
    isClicked: false,
    value: 14,
  },
  {
    title: '30d',
    isClicked: false,
    value: 30,
  },
];

export default function Farm() {
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));
  const [dexList, setDexList] = useState('Biswap');
  const [pairedAssets, setPairedAssets] = useState('alpaca');
  const [openModal, setOpenModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [priceBtnSet, setPriceBtnSet] = useState(priceBtns);
  const [currentPeriod, setCurrentPeriod] = useState(1);

  const showModal = (_type: boolean) => {
    setOpenModal(_type);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const setPeriod = (_period: number) => {
    const tempArr = priceBtnSet;

    tempArr.forEach((arr) => {
      if (arr.value == _period) {
        arr.isClicked = true;
      } else {
        arr.isClicked = false;
      }
    });
    setPriceBtnSet([...tempArr]);
    setCurrentPeriod(_period);
  };

  const farmPage = (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: { xs: 'flex-start', sm: 'space-between' },
          gap: '8px',
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: 1 }}>
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
                      <img src={item.img} width={24} />
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
          <Box sx={{ flex: 1 }}>
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
                      <TokenIcon symbol={item.value} sx={{ fontSize: '21px', mr: 1 }} />
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

      <Box>
        {!downToXSM ? (
          <RewardTable showModal={showModal} />
        ) : (
          <RewardMobileList showModal={showModal} />
        )}
      </Box>
    </Box>
  );
  
  return (
    <Container
      sx={{
        pb: 0,
        flexGrow: 0,
        width: '100%',
        fontFamily: 'Gilroy, Arial !important',
        fontStyle: 'normal',
        paddingTop: '24px',
        bgcolor: { xs: 'white', xsm: '#ffffff00' },
      }}
    >
      <BasicModal
        open={openModal}
        setOpen={setOpenModal}
        withCloseButton={true}
        contentMaxWidth={downToXSM ? 343 : 731}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            {' '}
            <Typography sx={{ color: '#080F26', fontSize: '20px', fontWeight: 500 }}>
              MNT - Historical Price
            </Typography>
          </Box>
          <Box
            sx={{
              mr: downToXSM ? '0px' : '40px',
              display: 'flex',
              mt: { xs: '10px', sm: '0' },
              width: downToXSM ? '100%' : 'auto',
              justifyContent: 'center',
            }}
          >
            <NewTabs
              value={selectedTab}
              onChange={handleChange}
              sx={{
                mb: 2,
              }}
            >
              <NewTab
                label="TVL"
                sx={{
                  fontSize: { xs: '14px', md: '14px' },
                  fontFamily: 'Gilroy,Arial !important',
                  fontStyle: 'normal',
                }}
              />
              <NewTab
                label="Price"
                sx={{
                  fontSize: { xs: '14px', md: '14px' },
                  fontFamily: 'Gilroy,Arial !important',
                  fontStyle: 'normal',
                }}
              />
              <NewTab
                label="APY"
                sx={{
                  fontSize: { xs: '14px', md: '14px' },
                  fontFamily: 'Gilroy,Arial !important',
                  fontStyle: 'normal',
                }}
              />
            </NewTabs>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '8px',
            width: downToXSM ? '100%' : 'auto',
            justifyContent: downToXSM ? 'center' : 'flex-start',
            marginTop: '18px',
          }}
        >
          {priceBtnSet &&
            priceBtnSet.map((btn) => (
              <Button
                sx={{
                  backgroundColor: btn.isClicked ? '#074592' : '#F6F8F9',
                  color: btn.isClicked ? '#FFFFFF' : '#000000',
                  fontWeight: 400,
                  fontSize: '12px',
                }}
                key={btn.value}
                onClick={() => setPeriod(btn.value)}
              >
                {btn.title}
              </Button>
            ))}
        </Box>
        <Box></Box>
      </BasicModal>
      {downToXSM ? (
        <Box>{farmPage}</Box>
      ) : (
        <Paper
          sx={{
            bgcolor: 'background.header',
            padding: '24px',
            mt: { xs: '8px', md: '12px' },
            color: '#F1F1F3',
            ...borderGradient,
          }}
        >
          {farmPage}
        </Paper>
      )}
    </Container>
  );
}

Farm.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
