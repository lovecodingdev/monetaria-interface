import { Trans } from '@lingui/macro';

import { TextWithTooltip, TextWithTooltipProps } from '../TextWithTooltip';

export const TVLTooltip = ({ ...rest }: TextWithTooltipProps) => {
  return (
    <TextWithTooltip {...rest}>
      <Trans>
        Total value locked (TVL), in the context of cryptocurrency, represents the sum of all assets
        deposited in decentralized finance (DeFi) protocols earning rewards, interest, new coins and
        tokens, fixed income, etc.
      </Trans>
    </TextWithTooltip>
  );
};
