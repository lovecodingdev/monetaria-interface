import { useState, useEffect } from 'react';
import { API_ETH_MOCK_ADDRESS } from '@monetaria/contract-helpers';
import { useProtocolDataContext } from '../../hooks/useProtocolDataContext';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
// import { useMediaQuery } from '@mui/material';
import { fetchIconSymbolAndName } from 'src/ui-config/reservePatches';

import { CauroselItem } from 'src/modules/markets/CauroselItem';
import { Box, Button, Typography, IconButton, SvgIcon } from '@mui/material';
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, FreeMode, Pagination, Navigation } from 'swiper';

export default function MarketsCaurosel() {
  const swiper = useSwiper();

  const { reserves, loading } = useAppDataContext();
  const { currentNetworkConfig } = useProtocolDataContext();

  const filteredData = reserves
    .filter((res) => res.isActive && !res.isFrozen)
    .map((reserve) => ({
      ...reserve,
      ...(reserve.isWrappedBaseAsset
        ? fetchIconSymbolAndName({
            symbol: currentNetworkConfig.baseAssetSymbol,
            underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
          })
        : {}),
    }));
  const breakpoint = {
    375: {
      slidesPerView: 2,
    },
    414: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 3,
    },
    900: {
      slidesPerView: 4,
    },
    960: {
      slidesPerView: 3,
    },
    1080: {
      slidesPerView: 4,
    },
    1300: {
      slidesPerView: 5,
    },
    1500: {
      slidesPerView: 6,
    },
    1700: {
      slidesPerView: 6,
    },
    //   slidesPerView: 7,
    // },
    //   slidesPerView: 8,
    // },
  };

  return (
    <Box
      sx={{
        marginBottom: { xs: '16px', md: '24px' },
        padding: '16px',
        background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.87) 100%)',
        borderRadius: '16px',
        border: '1px solid #E5E9EB',
      }}
    >
      <Box>
        <Typography variant="h3" gutterBottom component="div" style={{ width: '120px' }}>
          Top Movers
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* <IconButton size="small" onClick={() => swiper.slideNext()}>
          <SvgIcon sx={{ fontSize: '16px' }}>
            <ChevronLeftIcon />
          </SvgIcon>
        </IconButton> */}
        <Swiper
          navigation
          breakpoints={breakpoint}
          spaceBetween={16}
          loop={true}
          modules={[Navigation, Autoplay]}
          // freeMode={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          style={{
            width: '100%',
          }}
        >
          {filteredData?.map((item, index) => {
            console.log('item', item);
            return (
              <SwiperSlide key={'C' + index}>
                <CauroselItem {...item} />
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* <IconButton size="small" onClick={() => swiper.slideNext()}>
          <SvgIcon sx={{ fontSize: '16px' }}>
            <ChevronRightIcon />
          </SvgIcon>
        </IconButton> */}
      </Box>
    </Box>
  );
}
