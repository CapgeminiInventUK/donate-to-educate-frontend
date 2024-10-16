import { createWrapper } from '@/mocks/mockGraphqlClient';
import * as router from 'react-router';
import RequestItems from '../RequestItems';
import { fireEvent, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getTextContent } from '../utils';
import { InstitutionType } from '@/types/data';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('Request items', () => {
  it('should disable submit button until all fields completed - school', async () => {
    const Component = createWrapper(
      <RequestItems
        type={'tick'}
        organisationType={InstitutionType.SCHOOL}
        id={'123456'}
        name={'Test School'}
      />
    );

    const { getAllByRole, getByRole } = render(<Component />);

    const radio = getAllByRole('radio')[0];
    const inputs = getAllByRole('textbox');
    const submitButton = getByRole('button', { name: 'submit' });

    expect(submitButton).toBeDisabled();

    await userEvent.click(radio);
    await userEvent.click(inputs[0]);
    await userEvent.keyboard('Name');
    await userEvent.click(inputs[1]);
    await userEvent.keyboard('email@test.com');
    await userEvent.click(inputs[2]);
    await userEvent.keyboard('07777777777');
    await userEvent.click(inputs[3]);
    await userEvent.keyboard('message');

    expect(submitButton).not.toBeDisabled();

    await waitFor(() => {
      fireEvent.click(submitButton);
    });
  });

  it('should conditionally render the somethingElse field - charity', async () => {
    const Component = createWrapper(
      <RequestItems
        type={'plus'}
        organisationType={InstitutionType.CHARITY}
        id={'123456'}
        name={'Test Charity'}
      />
    );

    const { getAllByRole, getByRole } = render(<Component />);

    const radio = getAllByRole('radio')[3];
    await userEvent.click(radio);
    const submitButton = getByRole('button', { name: 'submit' });
    expect(submitButton).toBeDisabled();

    const inputs = getAllByRole('textbox');

    expect(inputs[0]).toHaveAccessibleName('connection');

    await userEvent.click(inputs[0]);
    await userEvent.keyboard('Connection');
    await userEvent.click(inputs[1]);
    await userEvent.keyboard('Name');
    await userEvent.click(inputs[2]);
    await userEvent.keyboard('email@test.com');
    await userEvent.click(inputs[3]);
    await userEvent.keyboard('07777777777');
    await userEvent.click(inputs[4]);
    await userEvent.keyboard('message');

    expect(submitButton).not.toBeDisabled();

    await waitFor(() => {
      fireEvent.click(submitButton);
    });
  });

  it('should handle a submission error', async () => {
    const Component = createWrapper(
      <RequestItems
        type={'heart'}
        organisationType={InstitutionType.CHARITY}
        id={'error'}
        name={'Test Charity'}
      />
    );

    const { getAllByRole, getByRole, findByText } = render(<Component />);

    const radio = getAllByRole('radio')[0];
    const inputs = getAllByRole('textbox');
    const submitButton = getByRole('button', { name: 'submit' });

    expect(submitButton).toBeDisabled();

    await userEvent.click(radio);
    await userEvent.click(inputs[0]);
    await userEvent.keyboard('Name');
    await userEvent.click(inputs[1]);
    await userEvent.keyboard('email@test.com');
    await userEvent.click(inputs[2]);
    await userEvent.keyboard('07777777777');
    await userEvent.click(inputs[3]);
    await userEvent.keyboard('message');

    expect(submitButton).not.toBeDisabled();

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    const errorMessage = await findByText('Something went wrong');
    expect(errorMessage).toBeInTheDocument();
  });

  it('should display a form validation error', async () => {
    const Component = createWrapper(
      <RequestItems
        type={'heart'}
        organisationType={InstitutionType.CHARITY}
        id={'123456'}
        name={'Test Charity'}
      />
    );

    const { getAllByRole, getByRole, findByText } = render(<Component />);

    const radio = getAllByRole('radio')[0];
    const inputs = getAllByRole('textbox');
    const submitButton = getByRole('button', { name: 'submit' });

    await userEvent.click(radio);
    await userEvent.click(inputs[0]);
    await userEvent.keyboard('Name');
    await userEvent.click(inputs[1]);
    await userEvent.keyboard('email incorrect');
    await userEvent.click(inputs[2]);
    await userEvent.keyboard('07777777777');
    await userEvent.click(inputs[3]);
    await userEvent.keyboard('message');

    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    const errorMessage = await findByText('There is a problem');
    expect(errorMessage).toBeInTheDocument();
  });
});

describe('get text content', () => {
  it('should return the correct text content', () => {
    expect(getTextContent('tick', InstitutionType.CHARITY).subHeading).toBe(
      'Contact us and tell us what things you need. We will reply to you as soon as we can.'
    );
    expect(getTextContent('heart', InstitutionType.SCHOOL).subHeading).toBe(
      "Tell us which things you'd like to donate and we'll contact you to arrange the next steps as soon as we can."
    );
  });
});
