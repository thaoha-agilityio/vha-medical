// Types
import { MetaResponse, UserLogged } from '@/types';

// Components
import { TotalBalance } from './TotalBalance';
import { Transactions } from './Transactions';

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
    <Transactions userLogged={userLogged} page={page} />
  </div>
);
