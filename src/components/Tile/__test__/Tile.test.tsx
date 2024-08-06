import { render } from '@testing-library/react';
import Tile from '../Tile';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  vi.resetAllMocks();
});

describe('Tile', () => {
  const props = {
    title: 'Your charity profile is active',
    body: ['View, edit and update your public facing profile.'],
    size: 'medium',
    noShadow: true,
    hoverScale: 1,
    titleLarge: true,
    children: <>children</>,
    icon: <></>,
  };
  it('should render component', () => {
    expect(render(<Tile {...props} />)).toMatchSnapshot();
  });

  it('should handle click', async () => {
    const onClick = vi.fn();
    const { getByLabelText } = render(
      <Tile onClick={onClick} {...props} noShadow={false} size={'small'} titleLarge={false} />
    );

    const tile = getByLabelText('tile');
    await userEvent.click(tile);

    expect(onClick).toHaveBeenCalled();
  });
});
