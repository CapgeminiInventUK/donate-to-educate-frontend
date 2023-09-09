import { render } from '@testing-library/react';
import Carousel from './Carousel';
import { CarouselItem } from '@/types/data';

jest.useFakeTimers();

describe('Carousel', () => {
  const items: CarouselItem[] = [
    { title: 'Item 1', image: 'image1.jpg', colour: 'lightBlue' },
    { title: 'Item 2', image: 'image2.jpg', colour: 'midBlue' },
  ];

  it('renders without crashing', () => {
    render(<Carousel items={items} />);
  });

  it('renders correct number of items', () => {
    const { getAllByRole } = render(<Carousel items={items} />);
    expect(getAllByRole('img')).toHaveLength(items.length);
  });

  //   it('changes active item on arrow click', () => {
  //     const { getByTestId, getByAltText } = render(<Carousel items={items} />);
  //     const arrowLeft = getByTestId('arrow-left');
  //     const arrowRight = getByTestId('arrow-right');

  //     expect(getByAltText('Item 1')).toBeVisible();
  //     fireEvent.click(arrowRight);
  //     expect(getByAltText('Item 1')).not.toBeVisible();
  //     expect(getByAltText('Item 2')).toBeVisible();
  //     fireEvent.click(arrowLeft);
  //     expect(getByAltText('Item 2')).not.toBeVisible();
  //     expect(getByAltText('Item 1')).toBeVisible();
  //   });

  //   it('changes active item every 10 seconds', () => {
  //     render(<Carousel items={items} />);
  //     act(() => {
  //       jest.advanceTimersByTime(10000);
  //     });
  //     expect(setActive).toHaveBeenCalledWith(1);
  //   });
});
