import { createWrapper } from '@/mocks/mockGraphqlClient';
import { render } from '@testing-library/react';
import NoLocalOrganisations from '../NoLocalOrganisations';

describe('No local organisations', () => {
  it('should render component', () => {
    const Component = createWrapper(<NoLocalOrganisations />);
    expect(render(<Component />)).toMatchSnapshot();
  });
});
