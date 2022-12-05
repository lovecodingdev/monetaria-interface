import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { MainLayout } from '../src/layouts/MainLayout';
import ErrorImg from 'public/404_white.svg';

export default function Custom404() {
  const { breakpoints } = useTheme();
  const lg = useMediaQuery(breakpoints.up('lg'));
  const xsm = useMediaQuery(breakpoints.down('xsm'));
  const md = useMediaQuery(breakpoints.down('md'));

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            width: { xs: '80%', md: '60%', lg: '50%' },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: { xs: 0, md: '25px' } }}>
            <ErrorImg />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              color: '#28464D',
              fontSize: { xs: '24px', md: '32px', lg: '42px' },
              fontWeight: 800,
              padding: '15px',
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            Oops, We can seem to find
            <br />
            the page what you are looking for.
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              color: '#436972',
              fontSize: { xs: '14px', md: '18px' },
              fontWeight: 500,
              padding: '15px',
              lineHeight: '28px',
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            The page you are looking for might have been removed, had its name changed, or is
            temporarily unavailable.
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
              padding: '15px',
            }}
          >
            <Button
              sx={{
                padding: '12px',
                height: '50px',
                backgroundColor: '#074592',
                color: 'white',
                borderRadius: '8px',
                '&:hover': {
                  border: '1px solid #074592',
                  color: '#074592',
                },
              }}
              href="/"
            >
              Go to HomePage
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

Custom404.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
