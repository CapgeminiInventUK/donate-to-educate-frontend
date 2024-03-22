import { create } from 'react-test-renderer';

import AboutUs from './AboutUs';
import { BrowserRouter as Router } from 'react-router-dom';

it('renders correctly', () => {
  const tree = create(
    <Router>
      <AboutUs />
    </Router>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
