import { render } from '@testing-library/react';
import Button from '../Button';
import styles from '../Button.module.scss';

describe('Button component', () => {
  it('should apply classname if passed to component', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <Button
        onClick={onClick}
        theme={'darkBlue'}
        text={'Text'}
        ariaLabel={'label'}
        className={'testClass'}
        disabled={false}
      />
    );
    const button = getByRole('button');
    expect(button).toHaveClass('testClass');
  });

  it('should apply disabled class if button disabled', () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      <Button
        onClick={onClick}
        theme={'darkBlue'}
        text={'Text'}
        ariaLabel={'label'}
        disabled={true}
      />
    );
    const button = getByRole('button');
    expect(button).toHaveClass(styles.disabled);
  });
});
