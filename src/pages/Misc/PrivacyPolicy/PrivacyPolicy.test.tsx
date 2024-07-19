import { create } from 'react-test-renderer';

import { BrowserRouter as Router } from 'react-router-dom';
import PrivacyPolicy from './PrivacyPolicy';

it('renders correctly', () => {
  const tree = create(
    <Router>
      <PrivacyPolicy />
    </Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
