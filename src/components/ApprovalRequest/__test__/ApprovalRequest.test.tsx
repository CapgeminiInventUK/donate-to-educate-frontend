import { createWrapper, mockApiResponse } from '@/mocks/mockGraphqlClient';
import ApprovalRequest from '../ApprovalRequest';
import { render } from '@testing-library/react';
import getSchoolQuery from '@/mocks/data/getSchoolQuery.json';
import { vi } from 'vitest';

describe('Approval Request component', () => {
  const user = {
    name: 'Jake Readman',
    title: 'asdfas',
    email: 'Jakereadman@gmail.com',
    phone: '+447595870150',
  };
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

  it('should render ApprovalRequest component', async () => {
    mockApiResponse('getSchool', getSchoolQuery, true);
    const { findByText } = render(<Component />);
    const element = await findByText('Lyminster Primary School');
    expect(element).toBeInTheDocument();
  });
});
