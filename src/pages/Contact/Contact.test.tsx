import { create } from 'react-test-renderer';

import Contact from './Contact';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders correctly', () => {
  const tree = create(
    <Router>
      <Contact />
    </Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
