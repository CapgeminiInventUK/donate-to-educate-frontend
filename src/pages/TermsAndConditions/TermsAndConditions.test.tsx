import { create } from 'react-test-renderer';

import TermsAndConditions from './TermsAndConditions';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders correctly', () => {
  const tree = create(
    <Router>
      <TermsAndConditions />
    </Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
