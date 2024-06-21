import { createWrapper } from '@/mocks/mockGraphqlClient';
import CannotFindSchool from '../CannotFindSchool';
import { render } from '@testing-library/react';

describe('Cannot find school', () => {
  it('should render component', () => {
    const Component = createWrapper(<CannotFindSchool />);
    const screen = render(<Component />);
    expect(screen).toMatchSnapshot();
  });
});
