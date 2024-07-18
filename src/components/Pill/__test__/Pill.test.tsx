import { PillColours } from '@/types/data';
import { render } from '@testing-library/react';
import { Pill } from '../Pill';

describe('Pill', () => {
  const inputVsExpected = [
    { colour: PillColours.GREEN, text: 'STOCK AVAILABLE' },
    { colour: PillColours.BLUE, text: 'EXCESS STOCK' },
    { colour: PillColours.YELLOW, text: 'LOW STOCK' },
    { colour: PillColours.GREY, text: 'SCHOOL NOT REGISTERED' },
    { colour: PillColours.RED, text: 'OUT OF STOCK' },
    { colour: PillColours.LIGHTBLUE, text: '' },
  ];
  it.each(inputVsExpected)(
    'should render the correct text from given colour',
    ({ colour, text }) => {
      const { getByLabelText } = render(<Pill colour={colour} />);
      expect(getByLabelText('pill')).toHaveTextContent(text);
    }
  );

  it('should render a pill with given text', () => {
    const { getByLabelText } = render(<Pill colour={PillColours.GREEN} text="Test text" />);
    expect(getByLabelText('pill')).toHaveTextContent('Test text');
  });
});
