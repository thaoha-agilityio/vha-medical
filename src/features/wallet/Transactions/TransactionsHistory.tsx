'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useMemo, useTransition } from 'react';
import dynamic from 'next/dynamic';

// Types
import { MetaResponse, TransactionResponse } from '@/types';

// Constants
import { PAGE_DEFAULT } from '@/constants';

// Components
import { Text, TransactionCard } from '@/components/ui';
import { TransactionsSkeleton } from './TransactionSkeleton';
const Pagination = dynamic(() => import('@/components/ui/Pagination'));

type TransactionsHistoryProps = {
  transactions: TransactionResponse[];
  userId: string;
} & MetaResponse;

export const TransactionsHistory = ({
  transactions,
  pagination,
  userId,
}: TransactionsHistoryProps) => {
  const searchParams = useSearchParams() ?? '';
  const pathname = usePathname() ?? '';
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();
  const { page = PAGE_DEFAULT, pageCount = PAGE_DEFAULT } = pagination ?? {};

  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );

  const handleReplaceURL = useCallback(
    (params: URLSearchParams) => {
      startTransition(() => {
        replace(`${pathname}?${params.toString()}`);
      });
    },
    [pathname, replace],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      page === 1 ? params.delete('page') : params.set('page', page.toString());

      handleReplaceURL(params);
    },
    [handleReplaceURL, params],
  );

  return (
    <div className="w-full">
      <Text variant="title">Notifications</Text>

      {isPending ? (
        <TransactionsSkeleton />
      ) : (
        <>
          <div className="flex flex-col gap-[30px] mt-6 w-full">
            {transactions.length ? (
              transactions.map((transaction) => {
                const { id, attributes } = transaction || {};

                return (
                  <TransactionCard
                    userId={userId}
                    key={id}
                    transaction={attributes}
                  />
                );
              })
            ) : (
              <Text variant="description" customClass="text-center">
                You have no transactions to display
              </Text>
            )}
          </div>

          {!!pagination && pageCount > 1 && (
            <div className="flex flex-col items-center">
              <Suspense>
                <Pagination
                  classNames={{ base: 'mt-4' }}
                  initialPage={page}
                  total={pageCount}
                  onChange={handlePageChange}
                />
              </Suspense>
            </div>
          )}
        </>
      )}
    </div>
  );
};
