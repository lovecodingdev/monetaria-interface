import { Box } from '@mui/material';
import { TokenIcon } from './TokenIcon';

interface TokenPairProps {
  tokenA: string;
  tokenB?: string;
}

export const TokenPair = ({ tokenA, tokenB }: TokenPairProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <TokenIcon
        symbol={tokenA}
        sx={{
          fontSize: '32px',
          mr: -3,
        }}
      />
      {tokenB && (
        <TokenIcon
          symbol={tokenB}
          sx={{
            fontSize: '32px',
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};
