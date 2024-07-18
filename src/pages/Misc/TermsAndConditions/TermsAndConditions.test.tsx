import { create } from 'react-test-renderer';

import { BrowserRouter as Router } from 'react-router-dom';
import TermsAndConditions from './TermsAndConditions';

it('renders correctly', () => {
  const tree = create(
    <Router>
      <TermsAndConditions />
    </Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
