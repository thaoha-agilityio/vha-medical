import { render, screen } from '@testing-library/react';
import { TransactionCard } from '..';

describe('TransactionCard', () => {
  it('renders the receiveName, amount, time, and avatar correctly', () => {
    const props = {
      receiveName: 'John Doe',
      amount: 100,
      timeAgo: '2 hours ago',
      receiveAvatar: 'https://example.com/avatar.jpg',
    };

    const { container } = render(<TransactionCard {...props} />);

    // Assert that the name is displayed
    expect(screen.getByText(props.receiveName)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
