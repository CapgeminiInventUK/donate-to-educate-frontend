import { createWrapper } from '@/mocks/mockGraphqlClient';
import ApprovalRequest from '../ApprovalRequest';
import { render, waitForElementToBeRemoved } from '@testing-library/react';
import { vi } from 'vitest';

describe('Approval Request component', () => {
  const user = {
    name: 'Jake Readman',
    title: 'asdfas',
    email: 'Jakereadman@gmail.com',
    phone: '+447595870150',
  };

  it('should render ApprovalRequest component', async () => {
    const Component = createWrapper(
      <ApprovalRequest
        setStage={vi.fn()}
        name={'Lyminster Primary School - BN17 7JZ'}
        type={'school'}
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
        type={'school'}
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
});
