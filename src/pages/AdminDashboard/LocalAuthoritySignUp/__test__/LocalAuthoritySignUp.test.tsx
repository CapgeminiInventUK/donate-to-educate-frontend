import * as router from 'react-router';
import userEvent from '@testing-library/user-event';
import Paths from '@/config/paths';
import { createWrapperWithState, setupFailedNetworkRequest } from '@/mocks/mockGraphqlClient';
import LocalAuthoritySignUp from '../LocalAuthoritySignUp';
import { render, waitFor } from '@testing-library/react';
import { server } from '@/mocks/server';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('Local authority sign up', () => {
  it('should handle form submit', async () => {
    const state = {
      la: 'test la',
      id: '12345',
    };
    const Component = createWrapperWithState(<LocalAuthoritySignUp />, state);
    const { getByRole } = render(<Component />);

    const firstNameInput = getByRole('textbox', { name: 'firstName' });
    const lastNameInput = getByRole('textbox', { name: 'lastName' });
    const jobTitleInput = getByRole('textbox', { name: 'jobTitle' });
    const departmentInput = getByRole('textbox', { name: 'department' });
    const emailInput = getByRole('textbox', { name: 'email' });
    const phoneInput = getByRole('textbox', { name: 'phone' });
    const notesInput = getByRole('textbox', { name: 'notes' });
    const submitButton = getByRole('button', { name: 'create account' });

    await userEvent.click(firstNameInput);
    await userEvent.keyboard('firstName');
    await userEvent.click(lastNameInput);
    await userEvent.keyboard('lastName');
    await userEvent.click(jobTitleInput);
    await userEvent.keyboard('jobTitle');
    await userEvent.click(departmentInput);
    await userEvent.keyboard('department');
    await userEvent.click(emailInput);
    await userEvent.keyboard('email@test.com');
    await userEvent.click(phoneInput);
    await userEvent.keyboard('07777777777');
    await userEvent.click(notesInput);
    await userEvent.keyboard('notes');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith(Paths.ADMIN_DASHBOARD_SIGN_UP_CONFIRMATION, {
        state: { name: state.la },
      });
    });
  });

  it('should handle form errors and not submit', async () => {
    const state = {
      la: 'test la',
      id: '12345',
    };
    const Component = createWrapperWithState(<LocalAuthoritySignUp />, state);
    const { getByRole, queryByText } = render(<Component />);

    const firstNameInput = getByRole('textbox', { name: 'firstName' });
    const lastNameInput = getByRole('textbox', { name: 'lastName' });
    const jobTitleInput = getByRole('textbox', { name: 'jobTitle' });
    const departmentInput = getByRole('textbox', { name: 'department' });
    const emailInput = getByRole('textbox', { name: 'email' });
    const phoneInput = getByRole('textbox', { name: 'phone' });
    const notesInput = getByRole('textbox', { name: 'notes' });
    const submitButton = getByRole('button', { name: 'create account' });

    await userEvent.click(firstNameInput);
    await userEvent.keyboard('firstName');
    await userEvent.click(lastNameInput);
    await userEvent.keyboard('lastName');
    await userEvent.click(jobTitleInput);
    await userEvent.keyboard('jobTitle');
    await userEvent.click(departmentInput);
    await userEvent.keyboard('department');
    await userEvent.click(emailInput);
    await userEvent.keyboard('email');
    await userEvent.click(phoneInput);
    await userEvent.keyboard('07777777777');
    await userEvent.click(notesInput);
    await userEvent.keyboard('notes');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(navigate).not.toHaveBeenCalled();
    });

    const errorMessage = queryByText(
      'Enter the email address in the correct format, like team@donatetoeducate.org.uk'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('should handle error on API call', async () => {
    const state = {
      la: 'test la',
      id: '12345',
    };
    server.use(setupFailedNetworkRequest());
    const Component = createWrapperWithState(<LocalAuthoritySignUp />, state);
    const { getByRole, findByRole } = render(<Component />);

    const firstNameInput = getByRole('textbox', { name: 'firstName' });
    const lastNameInput = getByRole('textbox', { name: 'lastName' });
    const jobTitleInput = getByRole('textbox', { name: 'jobTitle' });
    const departmentInput = getByRole('textbox', { name: 'department' });
    const emailInput = getByRole('textbox', { name: 'email' });
    const phoneInput = getByRole('textbox', { name: 'phone' });
    const notesInput = getByRole('textbox', { name: 'notes' });
    const submitButton = getByRole('button', { name: 'create account' });

    await userEvent.click(firstNameInput);
    await userEvent.keyboard('firstName');
    await userEvent.click(lastNameInput);
    await userEvent.keyboard('lastName');
    await userEvent.click(jobTitleInput);
    await userEvent.keyboard('jobTitle');
    await userEvent.click(departmentInput);
    await userEvent.keyboard('department');
    await userEvent.click(emailInput);
    await userEvent.keyboard('email@test.com');
    await userEvent.click(phoneInput);
    await userEvent.keyboard('07777777777');
    await userEvent.click(notesInput);
    await userEvent.keyboard('notes');
    await userEvent.click(submitButton);

    const header = await findByRole('heading', { level: 3 });
    expect(header).toHaveTextContent('Something went wrong');
  });
});
