import { createWrapperWithState } from '@/mocks/mockGraphqlClient';
import LocalAuthoritySignUpConfirmation from '../LocalAuthoritySignUpConfirmation';
import { render } from '@testing-library/react';

describe('Local authority signup confirmation', () => {
  it('should render component', () => {
    const state = { name: 'test name' };
    const Component = createWrapperWithState(<LocalAuthoritySignUpConfirmation />, state);
    expect(render(<Component />)).toMatchSnapshot();
  });
});
