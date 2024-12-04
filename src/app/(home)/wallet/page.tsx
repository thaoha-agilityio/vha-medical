import { Metadata } from 'next';

// Constants
import { PREVIEW_IMAGE } from '@/constants';

// Components
import { StatisticCard } from '@/components/ui';
import { TotalBalance } from '@/features/wallet';

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

const WalletPage = () => {
  return (
    <div className="flex flex-col xl:flex-row xl:gap-4 mt-8 justify-between w-full">
      <div className="flex justify-between md:gap-4 mb-8">
        <StatisticCard title="VHA Token Balance" value={5392} />
        <StatisticCard
          title="Spending on VHA"
          value={5392}
          customColor="bg-secondary-400"
        />
      </div>
      <TotalBalance />
    </div>
  );
};

export default WalletPage;
