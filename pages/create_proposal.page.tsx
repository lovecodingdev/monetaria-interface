import {
  Box,
  Container,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
  Button,
  MenuItem,
} from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useEffect, useState } from 'react';
import { MainLayout } from '../src/layouts/MainLayout';
import borderGradient from 'src/layouts/borderGradient';
import { SelectPicker, InputNumber } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

export default function CreateProposal() {
  const { breakpoints } = useTheme();
  const xsm = useMediaQuery(breakpoints.up('xsm'));
  const downToXSM = useMediaQuery(breakpoints.down('xsm'));

  return (
    <Container
      sx={{
        pb: 0,
        flexGrow: 0,
        width: { xs: '100%', sm: '700px' },
        fontFamily: 'Gilroy, Arial !important',
        fontStyle: 'normal',
      }}
    >
      <Paper
        sx={{
          bgcolor: 'background.header',
          padding: '24px',
          mt: { xs: '8px', md: '12px' },
          color: '#F1F1F3',
          ...borderGradient,
          mb: { xs: '8px', md: '12px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {' '}
          <IconButton
            sx={{
              backgroundColor: 'white',
              borderRadius: '8px',
              color: '#252C32',
              border: 'none',
              position: 'absolute',
              left: '10px',
            }}
            href="/vote"
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography
            sx={{
              color: '#080F26',
              fontSize: '20px',
              fontWeight: 500,
            }}
          >
            Create Proposal
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: { xs: '22px 15.5px', sm: '22px 51px' },
          }}
        >
          <Box>
            <label
              style={{
                display: 'block',
                color: '#252C32',
                fontWeight: 500,
                fontSize: '14px',
                paddingBottom: '5px',
              }}
            >
              Category
            </label>
            <select
              placeholder="Select"
              style={{
                width: '100%',
                height: '56px',
                color: '#000',
                fontSize: '20px',
                fontWeight: 500,
                padding: '0 30px 0 20px',
                backgroundColor: '#EEF0F2',
                borderRadius: '16px',
                border: 'none',
                appearance: 'none',
                backgroundImage: `url(
                  "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"
                )`,
                backgroundRepeat: ' no-repeat',
                backgroundPosition: 'right 1rem center',
                backgroundSize: '1em',
              }}
            >
              <option value={1} className="custom-option">
                Select
              </option>
              <option value={2} className="custom-option">
                2
              </option>
              <option value={3} className="custom-option">
                3
              </option>
            </select>
          </Box>
          <Box>
            <label
              style={{
                display: 'block',
                color: '#252C32',
                fontWeight: 500,
                fontSize: '14px',
                paddingBottom: '5px',
              }}
            >
              Title
            </label>
            <input
              type="text"
              style={{
                width: '100%',
                backgroundColor: '#EEF0F2',
                borderRadius: '16px',
                border: 'none',
                outline: 'none',
                height: '56px',
                color: '#000',
                fontSize: '20px',
                fontWeight: 500,
                padding: '0 20px 0 20px',
              }}
              placeholder="Title of the proposal"
            />
          </Box>
          <Box>
            <label
              style={{
                display: 'block',
                color: '#252C32',
                fontWeight: 500,
                fontSize: '14px',
                paddingBottom: '5px',
              }}
            >
              Proposal
            </label>
            <textarea
              placeholder="Proposal"
              style={{
                width: '100%',
                backgroundColor: '#EEF0F2',
                borderRadius: '16px',
                border: 'none',
                outline: 'none',
                height: '200px',
                color: '#000',
                fontSize: '20px',
                fontWeight: 500,
                padding: '17px 20px 17px 20px',
              }}
            ></textarea>
          </Box>
          <Button
            sx={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundImage: 'linear-gradient(#A439FF, #9582FF)',
              height: '40px',
              color: '#F6F8F9',
              fontWeight: 600,
              fontSize: '14px',
            }}
            fullWidth
          >
            Submit a proposal
          </Button>
          <Typography sx={{ color: '#5B6871', fontSize: '14px', fontWeight: 400 }}>
            Tip: Select an action and describe your proposal for the community. The proposal cannot
            be modified after submission, so please verify all information before submitting. The
            voting period will begin immediately and last for 7 days. To propose a custom action,
            read the docs.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

CreateProposal.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
