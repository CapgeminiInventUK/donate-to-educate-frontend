import { render } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  it('should render component', () => {
    const screen = render(
      <Card>
        <span>Test content</span>
      </Card>
    );
    expect(screen).toMatchSnapshot();
  });
});
