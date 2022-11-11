import { Trans } from '@lingui/macro';
import { ReactNode } from 'react';

import { ListColumn } from '../../../components/lists/ListColumn';
import { ListHeaderTitle } from '../../../components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from '../../../components/lists/ListHeaderWrapper';
import { ListButtonsColumn } from './ListButtonsColumn';
import { useMediaQuery, useTheme } from '@mui/material';

interface ListHeaderProps {
  head: ReactNode[];
}

export const ListHeader = ({ head }: ListHeaderProps) => {
  const theme = useTheme();
  const downToLG = useMediaQuery(theme.breakpoints.down('lg'));
  const downToMD = useMediaQuery(theme.breakpoints.down('md'));
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ListHeaderWrapper>
      <ListColumn maxWidth={160} isRow>
        <ListHeaderTitle>
          <Trans>Assets name</Trans>
        </ListHeaderTitle>
      </ListColumn>

      {head.map((title, i) => {
        if (downToLG && i == 1) return <></>;
        if (downToMD && i == 5) return <></>;
        if (downToSM && i == 0) return <></>;

        const values = title?.valueOf() as Record<string, string>;
        const isAction = values['key'] === 'Actions';
        return (
          <ListColumn key={i} align={isAction ? 'right' : 'center'} minWidth={isAction ? 170 : 0}>
            <ListHeaderTitle>{title}</ListHeaderTitle>
          </ListColumn>
        );
      })}

      {/* <ListButtonsColumn /> */}
    </ListHeaderWrapper>
  );
};
