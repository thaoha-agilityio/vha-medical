import { act, fireEvent, render, screen } from '@testing-library/react';
import ChemistList, { ChemistListProps } from '../ChemistList';
import { MOCK_CHEMISTS_LIST, MOCK_SPECIALTIES } from '@/mocks/chemists';

const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn().mockReturnValue(new URLSearchParams()),
  useRouter: () => ({ replace: mockReplace }),
  usePathname: jest.fn(),
}));

describe('ChemistList', () => {
  const mockProps: ChemistListProps = {
    chemists: MOCK_CHEMISTS_LIST,
    pagination: {
      page: 1,
      pageCount: 2,
      pageSize: 10,
      total: 20,
    },
    role: 'Admin',
    specialties: MOCK_SPECIALTIES,
  };

  const setup = async (props: ChemistListProps) =>
    act(() => render(<ChemistList {...props} />));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { asFragment } = await setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should display empty message when the chemists is empty', async () => {
    await setup({ ...mockProps, chemists: [] });

    const emptyMessage = screen.getByText(/result not found/i);

    expect(emptyMessage).toBeInTheDocument();
  });

  it('should be able to navigate between pages', async () => {
    await setup(mockProps);

    const secondPageBtn = screen.getByLabelText('pagination item 2');

    fireEvent.click(secondPageBtn);

    await setup({
      ...mockProps,
      pagination: {
        ...mockProps.pagination!,
        page: 2,
      },
    });

    const secondPageActiveBtn = screen.getByLabelText('pagination item 2');

    expect(secondPageActiveBtn).toBeInTheDocument();
  });

  it('should be able clear page params when navigating to page 1', async () => {
    await setup({
      ...mockProps,
      pagination: {
        ...mockProps.pagination!,
        page: 2,
      },
    });

    const firstPageBtn = screen.getByLabelText('pagination item 1');

    fireEvent.click(firstPageBtn);

    await setup(mockProps);

    expect(location.pathname.includes('page')).toBe(false);
  });
});
