import { Button, Text } from '@/components/ui';
import { ExportIcon } from '@/icons';
import Transactions from './Transactions';

// Utils
import { formatNumber } from '@/utils';

export const TotalBalance = () => (
  <div className="flex flex-col gap-4 items-center rounded-xl bg-background-200 px-[18px] py-5 w-[330px] md:w-[450px] xl:w-[650px]">
    <Text
      variant="title"
      size="md"
      customClass="text-primary-300 font-semibold"
    >
      Total Balance
    </Text>
    <Text size="4xl" customClass="font-semibold">
      ${formatNumber(8910)}
    </Text>
    <Button
      endContent={<ExportIcon customClass="w-4 h-4" />}
      className="text-md"
    >
      Send
    </Button>
    <Transactions />
  </div>
);
