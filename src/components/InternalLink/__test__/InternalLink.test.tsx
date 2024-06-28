import { createWrapper } from '@/mocks/mockGraphqlClient';
import * as router from 'react-router';
import InternalLink from '../InternalLink';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import styles from '@/components/Button/Button.module.scss';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('Internal link', () => {
  it('should navigate to given page on click', async () => {
    const Component = createWrapper(
      <InternalLink linkText="text" linkUrl="link-url" ariaLabel="label" colour="blue" />
    );
    const { getByRole } = render(<Component />);
    const button = getByRole('button');
    await userEvent.click(button);

    expect(navigate).toHaveBeenCalledWith('link-url');
  });

  it('should apply standard link classname when blue not passed as colour prop', () => {
    const Component = createWrapper(
      <InternalLink linkText="text" linkUrl="link-url" ariaLabel="label" colour="white" />
    );
    const { getByRole } = render(<Component />);
    const button = getByRole('button');
    expect(button).toHaveClass(styles.link);
  });
});
