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
  //     const { getByLabelText, getByAltText } = render(<Carousel items={items} />);
  //     const arrowLeft = getByLabelText('arrow-left');
  //     const arrowRight = getByLabelText('arrow-right');

  //     const itemOne = getByAltText('Item 1') as unknown as HTMLImageElement;
  //     const itemOneContainer = itemOne.parentElement?.parentElement;

  //     const itemTwo = getByAltText('Item 2') as unknown as HTMLImageElement;
  //     const itemTwoContainer = itemTwo.parentElement?.parentElement;

  //     expect(itemOneContainer).not.toHaveClass('hidden');
  //     expect(itemTwoContainer).toHaveClass('hidden');
  //     fireEvent.click(arrowLeft);

  //     expect(itemOneContainer).toHaveClass('hidden');
  //     expect(itemTwoContainer).not.toHaveClass('hidden');

  //     fireEvent.click(arrowRight);
  //     expect(itemOneContainer).not.toHaveClass('hidden');
  //     expect(itemTwoContainer).toHaveClass('hidden');
  //   });

  // it('changes active item every 10 seconds', () => {
  //   render(<Carousel items={items} />);
  //   act(() => {
  //     jest.advanceTimersByTime(10000);
  //   });
  //   expect(setActive).toHaveBeenCalledWith(1);
  // });
});
