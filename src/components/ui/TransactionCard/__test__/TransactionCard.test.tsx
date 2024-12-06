import { render } from '@testing-library/react';

import { TransactionCard } from '..';
import { MOCK_TRANSACTION } from '@/mocks';

describe('TransactionCard', () => {
  it('renders the receiveName, amount, time, and avatar correctly', () => {
    const { container } = render(
      <TransactionCard transaction={MOCK_TRANSACTION} userId="2" />,
    );

    expect(container).toMatchSnapshot();
  });
});
