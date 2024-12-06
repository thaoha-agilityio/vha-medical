import { Avatar, Text } from '@/components/ui';
import { TransactionModel } from '@/types';

// Utils
import { formatNumber, fromDateToNow } from '@/utils';

interface TransactionCardProps {
  userId: string;
  transaction: TransactionModel;
}

export const TransactionCard = ({
  transaction,
  userId,
}: TransactionCardProps) => {
  const {
    senderId,
    receiverId,
    createdAt = '',
    amount = 0,
  } = transaction || {};

  const { attributes: sender } = senderId.data || {};
  const { username: senderName, avatar: senderAvatar } = sender || {};

  const { id: receiverIdValue, attributes: receiver } = receiverId.data || {};
  const { username: receiverName, avatar: receiverAvatar } = receiver || {};

  const isReceiver = receiverIdValue === userId;

  const money = formatNumber(amount);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar
          size="lg"
          src={isReceiver ? senderAvatar : receiverAvatar}
          className="aspect-square"
        />
        <div>
          <Text size="sm" customClass="mb-2 font-semibold">
            {isReceiver ? senderName : receiverName}
          </Text>
          <Text size="xs" variant="subTitle">
            {isReceiver ? `Sent you $${money}` : `You sent $${money}`}
          </Text>
        </div>
      </div>
      <Text variant="subTitle" size="xs">
        {fromDateToNow(createdAt)}
      </Text>
    </div>
  );
};
