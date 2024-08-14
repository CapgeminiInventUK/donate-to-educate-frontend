import { createWrapper } from '@/mocks/mockGraphqlClient';
import ApprovalRequest from '../ApprovalRequest';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pillStyles from '../../Pill/Pill.module.scss';
import * as router from 'react-router';
import { InstitutionType } from '@/types/data';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('Approval Request component', () => {
  const user = {
    name: 'Test User',
    title: 'asdfas',
    email: 'test@test.com',
    phone: '+447595870150',
  };

  it('should render ApprovalRequest component', async () => {
    const Component = createWrapper(
      <ApprovalRequest
        setStage={vi.fn()}
        name={'Lyminster Primary School - BN17 7JZ'}
        type={InstitutionType.SCHOOL}
        la={'West Sussex'}
        user={user}
        id={'02085065-1dbb-428e-9dcd-bbfba974f1e7'}
        urn={'125927'}
      />
    );
    const { findByText, findByRole } = render(<Component />);
    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner).then(async () => {
      const element = await findByText('Lyminster Primary School');
      expect(element).toBeInTheDocument();
    });
  });

  it('should return error banner if school query returns an error', async () => {
    const Component = createWrapper(
      <ApprovalRequest
        setStage={vi.fn()}
        name={'Error name'}
        type={InstitutionType.SCHOOL}
        la={'West Sussex'}
        user={user}
        id={'02085065-1dbb-428e-9dcd-bbfba974f1e7'}
        urn={'125927'}
      />
    );
    const { findByText, findByRole } = render(<Component />);
    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner).then(async () => {
      const element = await findByText('Something went wrong');
      expect(element).toBeInTheDocument();
    });
  });

  it('should send update join request API call when approved', async () => {
    const Component = createWrapper(
      <ApprovalRequest
        setStage={vi.fn()}
        name={'Lyminster Primary School - BN17 7JZ'}
        type={InstitutionType.SCHOOL}
        la={'West Sussex'}
        user={user}
        id={'02085065-1dbb-428e-9dcd-bbfba974f1e7'}
        urn={'125927'}
      />
    );
    const { findByRole, findByText } = render(<Component />);
    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner);

    const approveButton = await findByRole('button', { name: 'confirm request' });

    await userEvent.click(approveButton);
    const resultBanner = await findByText('Test User has joined Donate to Educate');
    expect(resultBanner).toBeInTheDocument();
  });

  it('should send delete join request API call when declined', async () => {
    const Component = createWrapper(
      <ApprovalRequest
        setStage={vi.fn()}
        name={'Lyminster Primary School - BN17 7JZ'}
        type={InstitutionType.SCHOOL}
        la={'West Sussex'}
        user={user}
        id={'02085065-1dbb-428e-9dcd-bbfba974f1e7'}
        urn={'125927'}
      />
    );
    const { findByRole, findByLabelText, queryByText } = render(<Component />);
    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner);

    const declineButton = await findByRole('button', { name: 'decline request' });

    await userEvent.click(declineButton);

    const confirmDecline = await findByLabelText('confirm');
    await userEvent.click(confirmDecline).then(() => {
      const resultBanner = queryByText('Test User has joined Donate to Educate');
      expect(resultBanner).not.toBeInTheDocument();
    });
  });

  it('should render correct colour and text on pill when school passed to component', async () => {
    const Component = createWrapper(
      <ApprovalRequest
        setStage={vi.fn()}
        name={'Lyminster Primary School - BN17 7JZ'}
        type={InstitutionType.SCHOOL}
        la={'West Sussex'}
        user={user}
        id={'02085065-1dbb-428e-9dcd-bbfba974f1e7'}
        urn={'125927'}
      />
    );
    const { findByRole, queryByText } = render(<Component />);
    const spinner = await findByRole('img');
    expect(spinner).toBeInTheDocument();
    await waitForElementToBeRemoved(spinner);
    const pill = queryByText('SCHOOL');
    expect(pill).toHaveClass(pillStyles.blue);
  });

  it('should render correct colour and text on pill when charity passed to component', () => {
    const Component = createWrapper(
      <ApprovalRequest
        setStage={vi.fn()}
        name={'Test charity'}
        type={InstitutionType.CHARITY}
        la={'West Sussex'}
        user={user}
        id={'123456'}
        urn={'123456'}
      />
    );
    const { queryByText } = render(<Component />);
    const pill = queryByText('CHARITY OR VOLUNTEER GROUP');
    expect(pill).toHaveClass(pillStyles.lightBlue);
  });
});
