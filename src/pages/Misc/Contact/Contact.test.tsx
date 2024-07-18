import { create } from 'react-test-renderer';

import { BrowserRouter as Router } from 'react-router-dom';
import Contact from './Contact';

it('renders correctly', () => {
  const tree = create(
    <Router>
      <Contact />
    </Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
