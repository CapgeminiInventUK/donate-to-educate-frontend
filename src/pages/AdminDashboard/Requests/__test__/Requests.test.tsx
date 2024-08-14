import { render, waitForElementToBeRemoved } from '@testing-library/react';
import Requests from '../Requests';
import { createWrapper, setupFailedNetworkRequest } from '@/mocks/mockGraphqlClient';
import userEvent from '@testing-library/user-event';
import { server } from '@/mocks/server';

describe('Requests', () => {
  it('should render join requests table by default', async () => {
    const Component = createWrapper(<Requests />);
    const { findAllByRole, findByRole } = render(<Component />);

    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner);

    const tables = await findAllByRole('table');
    expect(tables).toHaveLength(2);
  });

  it('should render school join request on school click', async () => {
    const Component = createWrapper(<Requests />);
    const { findByRole, findAllByRole, findByLabelText } = render(<Component />);

    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner);

    const requestButtons = await findAllByRole('button', { name: 'view request' });
    await userEvent.click(requestButtons[0]);

    const pill = await findByLabelText('pill');
    expect(pill).toHaveTextContent('SCHOOL');
  });

  it('should render charity join request on school click', async () => {
    const Component = createWrapper(<Requests />);
    const { findByRole, findAllByRole, findByLabelText } = render(<Component />);

    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner);

    const requestButtons = await findAllByRole('button', { name: 'view request' });
    await userEvent.click(requestButtons[1]);

    const pill = await findByLabelText('pill');
    expect(pill).toHaveTextContent('CHARITY');
  });

  it('should handle API error', async () => {
    server.use(setupFailedNetworkRequest());
    const Component = createWrapper(<Requests />);
    const { findByText, findByRole } = render(<Component />);

    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner).then(async () => {
      const element = await findByText('Something went wrong');
      expect(element).toBeInTheDocument();
    });
  });
});
