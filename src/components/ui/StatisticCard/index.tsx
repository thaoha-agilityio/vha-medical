import { Text } from '@/components/ui';

export const StatisticCard = () => {
  return (
    <section className="relative bg-background-200 py-[14px] px-5 rounded-xl w-[236px] h-[110px] before:content-[''] before:absolute before:top-4 before:left-0 before:w-[5px] before:h-[53px] before:bg-secondary-100 before:rounded-r-lg">
      <Text customClass="text-primary-300 text-sm font-semibold">
        VHA Token Balance
      </Text>
      <Text variant="title" customClass="mt-[10px] text-2xl font-semibold">
        $21.,500.00
      </Text>
    </section>
  );
};
