import { MainLayout } from 'src/layouts/MainLayout';
import ReferralList from 'src/modules/referral/ReferralList';
import { ReferralTopPanel } from 'src/modules/referral/ReferralTopPanel';

import { ContentContainer } from '../src/components/ContentContainer';
import { ConnectWalletPaper } from '../src/components/ConnectWalletPaper';
import { usePermissions } from 'src/hooks/usePermissions';
import { useWeb3Context } from '../src/libs/hooks/useWeb3Context';

export default function Referral() {
  const { currentAccount, loading: web3Loading } = useWeb3Context();
  const { isPermissionsLoading } = usePermissions();
  return (
    <>
      <ReferralTopPanel />
      {currentAccount && !isPermissionsLoading ? (
        <>
          <ContentContainer>
            <ReferralList />
          </ContentContainer>
        </>
      ) : (
        <ConnectWalletPaper loading={web3Loading} />
      )}
    </>
  );
}

Referral.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
