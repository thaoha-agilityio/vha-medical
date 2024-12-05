import { Text, TransactionCard } from '@/components/ui';
import Pagination from '@/components/ui/Pagination';

const Transactions = () => (
  <div className="w-full">
    <Text variant="title">Notifications</Text>
    {/* TODO: will replace with real data */}
    <div className="flex flex-col  gap-[30px] mt-6 w-full">
      <TransactionCard
        receiveName={'Josep akbar'}
        amount={1000}
        timeAgo={'Just now'}
      />
      <TransactionCard
        receiveName={'Josep akbar'}
        amount={1000}
        timeAgo={'Just now'}
      />
      <TransactionCard
        receiveName={'Josep akbar'}
        amount={1000}
        timeAgo={'Just now'}
      />
      <TransactionCard
        receiveName={'Josep akbar'}
        amount={1000}
        timeAgo={'Just now'}
      />
      <TransactionCard
        receiveName={'Josep akbar'}
        amount={1000}
        timeAgo={'Just now'}
      />
    </div>
    <div className="flex flex-col items-center">
      <Pagination classNames={{ base: 'mt-4' }} initialPage={1} total={3} />
    </div>
  </div>
);

export default Transactions;
