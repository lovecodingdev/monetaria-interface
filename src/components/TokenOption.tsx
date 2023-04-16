import { Box } from '@mui/material';
import { ItemDataType } from 'src/helpers/rsuite-types';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { textCenterEllipsis } from 'src/helpers/text-center-ellipsis';

export interface TokenOptionProps {
  item: ItemDataType;
};

export const TokenOption = ({ item }: TokenOptionProps) => {
  const _item = item as ItemDataType;
  const _label = _item.label as string;
  const _value = _item.value as string;
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
        <TokenIcon symbol={_label} sx={{ fontSize: '24px', mr: 1 }} />{' '}
      </Box>
      <Box>
        {' '}
        <span
          style={{
            fontWeight: 500,
            fontSize: '18px',
            color: '#5B6871',
          }}
        >
          {_label.toUpperCase()} ({textCenterEllipsis(_value, 5, 4)})
        </span>
      </Box>
    </Box>
  );
};
