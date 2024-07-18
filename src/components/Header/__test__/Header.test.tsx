import { render } from '@testing-library/react';
import * as mediaQuery from 'react-responsive';
import Header from '../Header';

describe('Header', () => {
  it('should render header as h1 if size prop is normal and screen size is not small', () => {
    vi.spyOn(mediaQuery, 'useMediaQuery').mockImplementation(() => false);
    const { queryByRole } = render(
      <Header text={'text'} className={'className'} size={'normal'} />
    );
    const header = queryByRole('heading', { level: 1 });
    expect(header).toBeInTheDocument();
  });

  it('should render header as h2 if size prop is normal and screen size is small', () => {
    vi.spyOn(mediaQuery, 'useMediaQuery').mockImplementation(() => true);
    const { queryByRole } = render(
      <Header text={'text'} className={'className'} size={'normal'} />
    );
    const header = queryByRole('heading', { level: 2 });
    expect(header).toBeInTheDocument();
  });

  it('should render header as h2 if size prop is small and screen size is not small', () => {
    vi.spyOn(mediaQuery, 'useMediaQuery').mockImplementation(() => false);
    const { queryByRole } = render(<Header text={'text'} className={'className'} size={'small'} />);
    const header = queryByRole('heading', { level: 2 });
    expect(header).toBeInTheDocument();
  });

  it('should render header as h3 if size prop is normal and screen size is small', () => {
    vi.spyOn(mediaQuery, 'useMediaQuery').mockImplementation(() => true);
    const { queryByRole } = render(<Header text={'text'} className={'className'} size={'small'} />);
    const header = queryByRole('heading', { level: 3 });
    expect(header).toBeInTheDocument();
  });
});
