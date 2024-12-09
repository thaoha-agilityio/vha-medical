import { BaseModal } from '@/components/ui/BaseModal';
import { TransactionForm } from '../TransactionForm';
import { UserLogged } from '@/types';

export type TransactionModalProps = {
  isOpen: boolean;
  userLogged: UserLogged | null;
  onClose: () => void;
};

export const TransactionModal = ({
  isOpen,
  userLogged,
  onClose,
}: TransactionModalProps) => (
  <BaseModal isOpen={isOpen} onClose={onClose} placement="center" size="xl">
    <TransactionForm onClose={onClose} userLogged={userLogged} />
  </BaseModal>
);
