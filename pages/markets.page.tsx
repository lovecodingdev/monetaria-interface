import { MainLayout } from 'src/layouts/MainLayout';
import AssetsList from 'src/modules/markets/AssetsList';
import { MarketsTopPanel } from 'src/modules/markets/MarketsTopPanel';
import MarketsCaurosel from 'src/modules/markets/MarketsCaurosel';
import { ContentContainer } from '../src/components/ContentContainer';

export default function Markets() {
  return (
    <>
      <MarketsTopPanel />
      <ContentContainer>
        <MarketsCaurosel />
        <AssetsList />
      </ContentContainer>
    </>
  );
}

Markets.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
