import { Text } from '@/components/ui';

// Utils
import { formatNumber } from '@/utils';

interface StatisticCardProps {
  title: string;
  value: number;
  customColor?: string;
}

export const StatisticCard = ({
  title,
  value,
  customColor = 'bg-secondary-100',
}: StatisticCardProps) => (
  <section className="relative bg-background-200 py-[14px] px-5 rounded-xl w-[160px] md:w-[336px] h-[130px]">
    <span
      data-testid="statistic-card"
      className={`absolute top-4 left-0 w-[5px] h-[53px] rounded-r-lg ${customColor}`}
    />
    <Text customClass="text-primary-300 text-xs md:text-sm font-semibold">
      {title}
    </Text>
    <Text
      variant="title"
      customClass="mt-[10px] text-lg md:text-2xl font-semibold"
    >
      ${formatNumber(value)}
    </Text>
  </section>
);

StatisticCard.displayName = 'StatisticCard';
