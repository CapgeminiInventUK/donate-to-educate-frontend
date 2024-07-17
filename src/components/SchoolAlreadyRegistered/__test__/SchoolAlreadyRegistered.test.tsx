import { createWrapper } from '@/mocks/mockGraphqlClient';
import SchoolAlreadyRegistered from '../SchoolAlreadyRegistered';
import { render } from '@testing-library/react';

describe('School already registered', () => {
  it('should render component', () => {
    const Component = createWrapper(<SchoolAlreadyRegistered type="registered" />);
    expect(render(<Component />)).toMatchSnapshot();
  });
});
