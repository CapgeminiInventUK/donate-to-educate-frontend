import { createWrapper } from '@/mocks/mockGraphqlClient';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as router from 'react-router';
import BackButton from '../BackButton';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('BackButton', () => {
  const onClick = vi.fn();
  it('should apply classname if passed to component', () => {
    const Component = createWrapper(<BackButton className={'testClass'} theme="white" />);
    const { getByRole } = render(<Component />);
    const button = getByRole('button');
    expect(button).toHaveClass('testClass');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should call onClick when button clicked if passed', async () => {
    const Component = createWrapper(<BackButton onClick={onClick} theme="white" />);
    const { getByRole } = render(<Component />);
    const button = getByRole('button');

    await userEvent.click(button);

    expect(button).not.toHaveClass('testClass');
    expect(onClick).toHaveBeenCalled();
  });

  it('should call useNavigate if no onClick function passed to component', async () => {
    const Component = createWrapper(<BackButton theme="white" />);
    const { getByRole } = render(<Component />);
    const button = getByRole('button');

    await userEvent.click(button);

    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
