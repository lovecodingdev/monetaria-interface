import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { DateRangePicker, SelectPicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

const actionData = ['All', 'Bryan', 'Linda', 'Nancy', 'Lloyd', 'Alice', 'Julia', 'Albert'].map(
  (item) => ({ label: item, value: item })
);

interface Props {
  assets: string[];
  onChangeDateRange: (startDate: Date, endDate: Date) => void;
  onChangeAsset: (asset: string) => void;
}

function TransactionListHeader({ assets, onChangeDateRange, onChangeAsset }: Props) {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));
  const [curAction, setCurAction] = useState('All');
  const [curAssets, setCurAssets] = useState('All');

  console.log({assets});

  const _assets = ["All", ...assets];
  const assetData = _assets.map(
    (item) => ({ label: item, value: item })
  );

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
          onChange={(dateRange)=>{
            if(dateRange){
              onChangeDateRange(dateRange[0], dateRange[1]);
            }
          }}
        />
      </Box>
      {/* <Box>
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
      </Box> */}
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
          onChange={val=>{
            setCurAssets(val!);
            onChangeAsset(val!);
          }}
          searchable={false}
          cleanable={false}
        />
      </Box>
    </Box>
  );
}

export default TransactionListHeader;
