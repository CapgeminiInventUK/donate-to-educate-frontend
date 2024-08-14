import { createWrapperWithState } from '@/mocks/mockGraphqlClient';
import ItemSelection from '../ItemSelection';
import { render } from '@testing-library/react';
import * as router from 'react-router';
import userEvent from '@testing-library/user-event';
import styles from '../../FormButton/FormButton.module.scss';
import { InstitutionType } from '@/types/data';

const navigate = vi.fn();

beforeEach(() => {
  vi.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('Item selection', () => {
  const props = {
    items: {
      0: ['Blazers', 'Jumpers'],
      2: ['Triangles'],
    },
    actionText:
      "Once we have your request for the products you need, we'll contact you to arrange the next steps as soon as we can.",
    whatToExpect:
      'View the products we have in stock. While we update our stock levels regularly, they may change daily.',
    id: '123456',
    name: 'Test name',
    postcode: 'TE57 9OD',
  };

  const state = {
    type: 'tick',
  };

  it('should render component and handle button click', async () => {
    const Component = createWrapperWithState(
      <ItemSelection {...props} schoolOrCharity={InstitutionType.SCHOOL} previewMode={false} />,
      state
    );
    const { getByRole } = render(<Component />);
    const button = getByRole('button', { name: 'contact' });
    await userEvent.click(button);

    expect(navigate).toHaveBeenCalled();
  });

  it('should disable button if in preview mode', () => {
    const Component = createWrapperWithState(
      <ItemSelection {...props} schoolOrCharity={InstitutionType.SCHOOL} previewMode={true} />,
      state
    );
    const { getByRole } = render(<Component />);
    const button = getByRole('button', { name: 'contact' });

    expect(button).toHaveClass(styles.formButtonGreenDisabled);
    expect(button).toBeDisabled();
  });
});
