import type { Meta, StoryObj } from '@storybook/react';

import { TransactionCard } from '.';
import { MOCK_TRANSACTION } from '@/mocks';

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
    transaction: MOCK_TRANSACTION,
    userId: '2',
  },
};
