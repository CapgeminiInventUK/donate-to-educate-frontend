import { render } from '@testing-library/react';
import DeleteConfirmationBanner from '../DeleteConfirmationBanner';
import { createWrapper } from '@/mocks/mockGraphqlClient';

describe('Delete confirmation', () => {
  it('should render component', () => {
    const Component = createWrapper(<DeleteConfirmationBanner />);
    const deleteConfirmationBanner = render(<Component />);
    expect(deleteConfirmationBanner).toMatchSnapshot();
  });
});
