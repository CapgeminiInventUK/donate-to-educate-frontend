import { render } from '@testing-library/react';
import PublicView from '../PublicView';
import { schoolBanner } from './mockData';
import { createWrapper } from '@/mocks/mockGraphqlClient';
import { InstitutionType } from '@/types/data';

describe('Public View', () => {
  it('should show uniform policy link if type is school and exists in banner', () => {
    const Component = createWrapper(
      <PublicView banner={schoolBanner} type={InstitutionType.SCHOOL} />
    );
    const { getByRole } = render(<Component />);
    const uniformLink = getByRole('link', { name: 'View uniform policy' });
    expect(uniformLink).toBeInTheDocument();
  });
});
