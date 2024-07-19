import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AboutUs from './AboutUs';

it('renders correctly', () => {
  const tree = render(
    <Router>
      <AboutUs />
    </Router>
  );
  expect(tree).toMatchSnapshot();
});
