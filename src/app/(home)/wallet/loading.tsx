import { Skeleton } from '@nextui-org/react';
import { TotalBalanceSkeleton } from '@/features/wallet/TotalBalance/TotalBalanceSkeleton';
import { TransactionsSkeleton } from '@/features/wallet/Transactions/TransactionSkeleton';

const WalletLoading = () => (
  <div className="flex flex-col xl:flex-row xl:gap-4 mt-8 justify-between w-full">
    <div className="flex justify-between md:gap-4 mb-8">
      <section className="relative bg-background-200 py-[14px] px-5 rounded-xl w-[160px] md:w-[336px] h-[130px]">
        <span className="absolute top-4 left-0 w-[5px] h-[53px] rounded-r-lg" />
        <Skeleton className="w-20 h-5 rounded-large mb-3" />
        <Skeleton className="w-24 h-5 rounded-large" />
      </section>
      <section className="relative bg-background-200 py-[14px] px-5 rounded-xl w-[160px] md:w-[336px] h-[130px]">
        <span
          className={`absolute top-4 left-0 w-[5px] h-[53px] rounded-r-lg`}
        />
        <Skeleton className="w-20 h-5 rounded-large mb-3" />
        <Skeleton className="w-24 h-5 rounded-large" />
      </section>
    </div>
    <div className="flex flex-col gap-4 items-center rounded-xl bg-background-200 px-[18px] py-5 w-full xl:w-[650px]">
      <TotalBalanceSkeleton />
      <TransactionsSkeleton />
    </div>
  </div>
);

export default WalletLoading;
