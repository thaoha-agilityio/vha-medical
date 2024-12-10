import { Suspense } from 'react';

// Types
import { MetaResponse, UserLogged } from '@/types';

// Components
import { TotalBalance } from './TotalBalance';
import { Transactions } from './Transactions';
import { TransactionListSkeleton } from './Transactions/TransactionSkeleton';

interface TransactionsHistoryProps extends MetaResponse {
  totalBalance: number;
  userLogged: UserLogged | null;
  page: number;
}
export const TransactionsHistory = ({
  totalBalance,
  userLogged,
  page,
}: TransactionsHistoryProps) => (
  <div className="flex flex-col gap-4 items-center rounded-xl bg-background-200 px-[18px] py-5 w-full xl:w-[650px]">
    <TotalBalance totalBalance={totalBalance} userLogged={userLogged} />
    <Suspense fallback={<TransactionListSkeleton />}>
      <Transactions userLogged={userLogged} page={page} />
    </Suspense>
  </div>
);
