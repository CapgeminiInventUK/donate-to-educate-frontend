import { render } from '@testing-library/react';
import Footer from '../Footer';
import { createWrapper } from '@/mocks/mockGraphqlClient';

describe('Footer', () => {
  it('should render component', () => {
    const Component = createWrapper(<Footer />);
    const screen = render(<Component />);
    expect(screen).toMatchSnapshot();
  });
});
