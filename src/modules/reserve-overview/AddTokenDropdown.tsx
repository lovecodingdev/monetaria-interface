import { Trans } from '@lingui/macro';
import { Box, Menu, MenuItem, Typography } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { CircleIcon } from 'src/components/CircleIcon';
import { Base64Token, TokenIcon } from 'src/components/primitives/TokenIcon';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';
import { ERC20TokenType } from 'src/libs/web3-data-provider/Web3Provider';

interface AddTokenDropdownProps {
  poolReserve: ComputedReserveData;
  downToSM: boolean;
  switchNetwork: (chainId: number) => Promise<void>;
  addERC20Token: (args: ERC20TokenType) => Promise<boolean>;
  currentChainId: number;
  connectedChainId: number;
}

export const AddTokenDropdown = ({
  poolReserve,
  downToSM,
  switchNetwork,
  addERC20Token,
  currentChainId,
  connectedChainId,
}: AddTokenDropdownProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [changingNetwork, setChangingNetwork] = useState(false);
  const [underlyingBase64, setUnderlyingBase64] = useState('');
  const [mTokenBase64, setMTokenBase64] = useState('');
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // The switchNetwork function has no return type, so to detect if a user successfully switched networks before adding token to wallet, check the selected vs connected chain id
  useEffect(() => {
    if (changingNetwork && currentChainId === connectedChainId) {
      addERC20Token({
        address: poolReserve.underlyingAsset,
        decimals: poolReserve.decimals,
        symbol: poolReserve.symbol,
        image: !/_/.test(poolReserve.iconSymbol) ? underlyingBase64 : undefined,
      });
      setChangingNetwork(false);
    }
  }, [
    currentChainId,
    connectedChainId,
    changingNetwork,
    addERC20Token,
    poolReserve.underlyingAsset,
    poolReserve.decimals,
    poolReserve.symbol,
    poolReserve.iconSymbol,
    underlyingBase64,
  ]);

  return (
    <>
      {/* Load base64 token symbol for adding underlying and mTokens to wallet */}
      {poolReserve?.symbol && !/_/.test(poolReserve.symbol) && (
        <>
          <Base64Token
            symbol={poolReserve.iconSymbol}
            onImageGenerated={setUnderlyingBase64}
            mToken={false}
          />
          <Base64Token
            symbol={poolReserve.iconSymbol}
            onImageGenerated={setMTokenBase64}
            mToken={true}
          />
        </>
      )}
      <Box onClick={handleClick}>
        <CircleIcon tooltipText="Add token to wallet" downToSM={downToSM}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              '&:hover': {
                border: '1px solid #080F26',
              },
              cursor: 'pointer',
              color: '#080F26',
              background: '#F6F8F9',
              borderRadius: '12px',
              height: '32px',
            }}
          >
            <img
              src="/icons/wallets/walletIcon.svg"
              width="18px"
              height="18px"
              alt="wallet icon"
              className="Wallet__icon"
              style={{
                opacity: 1,
                position: 'relative',
                left: '8px',
              }}
            />
            <img
              src="/icons/wallets/walletIconHover.svg"
              width="16px"
              height="16px"
              alt="wallet hover icon"
              className="Wallet__iconHover"
              style={{
                opacity: 0,
                position: 'relative',
                left: '-8px',
              }}
            />
          </Box>
        </CircleIcon>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        keepMounted={true}
        data-cy="addToWaletSelector"
      >
        <Box sx={{ px: '16px', py: '12px', width: '240px' }}>
          <Typography variant="secondary12" color="text.secondary">
            <Trans>Select token to add</Trans>
          </Typography>
        </Box>

        <MenuItem
          key="underlying"
          value="underlying"
          onClick={() => {
            if (currentChainId !== connectedChainId) {
              switchNetwork(currentChainId).then(() => {
                setChangingNetwork(true);
              });
            } else {
              addERC20Token({
                address: poolReserve.underlyingAsset,
                decimals: poolReserve.decimals,
                symbol: poolReserve.symbol,
                image: !/_/.test(poolReserve.symbol) ? underlyingBase64 : undefined,
              });
            }
            handleClose();
          }}
        >
          <TokenIcon symbol={poolReserve.iconSymbol} sx={{ fontSize: '20px' }} />
          <Typography variant="subheader1" sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
            {poolReserve.symbol}
          </Typography>
        </MenuItem>

        <MenuItem
          key="mtoken"
          value="mtoken"
          onClick={() => {
            if (currentChainId !== connectedChainId) {
              switchNetwork(currentChainId).then(() => {
                setChangingNetwork(true);
              });
            } else {
              addERC20Token({
                address: poolReserve.mTokenAddress,
                decimals: poolReserve.decimals,
                symbol: `m${poolReserve.symbol}`,
                image: !/_/.test(poolReserve.symbol) ? mTokenBase64 : undefined,
              });
            }
            handleClose();
          }}
        >
          <TokenIcon symbol={poolReserve.iconSymbol} sx={{ fontSize: '20px' }} mToken={true} />
          <Typography variant="subheader1" sx={{ ml: 3 }} noWrap data-cy={`assetName`}>
            {`m${poolReserve.symbol}`}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
