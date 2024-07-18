import { createWrapper } from '@/mocks/mockGraphqlClient';
import { render } from '@testing-library/react';
import SchoolAlreadyRegistered from '../SchoolAlreadyRegistered';

describe('School already registered', () => {
  it('should render component', () => {
    const Component = createWrapper(<SchoolAlreadyRegistered type="registered" />);
    expect(render(<Component />)).toMatchSnapshot();
  });
});
