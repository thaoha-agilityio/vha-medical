import { Button, Text } from '@/components/ui';
import { ExportIcon } from '@/icons';
import { Skeleton } from '@nextui-org/react';

export const TotalBalanceSkeleton = () => (
  <>
    <Text
      variant="title"
      size="md"
      customClass="text-primary-300 font-semibold"
    >
      Total Balance
    </Text>
    <Skeleton className="w-[213px] h-[60px] rounded-lg" />
    <Button
      endContent={<ExportIcon customClass="w-4 h-4" />}
      className="text-md"
    >
      Send
    </Button>
  </>
);
