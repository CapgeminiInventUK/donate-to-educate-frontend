import { createWrapper } from '@/mocks/mockGraphqlClient';
import NoLocalOrganisations from '../NoLocalOrganisations';
import { render } from '@testing-library/react';

describe('No local organisations', () => {
  it('should render component', () => {
    const Component = createWrapper(<NoLocalOrganisations />);
    expect(render(<Component />)).toMatchSnapshot();
  });
});
