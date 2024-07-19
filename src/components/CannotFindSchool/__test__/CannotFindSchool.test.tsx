import { createWrapper } from '@/mocks/mockGraphqlClient';
import { render } from '@testing-library/react';
import CannotFindSchool from '../CannotFindSchool';

describe('Cannot find school', () => {
  it('should render component', () => {
    const Component = createWrapper(<CannotFindSchool />);
    const screen = render(<Component />);
    expect(screen).toMatchSnapshot();
  });
});
