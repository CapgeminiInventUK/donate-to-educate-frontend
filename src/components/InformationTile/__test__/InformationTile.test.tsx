import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InformationTile from '../InformationTile';

describe('Information tile', () => {
  it('should not render button if no on click handler passed as a prop', () => {
    const { queryByRole } = render(<InformationTile heading="heading" subtext="subtext" />);
    expect(queryByRole('button')).not.toBeInTheDocument();
  });
  it('should render button and handle click if on click handler passed as a prop', async () => {
    const dismiss = vi.fn();
    const { getByRole } = render(
      <InformationTile heading="heading" subtext="subtext" dismiss={dismiss} />
    );
    const button = getByRole('button');
    await userEvent.click(button);
    expect(dismiss).toHaveBeenCalled();
  });
});
