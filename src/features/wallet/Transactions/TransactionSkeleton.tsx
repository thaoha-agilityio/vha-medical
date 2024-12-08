import { Skeleton } from '@nextui-org/react';
import { Text } from '@/components/ui';

// Constants
import { PAGE_LIMIT_TRANSACTIONS } from '@/constants';

export const TransactionListSkeleton = () => (
  <>
    <div className="flex flex-col  gap-[30px] mt-6 w-full">
      {Array(PAGE_LIMIT_TRANSACTIONS)
        .fill(0)
        .map((_, index) => (
          <div className="flex items-center justify-between" key={index}>
            <div className="flex items-center gap-4">
              <Skeleton className="min-w-10 w-10 h-10 rounded-full" />
              <div>
                <Skeleton className="w-[120px] h-5 rounded-sm mb-2" />
                <Skeleton className="w-[122px] h-4 rounded-sm" />
              </div>
            </div>
            <Skeleton className="w-[46px] h-4 rounded-sm" />
          </div>
        ))}
    </div>

    <div className="flex flex-col items-center">
      <Skeleton className="w-[160px] h-8 rounded-medium mt-6" />
    </div>
  </>
);

export const TransactionsSkeleton = () => (
  <div className="w-full">
    <Text variant="title">Notifications</Text>
    <TransactionListSkeleton />
  </div>
);
