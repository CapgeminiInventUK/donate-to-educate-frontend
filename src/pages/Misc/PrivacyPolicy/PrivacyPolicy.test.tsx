import { create } from 'react-test-renderer';

import PrivacyPolicy from './PrivacyPolicy';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders correctly', () => {
  const tree = create(
    <Router>
      <PrivacyPolicy />
    </Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
