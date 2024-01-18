import { create } from 'react-test-renderer';

import Spinner from './Spinner';

it('renders correctly', () => {
  const tree = create(<Spinner />).toJSON();
  expect(tree).toMatchSnapshot();
});
