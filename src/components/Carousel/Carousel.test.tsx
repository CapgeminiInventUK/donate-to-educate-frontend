import { render, fireEvent, act } from '@testing-library/react';
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

  it('changes active item on arrow click', () => {
    const { getByLabelText, getByAltText, rerender } = render(<Carousel items={items} />);

    const checkVisibility = (itemNumber: number, shouldBeVisible: boolean): void => {
      const item = getByAltText(`Item ${itemNumber}`) as unknown as HTMLImageElement;
      const itemContainer = item.parentElement?.parentElement;
      if (shouldBeVisible) {
        expect(itemContainer).not.toHaveClass('hidden');
      } else {
        expect(itemContainer).toHaveClass('hidden');
      }
    };

    // Initial state
    checkVisibility(1, true);
    checkVisibility(2, false);

    // After clicking left arrow
    fireEvent.click(getByLabelText('arrow-left'));
    rerender(<Carousel items={items} />);
    checkVisibility(1, false);
    checkVisibility(2, true);

    // After clicking right arrow
    fireEvent.click(getByLabelText('arrow-right'));
    rerender(<Carousel items={items} />);
    checkVisibility(1, true);
    checkVisibility(2, false);
  });

  it('changes active item every 10 seconds', () => {
    const { getByAltText, rerender } = render(<Carousel items={items} />);

    const checkVisibility = (itemNumber: number, shouldBeVisible: boolean): void => {
      const item = getByAltText(`Item ${itemNumber}`) as unknown as HTMLImageElement;
      const itemContainer = item.parentElement?.parentElement;
      if (shouldBeVisible) {
        expect(itemContainer).not.toHaveClass('hidden');
      } else {
        expect(itemContainer).toHaveClass('hidden');
      }
    };

    // Initial state
    checkVisibility(1, true);
    checkVisibility(2, false);

    // After 10 seconds
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    rerender(<Carousel items={items} />);
    checkVisibility(1, false);
    checkVisibility(2, true);
  });
});
