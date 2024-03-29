import { ChevronDownIcon } from '@heroicons/react/solid';
import { Trans } from '@lingui/macro';
import { ChevronRight } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  InputBase,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  ButtonBase,
} from '@mui/material';
import React, { ReactNode } from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';
import { useModalContext } from 'src/hooks/useModal';

import { CapType } from '../caps/helper';
import { AvailableTooltip } from '../infoTooltips/AvailableTooltip';
import { FormattedNumber } from '../primitives/FormattedNumber';
import { TokenIcon } from '../primitives/TokenIcon';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  value: string;
}

const NumberFormatCustom = React.forwardRef<NumberFormatProps, CustomProps>(
  function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          if (values.value !== props.value)
            onChange({
              target: {
                name: props.name,
                value: values.value || '',
              },
            });
        }}
        thousandSeparator
        isNumericString
        allowNegative={false}
      />
    );
  }
);

export interface Asset {
  balance?: string;
  symbol: string;
  iconSymbol?: string;
  address?: string;
  mToken?: boolean;
  priceInUsd?: string;
  decimals?: number;
}

export interface AssetInputProps<T extends Asset = Asset> {
  value: string;
  usdValue: string;
  symbol: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  disableInput?: boolean;
  onSelect?: (asset: T) => void;
  assets: T[];
  capType?: CapType;
  maxValue?: string;
  isMaxSelected?: boolean;
  inputTitle?: ReactNode;
}

