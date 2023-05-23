import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { DateRangePicker, SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const actionData = ['All', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  (item) => ({ label: item, value: item })
);

const assetData = ['All', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  (item) => ({ label: item, value: item })
);

function TransactionListHeader() {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  const [curAction, setCurAction] = useState('All');
  const [curAssets, setCurAssets] = useState('All');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '24px',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        paddingBottom: '20px',
        justifyContent: { xs: 'center', sm: 'flex-start' },
      }}
    >
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
          Range
        </label>
        <DateRangePicker
          placeholder="Start date - End date"
          style={{
            width: downToXSM ? '305px' : '280px',
          }}
          showOneCalendar={downToXSM}
        />
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
          Action
        </label>
        <SelectPicker
          data={actionData}
          style={{ width: downToXSM ? '140px' : '169px' }}
          value={curAction}
          searchable={false}
          onChange={val => setCurAction(val!)}
        />
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
          Asset
        </label>
        <SelectPicker
          data={assetData}
          style={{ width: downToXSM ? '140px' : '169px' }}
          value={curAssets}
          onChange={val=>setCurAssets(val!)}
          searchable={false}
        />
      </Box>
    </Box>
  );
}

export default TransactionListHeader;
