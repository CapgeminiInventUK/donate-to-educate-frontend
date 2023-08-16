import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import NavLinks from './NavLinks';

describe('navlinks component', () => {
  it('should correctly render the links', () => {
    const { queryByText } = render(
      <Router>
        <NavLinks theme="midBlue" />
      </Router>
    );

    expect(queryByText('Home')).toBeInTheDocument();
    expect(queryByText('About us')).toBeInTheDocument();
    expect(queryByText('Contact us')).toBeInTheDocument();
    expect(queryByText('Donate (coming soon)')).toBeInTheDocument();
  });
});
