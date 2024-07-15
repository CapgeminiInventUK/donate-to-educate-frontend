import { render } from '@testing-library/react';
import LoginBanner from '../LoginBanner';

describe('Login banner', () => {
  it('should render component', () => {
    expect(render(<LoginBanner />)).toMatchSnapshot();
  });
});
