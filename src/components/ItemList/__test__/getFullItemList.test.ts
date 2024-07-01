import { convertNumberToCategory } from '../getFullItemList';

describe('convertNumberToCategory', () => {
  const inputVsExpected = [
    { number: 0, itemType: 'Clothing and uniform' },
    { number: 1, itemType: 'Sports' },
    { number: 2, itemType: 'Art and music' },
    { number: 3, itemType: 'Study' },
    { number: 4, itemType: 'Toiletries' },
    { number: 5, itemType: 'Computing and technology' },
  ];
  it.each(inputVsExpected)('should return the correct itemType', ({ number, itemType }) => {
    expect(convertNumberToCategory(number)).toEqual(itemType);
  });

  it('should throw an error when number does not index itemType', () => {
    expect(() => convertNumberToCategory(6)).toThrow('Invalid category number 6');
  });
});
