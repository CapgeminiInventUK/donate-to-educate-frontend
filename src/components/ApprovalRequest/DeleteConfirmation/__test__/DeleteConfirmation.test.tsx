import { render } from '@testing-library/react';
import DeleteConfirmation from '../DeleteConfirmation';
import { createWrapper } from '@/mocks/mockGraphqlClient';

describe('Delete confirmation', () => {
  it('should render component', () => {
    const Component = createWrapper(<DeleteConfirmation />);
    const deleteConfirmation = render(<Component />);
    expect(deleteConfirmation).toMatchSnapshot();
  });
});
