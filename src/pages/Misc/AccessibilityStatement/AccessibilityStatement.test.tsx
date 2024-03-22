import { create } from 'react-test-renderer';

import AccessibilityStatement from './AccessibilityStatement';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders correctly', () => {
  const tree = create(
    <Router>
      <AccessibilityStatement />
    </Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
