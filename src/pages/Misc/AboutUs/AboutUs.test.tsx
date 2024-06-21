import AboutUs from './AboutUs';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

it('renders correctly', () => {
  const tree = render(
    <Router>
      <AboutUs />
    </Router>
  );
  expect(tree).toMatchSnapshot();
});
