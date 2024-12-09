'use client';

import { useDisclosure } from '@nextui-org/react';

// Components
import { Button, Text } from '@/components/ui';
import { ExportIcon } from '@/icons';

// Utils
import { formatNumber } from '@/utils';
import { TransactionModal } from '../TransactionModal';
import { UserLogged } from '@/types';

interface TotalBalanceProps {
  totalBalance: number;
  userLogged: UserLogged | null;
}

export const TotalBalance = ({
  totalBalance,
  userLogged,
}: TotalBalanceProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Text
        variant="title"
        size="md"
        customClass="text-primary-300 font-semibold"
      >
        Total Balance
      </Text>
      <Text size="4xl" customClass="font-semibold">
        ${formatNumber(totalBalance)}
      </Text>
      <Button
        endContent={<ExportIcon customClass="w-4 h-4" />}
        className="text-md"
        onClick={onOpen}
      >
        Send
      </Button>

      {isOpen && (
        <TransactionModal
          isOpen={isOpen}
          onClose={onClose}
          userLogged={userLogged}
        />
      )}
    </>
  );
};
