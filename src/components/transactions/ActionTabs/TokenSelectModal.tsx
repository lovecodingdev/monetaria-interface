import React, { useState } from 'react';
import {
  ComputedReserveData,
  useAppDataContext,
} from 'src/hooks/app-data-provider/useAppDataProvider';
import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';

import { BasicModal } from '../../primitives/BasicModal';
import { TokenIcon } from 'src/components/primitives/TokenIcon';
import { MenuItem, ListItemText, Box, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const TokenSelectModal = ({
  onSelect,
}: {
  onSelect: (reserve: ComputedReserveData) => void;
}) => {
  const { type, close } = useModalContext();
  const { reserves } = useAppDataContext();
  const [search, setSearch] = useState('');

  const onSearch = (search: string) => {
    setSearch(search.toLowerCase());
  };

  return (
    <BasicModal open={type === ModalType.SelectToken} setOpen={close} withCloseButton={false}>
      <Box
        component="form"
        sx={{
          p: '2px',
          display: 'flex',
          alignItems: 'center',
          background: '#F6F8F9',
          height: '32px',
          borderRadius: '8px',
          border: '1px solid #EEF0F2',
          mb: 8,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => onSearch(e.target.value)}
        />
        <IconButton type="button" aria-label="search">
          <SearchIcon />
        </IconButton>
      </Box>
      {reserves
        .filter((r) => r.symbol.toLowerCase().includes(search))
        .map((r) => (
          <MenuItem
            key={r.symbol}
            value={r.symbol}
            data-cy={`assetsSelectOption_${r.symbol.toUpperCase()}`}
            onClick={() => onSelect(r)}
          >
            <TokenIcon symbol={r.iconSymbol || r.symbol} sx={{ fontSize: '22px', mr: 2 }} />
            <Box sx={{ display: 'flex' }}>
              <ListItemText sx={{ mr: 6, minWidth: 48 }}>{r.symbol}</ListItemText>
              <ListItemText sx={{ mr: 6, color: '#84919A' }}>{r.name}</ListItemText>
            </Box>
          </MenuItem>
        ))}
    </BasicModal>
  );
};
