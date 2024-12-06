import { Button, Text } from '@/components/ui';
import { ExportIcon } from '@/icons';

// Utils
import { formatNumber } from '@/utils';

export const TotalBalance = ({ totalBalance }: { totalBalance: number }) => (
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
    >
      Send
    </Button>
  </>
);
