import { createWrapper, setupFailedNetworkRequest } from '@/mocks/mockGraphqlClient';
import AdminDashboard from '../AdminDashboard';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { server } from '@/mocks/server';
import * as router from 'react-router';
import userEvent from '@testing-library/user-event';
import Paths from '@/config/paths';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('Admin Dashboard', () => {
  it('should render cards displaying data from API call', async () => {
    const Component = createWrapper(<AdminDashboard />);
    const { findAllByRole } = render(<Component />);
    const h4Elements = await findAllByRole('heading', { level: 4 });

    expect(h4Elements[0]).toHaveTextContent('19 out of 163');
    expect(h4Elements[1]).toHaveTextContent('26');
    expect(h4Elements[2]).toHaveTextContent('12');
  });

  it('should render join requests card displaying data from API call', async () => {
    const Component = createWrapper(<AdminDashboard />);
    const { findAllByLabelText } = render(<Component />);
    const pills = await findAllByLabelText('pill');

    expect(pills[0]).toHaveTextContent('29 school requests');
    expect(pills[1]).toHaveTextContent('9 charity requests');
  });

  it('should handle failed API call', async () => {
    server.use(setupFailedNetworkRequest());
    const Component = createWrapper(<AdminDashboard />);
    const { findByText, findByRole } = render(<Component />);
    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner).then(async () => {
      const element = await findByText('Something went wrong');
      expect(element).toBeInTheDocument();
    });
  });

  it('should navigate to manage la page on tile click', async () => {
    const Component = createWrapper(<AdminDashboard />);
    const { findByLabelText } = render(<Component />);

    const laCard = await findByLabelText('la');

    await userEvent.click(laCard);
    expect(navigate).toHaveBeenCalledWith(Paths.ADMIN_DASHBOARD_LA_MANAGE);
  });

  it('should navigate to manage requests page on tile click', async () => {
    const Component = createWrapper(<AdminDashboard />);
    const { findByLabelText } = render(<Component />);

    const requestsCard = await findByLabelText('requests');

    await userEvent.click(requestsCard);
    expect(navigate).toHaveBeenCalledWith(Paths.ADMIN_DASHBOARD_REQUESTS);
  });

  it('should navigate to manage schools page on tile click', async () => {
    const Component = createWrapper(<AdminDashboard />);
    const { findByLabelText } = render(<Component />);

    const schoolsCard = await findByLabelText('schools');

    await userEvent.click(schoolsCard);
    expect(navigate).toHaveBeenCalledWith(Paths.ADMIN_DASHBOARD_MANAGE_SCHOOLS);
  });

  it('should navigate to manage charities page on tile click', async () => {
    const Component = createWrapper(<AdminDashboard />);
    const { findByLabelText } = render(<Component />);

    const charitiesCard = await findByLabelText('charities');

    await userEvent.click(charitiesCard);
    expect(navigate).toHaveBeenCalledWith(Paths.ADMIN_DASHBOARD_MANAGE_CHARITIES);
  });
});
