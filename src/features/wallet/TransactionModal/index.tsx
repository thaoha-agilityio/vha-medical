import { BaseModal } from '@/components/ui/BaseModal';
import { TransactionForm } from '../TransactionForm';

export type TransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const TransactionModal = ({
  isOpen,
  onClose,
}: TransactionModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} placement="center" size="xl">
    <TransactionForm onClose={onClose} />
  </BaseModal>
);
