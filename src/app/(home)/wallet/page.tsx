import { Metadata } from 'next';

// Constants
import { PREVIEW_IMAGE } from '@/constants';

// Components
import { StatisticCard } from '@/components/ui';
import { TransactionsHistory } from '@/features/wallet';

// Services
import { getUserLogged } from '@/services';
import { auth } from '@/config/auth';

export const metadata: Metadata = {
  title: 'Wallet',
  description: 'Wallet page for Medical Dashboard',
  openGraph: {
    title: 'Wallet',
    description: 'Wallet page for Medical Dashboard',
    images: [
      {
        url: PREVIEW_IMAGE,
        alt: 'preview image',
      },
    ],
  },
};

const WalletPage = async () => {
  const { token = '' } = (await auth())?.user || {};
  const { user: userLogged } = await getUserLogged(token);
  const { currentBalance = 0, currentSpending = 0 } = userLogged || {};

  return (
    <div className="flex flex-col xl:flex-row xl:gap-4 mt-8 justify-between w-full">
      <div className="flex justify-between md:gap-4 mb-8">
        <StatisticCard title="VHA Token Balance" value={currentBalance} />
        <StatisticCard
          title="Spending on VHA"
          // TODO: Add spending on VHA
          value={currentSpending || 0}
          customColor="bg-secondary-400"
        />
      </div>
      <TransactionsHistory
        totalBalance={currentBalance}
        userLogged={userLogged}
      />
    </div>
  );
};

export default WalletPage;
