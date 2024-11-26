import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { act, screen } from '@testing-library/react';

// Constants
import { PRIVATE_ROUTES } from '@/constants';

// Utils
import { renderServerComponent } from '@/utils/test-util';

// Services
import { getAppointments } from '@/services';

// Mocks
import { MOCK_APPOINTMENTS, MOCK_USERS_LOGGED } from '@/mocks';

// Components
import AppointmentsUpcoming, { AppointmentsUpcomingProps } from '.';
import React from 'react';

jest.mock('../../../services/appointment.ts', () => ({
  getAppointments: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('@/utils', () => ({
  ...jest.requireActual('@/utils'),
  cn: jest.fn(() => 'mocked-class'),
}));
describe('AppointmentsUpComing test cases', () => {
  const mockProps: AppointmentsUpcomingProps = {
    userLogged: MOCK_USERS_LOGGED[0],
    status: 'new',
  };
  const mockGetAppointments = getAppointments as jest.Mock;
  const mockReplace = jest.fn();
  const mockUsePathname = usePathname as jest.Mock;
  const mockUseRouter = useRouter as jest.Mock;
  const mockUseSearchParams = useSearchParams as jest.Mock;

  const setup = async (props: AppointmentsUpcomingProps) =>
    act(() => renderServerComponent(<AppointmentsUpcoming {...props} />));

  beforeEach(() => {
    jest.spyOn(React, 'useMemo').mockReturnValueOnce({});
    mockGetAppointments.mockReturnValue({ appointments: MOCK_APPOINTMENTS });
    mockUsePathname.mockReturnValue(PRIVATE_ROUTES.DASHBOARD);
    mockUseRouter.mockReturnValue({ replace: mockReplace });
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { asFragment } = await setup(mockProps);

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly without props and role', async () => {
    mockGetAppointments.mockReturnValue({ appointments: undefined });

    await setup({ ...mockProps, userLogged: null });

    const emptyMessage = screen.getByText(/Result Not Found/i);

    expect(emptyMessage).toBeInTheDocument();
  });
});
