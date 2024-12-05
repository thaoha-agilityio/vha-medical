import { TotalBalance } from './TotalBalance';
import { Transactions } from './Transactions';

interface TransactionsHistoryProps {
  totalBalance: number;
}
export const TransactionsHistory = ({
  totalBalance,
}: TransactionsHistoryProps) => {
  return (
    <div className="flex flex-col gap-4 items-center rounded-xl bg-background-200 px-[18px] py-5 w-full xl:w-[650px]">
      <TotalBalance totalBalance={totalBalance} />
      <Transactions />
    </div>
  );
};
