import { createWrapper } from '@/mocks/mockGraphqlClient';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as router from 'react-router';
import ClickableLogo from '../ClickableLogo';

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
