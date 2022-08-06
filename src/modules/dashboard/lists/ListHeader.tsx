import { Trans } from '@lingui/macro';
import { ReactNode } from 'react';

import { ListColumn } from '../../../components/lists/ListColumn';
import { ListHeaderTitle } from '../../../components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from '../../../components/lists/ListHeaderWrapper';
import { ListButtonsColumn } from './ListButtonsColumn';

interface ListHeaderProps {
  head: ReactNode[];
}

export const ListHeader = ({ head }: ListHeaderProps) => {
  return (
    <ListHeaderWrapper>
      <ListColumn maxWidth={160} isRow>
        <ListHeaderTitle>
          <Trans>Assets name</Trans>
        </ListHeaderTitle>
      </ListColumn>

      {head.map((title, i) => {
        return (
          <ListColumn key={i} align={title.key == "Actions" ? "right" : 'center'}>
            <ListHeaderTitle>{title}</ListHeaderTitle>
          </ListColumn>
        )
      })}

      {/* <ListButtonsColumn /> */}
    </ListHeaderWrapper>
  );
};
