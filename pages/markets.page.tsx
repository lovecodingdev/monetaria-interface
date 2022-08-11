import { MainLayout } from 'src/layouts/MainLayout';
import AssetsList from 'src/modules/markets/AssetsList';
import { MarketsTopPanel } from 'src/modules/markets/MarketsTopPanel';
import MarketsCaurosel from 'src/modules/markets/MarketsCaurosel';

import { ContentContainer } from '../src/components/ContentContainer';
import { ConnectWalletPaper } from '../src/components/ConnectWalletPaper';
import { usePermissions } from 'src/hooks/usePermissions';
import { useWeb3Context } from '../src/libs/hooks/useWeb3Context';

export default function Markets() {
  const { currentAccount, loading: web3Loading } = useWeb3Context();
  const { isPermissionsLoading } = usePermissions();
  return (
    <>
      <MarketsTopPanel />
      {currentAccount && !isPermissionsLoading ? (
        <>
          <ContentContainer>
            <MarketsCaurosel />
            <AssetsList />
          </ContentContainer>
        </>
      ) : (
        <ConnectWalletPaper loading={web3Loading} />
      )}
    </>
  );
}

Markets.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
