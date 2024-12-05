import { Avatar, Text } from '@/components/ui';

// Utils
import { formatNumber } from '@/utils';

interface TransactionCardProps {
  receiveName: string;
  amount: number;
  timeAgo: string;
  receiveAvatar?: string;
}

export const TransactionCard = ({
  receiveName,
  amount,
  timeAgo,
  receiveAvatar = '',
}: TransactionCardProps) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-4">
      <Avatar size="lg" src={receiveAvatar} />
      <div>
        <Text size="sm" customClass="mb-2 font-semibold">
          {receiveName}
        </Text>
        <Text size="xs" variant="subTitle">
          Just sent you ${formatNumber(amount)}
        </Text>
      </div>
    </div>
    <Text variant="subTitle" size="xs">
      {timeAgo}
    </Text>
  </div>
);
