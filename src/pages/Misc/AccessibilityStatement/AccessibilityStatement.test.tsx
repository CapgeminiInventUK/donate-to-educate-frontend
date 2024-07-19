import { create } from 'react-test-renderer';

import { BrowserRouter as Router } from 'react-router-dom';
import AccessibilityStatement from './AccessibilityStatement';

it('renders correctly', () => {
  const tree = create(
    <Router>
      <AccessibilityStatement />
    </Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