export const AssetInput = <T extends Asset = Asset>({
  value,
  usdValue,
  symbol,
  onChange,
  disabled,
  disableInput,
  onSelect,
  assets,
  capType,
  maxValue,
  inputTitle,
  isMaxSelected,
}: AssetInputProps<T>) => {
  // const { openSelectToken } = useModalContext();

  const handleSelect = (event: SelectChangeEvent) => {
    const newAsset = assets.find((asset) => asset.symbol === event.target.value) as T;
    onSelect && onSelect(newAsset);
    onChange && onChange('');
  };

  const asset =
    assets.length === 1
      ? assets[0]
      : assets && (assets.find((asset) => asset.symbol === symbol) as T);

  return (
    <Box>
      {/* <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Typography color="text.secondary">
          {inputTitle ? inputTitle : <Trans>Amount</Trans>}
        </Typography>
        {capType && <AvailableTooltip capType={capType} />}
      </Box>
 */}
      <Box
        sx={(theme) => ({
          p: '16px',
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: '12px',
          background: '#EEF0F2',
          mb: 4,
        })}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <InputBase
            sx={{ flex: 1 }}
            placeholder="0.00"
            disabled={disabled || disableInput}
            value={value}
            autoFocus
            onChange={(e) => {
              if (!onChange) return;
              if (Number(e.target.value) > Number(maxValue)) {
                onChange('-1');
              } else {
                onChange(e.target.value);
              }
            }}
            inputProps={{
              'aria-label': 'amount input',
              style: {
                lineHeight: '28,01px',
                padding: 0,
                height: '28px',
                fontWeight: 500,
                color: '#000',
                fontSize: '24px',
              },
            }}
            // eslint-disable-next-line
            inputComponent={NumberFormatCustom as any}
          />

          {!onSelect || assets.length === 1 ? (
            // <ButtonBase onClick={()=>openSelectToken()} disableTouchRipple>
            //   <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
            //     <TokenIcon
            //       mToken={asset.mToken}
            //       symbol={asset.iconSymbol || asset.symbol}
            //       sx={{ mr: 2, ml: 4 }}
            //     />
            //     <Typography variant="h3" sx={{ lineHeight: '28px' }} data-cy={'inputAsset'}>
            //       {symbol}
            //     </Typography>
            //     <ChevronRight sx={{transform: 'rotate(90deg)'}} />
            //   </Box>
            // </ButtonBase>
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <TokenIcon
                mToken={asset.mToken}
                symbol={asset.iconSymbol || asset.symbol}
                sx={{ mr: 2, ml: 4 }}
              />
              <Typography variant="h3" sx={{ lineHeight: '28px' }} data-cy={'inputAsset'}>
                {symbol}
              </Typography>
            </Box>
          ) : (
            <FormControl>
              <Select
                disabled={disabled}
                value={asset.symbol}
                onChange={handleSelect}
                variant="outlined"
                className="AssetInput__select"
                data-cy={'assetSelect'}
                sx={{
                  p: 0,
                  '&.AssetInput__select .MuiOutlinedInput-input': {
                    p: 0,
                    backgroundColor: 'transparent',
                    pr: '24px !important',
                  },
                  '&.AssetInput__select .MuiOutlinedInput-notchedOutline': { display: 'none' },
                  '&.AssetInput__select .MuiSelect-icon': {
                    color: 'text.primary',
                  },
                }}
                renderValue={(symbol) => {
                  const asset =
                    assets.length === 1
                      ? assets[0]
                      : assets && (assets.find((asset) => asset.symbol === symbol) as T);
                  return (
                    <Box
                      sx={{ display: 'flex', alignItems: 'center' }}
                      data-cy={`assetsSelectedOption_${asset.symbol.toUpperCase()}`}
                    >
                      <TokenIcon
                        symbol={asset.iconSymbol || asset.symbol}
                        mToken={asset.mToken}
                        sx={{ mr: 2, ml: 4 }}
                      />
                      <Typography variant="main16" color="text.primary">
                        {symbol}
                      </Typography>
                    </Box>
                  );
                }}
              >
                {assets.map((asset) => (
                  <MenuItem
                    key={asset.symbol}
                    value={asset.symbol}
                    data-cy={`assetsSelectOption_${asset.symbol.toUpperCase()}`}
                  >
                    <TokenIcon
                      mToken={asset.mToken}
                      symbol={asset.iconSymbol || asset.symbol}
                      sx={{ fontSize: '22px', mr: 1 }}
                    />
                    <ListItemText sx={{ mr: 6 }}>{asset.symbol}</ListItemText>
                    {asset.balance && <FormattedNumber value={asset.balance} compact />}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', height: '16px' }}>
          <FormattedNumber
            value={isNaN(Number(usdValue)) ? 0 : Number(usdValue)}
            compact
            symbol="USD"
            variant="secondary12"
            color="#9AA6AC"
            symbolsColor="#9AA6AC"
            flexGrow={1}
          />

          {asset.balance && onChange && (
            <>
              <Typography component="div" variant="secondary12" color="#9AA6AC">
                <Trans>Balance</Trans>{' '}
                <FormattedNumber
                  value={asset.balance}
                  compact
                  variant="secondary12"
                  color="#9AA6AC"
                  symbolsColor="#9AA6AC"
                />
              </Typography>
              <Button
                size="small"
                sx={{
                  minWidth: 0,
                  ml: '7px',
                  p: 1,
                  color: '#9AA6AC',
                  fontSize: '12px',
                  fontWeight: 400,
                }}
                onClick={() => onChange('-1')}
                disabled={disabled || isMaxSelected}
              >
                <Trans>Max</Trans>
              </Button>
            </>
          )}
        </Box>
      </Box>
      {asset.balance && onChange && (
        <Box
          sx={{
            display: 'flex',
            gap: 2,
          }}
        >
          <ButtonBase
            sx={{
              flex: 1,
              padding: '8px',
              background: '#EEF0F2',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#000',
            }}
            onClick={() => onChange('-0.25')}
          >
            25%
          </ButtonBase>
          <ButtonBase
            sx={{
              flex: 1,
              padding: '8px',
              background: '#EEF0F2',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#000',
            }}
            onClick={() => onChange('-0.5')}
          >
            50%
          </ButtonBase>
          <ButtonBase
            sx={{
              flex: 1,
              padding: '8px',
              background: '#EEF0F2',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#000',
            }}
            onClick={() => onChange('-0.75')}
          >
            75%
          </ButtonBase>
          <ButtonBase
            sx={{
              flex: 1,
              padding: '8px',
              background: '#EEF0F2',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#000',
            }}
            onClick={() => onChange('-1')}
          >
            100%
          </ButtonBase>
        </Box>
      )}
    </Box>
  );
};
