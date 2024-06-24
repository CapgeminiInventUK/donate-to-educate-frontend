import { createWrapper } from '@/mocks/mockGraphqlClient';
import ClickableLogo from '../ClickableLogo';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import * as router from 'react-router';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('Clickable logo', () => {
  it('should render blue logo', () => {
    const logo = createWrapper(<ClickableLogo colour="blue" className="" />);
    expect(logo).toMatchSnapshot();
  });

  it('should render white logo', () => {
    const logo = render(<ClickableLogo colour="white" className="whiteLogo" />);
    const svg = logo.getByLabelText('logo-white');
    expect(logo).toMatchSnapshot();
    expect(svg).toHaveClass('whiteLogo');
  });

  it('should handle click', async () => {
    const { getByLabelText } = render(<ClickableLogo colour="blue" className="" />);
    const logo = getByLabelText('logo-blue');
    await userEvent.click(logo);
    expect(navigate).toHaveBeenCalled();
  });
});
