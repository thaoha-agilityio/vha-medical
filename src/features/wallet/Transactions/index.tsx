// Services
import { getTransactions } from '@/services';

// Components
import { TransactionsHistory } from './TransactionsHistory';

// Types
import { DIRECTION, MetaResponse, UserLogged } from '@/types';

// Constants
import { PAGE_LIMIT_TRANSACTIONS } from '@/constants';

interface TransactionsProps extends MetaResponse {
  userLogged: UserLogged | null;
}

export const Transactions = async ({ userLogged }: TransactionsProps) => {
  const { id: userId = '' } = userLogged || {};
  const searchParamsAPI = () => {
    const params = new URLSearchParams();
    params.set('populate[0]', 'receiverId');
    params.set('populate[1]', 'senderId');
    params.set('pagination[limit]', `${PAGE_LIMIT_TRANSACTIONS}`);
    params.set('filters[$or][0][senderId][id][$eq]', `${userId}`);
    params.set('filters[$or][1][receiverId][id][$eq]', `${userId}`);
    params.set('sort[0]', `createdAt:${DIRECTION.DESC}`);

    return params;
  };
  const { transactions, ...meta } = await getTransactions({
    searchParams: searchParamsAPI(),
  });

  return (
    <TransactionsHistory
      transactions={transactions}
      pagination={meta?.pagination}
      userId={userId}
    />
  );
};
