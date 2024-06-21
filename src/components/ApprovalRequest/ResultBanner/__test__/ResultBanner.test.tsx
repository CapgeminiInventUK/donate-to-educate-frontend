import { render } from '@testing-library/react';
import ResultBanner from '../ResultBanner';

describe('Result banner', () => {
  it('should render result banner for institution approval', () => {
    const { queryByText } = render(<ResultBanner type="approved" name="name" />);
    const header = queryByText('Name has joined Donate to Educate');
    const body = queryByText("We've emailed them the results.");
    expect(header).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });

  it('should render result banner for declined institution', () => {
    const { queryByText } = render(<ResultBanner type="declined" name="name" />);
    const header = queryByText('You have declined this request to join');
    const body = queryByText("We've emailed them the results.");
    expect(header).toBeInTheDocument();
    expect(body).toBeInTheDocument();
  });
});
