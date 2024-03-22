import { create } from 'react-test-renderer';

import SomethingWentWrong from './SomethingWentWrong';

it('renders correctly', () => {
  const tree = create(<SomethingWentWrong errorBoundary="Router" />).toJSON();
  expect(tree).toMatchSnapshot();
});
