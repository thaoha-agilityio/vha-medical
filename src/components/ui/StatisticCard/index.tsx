import { Text } from '@/components/ui';

interface StatisticCardProps {
  title: string;
  value: string;
  customColor?: string;
}

export const StatisticCard = ({
  title,
  value,
  customColor = 'bg-secondary-100',
}: StatisticCardProps) => (
  <section className="relative bg-background-200 py-[14px] px-5 rounded-xl w-[236px] h-[110px]">
    <span
      data-testid="statistic-card"
      className={`absolute top-4 left-0 w-[5px] h-[53px] rounded-r-lg ${customColor}`}
    />
    <Text customClass="text-primary-300 text-sm font-semibold">{title}</Text>
    <Text variant="title" customClass="mt-[10px] text-2xl font-semibold">
      {value}
    </Text>
  </section>
);

StatisticCard.displayName = 'StatisticCard';
