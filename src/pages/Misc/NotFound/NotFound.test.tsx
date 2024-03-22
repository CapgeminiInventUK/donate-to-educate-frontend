import { create } from 'react-test-renderer';

import NotFound from './NotFound';

it('renders correctly', () => {
  const tree = create(<NotFound />).toJSON();
  expect(tree).toMatchSnapshot();
});
