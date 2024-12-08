'use client';

import { useDisclosure } from '@nextui-org/react';

// Components
import { Button, Text } from '@/components/ui';
import { ExportIcon } from '@/icons';

// Utils
import { formatNumber } from '@/utils';
import { TransactionModal } from '../TransactionModal';

export const TotalBalance = ({ totalBalance }: { totalBalance: number }) => {
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

      {isOpen && <TransactionModal isOpen={isOpen} onClose={onClose} />}
    </>
  );
};
