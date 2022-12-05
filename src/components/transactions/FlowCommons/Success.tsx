import { InterestRate } from '@monetaria/contract-helpers';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { CheckIcon } from '@heroicons/react/solid';
import { ReactNode, useState } from 'react';
import { Trans } from '@lingui/macro';
import { Box, Button, Link, SvgIcon, Typography, useTheme } from '@mui/material';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { Base64Token, TokenIcon } from 'src/components/primitives/TokenIcon';
import { useModalContext } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { ERC20TokenType } from 'src/libs/web3-data-provider/Web3Provider';

export type SuccessTxViewProps = {
  action?: ReactNode;
  amount?: string;
  symbol?: string;
  collateral?: boolean;
  rate?: InterestRate;
  addToken?: ERC20TokenType;
};

const ExtLinkIcon = () => (
  <SvgIcon sx={{ ml: '2px', fontSize: '11px' }}>
    <ExternalLinkIcon />
  </SvgIcon>
);

export const TxSuccessView = ({
  action,
  amount,
  symbol,
  collateral,
  rate,
  addToken,
}: SuccessTxViewProps) => {
  const { close, mainTxState } = useModalContext();
  const { addERC20Token } = useWeb3Context();
  const { currentNetworkConfig } = useProtocolDataContext();
  const [base64, setBase64] = useState('');
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '27px',
            height: '27px',
            backgroundColor: '#47D16C',
            borderRadius: '50%',
            mt: 14,
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SvgIcon sx={{ color: 'white', fontSize: '23px' }}>
            <CheckIcon />
          </SvgIcon>
        </Box>

        <Typography
          sx={{ mt: 4, color: '#080F26', fontWeight: 500, fontSize: '20px' }}
          variant="h2"
        >
          <Trans>All done!</Trans>
        </Typography>

        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          {action && amount && symbol && (
            <Typography sx={{ color: '#6E7C87', fontWeight: 400, fontSize: '14px' }}>
              <Trans>
                You {action}{' '}
                <FormattedNumber value={Number(amount)} compact variant="secondary14" /> {symbol}
              </Trans>
            </Typography>
          )}

          {!action && !amount && symbol && (
            <Typography>
              Your {symbol} {collateral ? 'now' : 'is not'} used as collateral
            </Typography>
          )}

          {rate && (
            <Typography>
              <Trans>
                You switched to {rate === InterestRate.Variable ? 'variable' : 'stable'} rate
              </Trans>
            </Typography>
          )}

          {addToken && symbol && (
            <Box
              sx={(theme) => ({
                border:
                  theme.palette.mode === 'dark' ? `1px solid ${theme.palette.divider}` : 'none',
                background: theme.palette.mode === 'dark' ? 'none' : '#F7F7F9',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                mt: '24px',
                padding: '16px',
              })}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'start',
                  justifyContent: 'space-between',
                  gap: 2,
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'start', gap: 2 }}>
                  {' '}
                  <Box>
                    {' '}
                    <TokenIcon symbol={symbol} mToken={true} sx={{ fontSize: '32px' }} />
                  </Box>
                  <Box>
                    {' '}
                    <Typography
                      variant="description"
                      color="#1A2024"
                      sx={{ fontWeight: 400, fontSize: '14px' }}
                    >
                      <Trans>Add mToken to the wallet to track your supply balance.</Trans>
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  {' '}
                  <Button
                    onClick={() => {
                      addERC20Token({
                        address: addToken.address,
                        decimals: addToken.decimals,
                        symbol: addToken.mToken ? `a${addToken.symbol}` : addToken.symbol,
                        image: !/_/.test(addToken.symbol) ? base64 : undefined,
                      });
                    }}
                    variant={theme.palette.mode === 'dark' ? 'outlined' : 'contained'}
                    size="medium"
                    sx={{ mt: '8px', mb: '12px', padding: '7px 12px' }}
                  >
                    {addToken.symbol && !/_/.test(addToken.symbol) && (
                      <Base64Token
                        symbol={addToken.symbol}
                        onImageGenerated={setBase64}
                        mToken={addToken.mToken}
                      />
                    )}

                    <Typography variant="buttonM" color="white">
                      <Trans>Add</Trans>
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Link
          variant="helperText"
          href={currentNetworkConfig.explorerLinkBuilder({ tx: mainTxState.txHash })}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'right',
            mt: 6,
            mb: 3,
            color: '#59729D',
            fontWeight: 400,
            fontSize: '12px',
          }}
          underline="hover"
          target="_blank"
          rel="noreferrer"
        >
          <Trans>Review tx details</Trans>
          <ExtLinkIcon />
        </Link>
        <Button
          onClick={close}
          variant="outlined"
          size="large"
          sx={{
            minHeight: '44px',
            color: '#074592',
            fontWeight: 600,
            fontSize: '16px',
            backgroundColor: 'rgba(21, 126, 255, 0.05)',
            border: '1px solid rgba(21, 126, 255, 0.2)',
            borderRadius: '8px',
          }}
          data-cy="closeButton"
        >
          <Trans>Ok, Close</Trans>
        </Button>
      </Box>
    </>
  );
};
