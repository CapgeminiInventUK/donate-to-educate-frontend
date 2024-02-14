import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import NavLinks from './NavLinks';

describe('navlinks component', () => {
  it('should correctly render the links', () => {
    const { queryAllByText, queryByText } = render(
      <Router>
        <NavLinks theme="midBlue" />
      </Router>
    );

    expect(queryByText('Home')).toBeInTheDocument();
    expect(queryAllByText('About')[0]).toBeInTheDocument();
    expect(queryByText('Find your community')).toBeInTheDocument();
    expect(queryByText('Contact')).toBeInTheDocument();
  });
});
