import type { Meta, StoryObj } from '@storybook/react';

import { TransactionCard } from '.';

const meta = {
  title: 'Components/TransactionCard',
  tags: ['autodocs'],

  component: TransactionCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TransactionCard>;

export default meta;
type Story = StoryObj<typeof TransactionCard>;

export const TransactionCardDefault: Story = {
  args: {
    receiveName: 'John Doe',
    amount: 100,
    time: '2 hours ago',
    receiveAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
  },
};
