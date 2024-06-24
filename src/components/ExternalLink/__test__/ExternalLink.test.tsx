import { render } from '@testing-library/react';
import ExternalLink from '../ExternalLink';

describe('Internal link', () => {
  it('should render component', () => {
    const screen = render(
      <ExternalLink linkText={'linkText'} linkUrl={'linkUrl'} ariaLabel={'aria-label'} />
    );
    expect(screen).toMatchSnapshot();
  });
});
