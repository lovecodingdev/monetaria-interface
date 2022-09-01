import { useWalletModalContext } from 'src/hooks/useWalletModal';
import { BasicModal } from '../primitives/BasicModal';
import { WalletSelector } from './WalletSelector';

export const WalletModal = () => {
  const { isWalletModalOpen, setWalletModalOpen } = useWalletModalContext();

  return (
    <BasicModal open={isWalletModalOpen} setOpen={setWalletModalOpen} withCloseButton={false}>
      <WalletSelector />
    </BasicModal>
  );
};
