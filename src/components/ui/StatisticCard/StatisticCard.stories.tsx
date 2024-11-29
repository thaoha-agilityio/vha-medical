import type { Meta, StoryObj } from '@storybook/react';

import { StatisticCard } from '.';

const meta = {
  title: 'Components/StatisticCard',
  tags: ['autodocs'],

  component: StatisticCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof StatisticCard>;

export default meta;
type Story = StoryObj<typeof StatisticCard>;

export const Default: Story = {
  args: {
    title: 'VHA Token Balance',
    value: '$21,500.00',
  },
};
