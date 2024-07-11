import { render } from '@testing-library/react';
import ProductTypeIcon from '../ProductTypeIcon';

describe('Product type icon', () => {
  it('should render component', () => {
    expect(render(<ProductTypeIcon colour="#00B6A8" productType={1} />)).toMatchSnapshot();
  });
});
