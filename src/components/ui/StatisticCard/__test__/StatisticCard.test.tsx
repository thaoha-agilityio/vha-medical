import { render, screen } from '@testing-library/react';
import { StatisticCard } from '..';

describe('StatisticCard Component', () => {
  it('renders the title and value correctly', () => {
    render(<StatisticCard title="VHA Token Balance" value={123} />);

    expect(screen.getByText('VHA Token Balance')).toBeInTheDocument();
    expect(screen.getByText('$123.00')).toBeInTheDocument();
  });

  it('applies the default custom color when no customColor is provided', () => {
    render(<StatisticCard title="Default Color Test" value={456} />);

    const spanElement = screen.getByTestId('statistic-card');
    expect(spanElement).toHaveClass('bg-secondary-100');
  });

  it('applies the custom color when customColor is provided', () => {
    const customColor = 'bg-red-500';
    render(
      <StatisticCard
        title="Custom Color Test"
        value={789}
        customColor={customColor}
      />,
    );

    const spanElement = screen.getByTestId('statistic-card');
    expect(spanElement).toHaveClass(customColor);
  });
});
