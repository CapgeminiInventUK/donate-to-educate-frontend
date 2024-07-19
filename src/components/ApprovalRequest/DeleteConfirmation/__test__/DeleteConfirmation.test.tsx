import { createWrapper } from '@/mocks/mockGraphqlClient';
import { render } from '@testing-library/react';
import DeleteConfirmation from '../DeleteConfirmation';

describe('Delete confirmation', () => {
  it('should render component', () => {
    const Component = createWrapper(<DeleteConfirmation />);
    const deleteConfirmation = render(<Component />);
    expect(deleteConfirmation).toMatchSnapshot();
  });
});
