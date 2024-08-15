import { InstitutionType } from '@/types/data';
import { getButtonTextFromType, getKeyFromType, getPageContent } from '../utils';

describe('utils', () => {
  describe('getButtonTextFromType', () => {
    const inputVsExpected = [
      { type: 'tick', returnText: 'Request products' },
      { type: 'heart', returnText: 'Donate products' },
      { type: 'plus', returnText: 'Take extra stock' },
    ];
    it.each(inputVsExpected)('should return correct text', ({ type, returnText }) => {
      expect(getButtonTextFromType(type)).toBe(returnText);
    });

    it('should throw an error when unexpected type passed', () => {
      expect(() => getButtonTextFromType('unexpected')).toThrow('Unknown type unexpected');
    });
  });

  describe('getKeyFromType', () => {
    it('should throw an error when unexpected type passed', () => {
      expect(() => getKeyFromType('unexpected')).toThrow('Unknown type unexpected');
    });
  });

  describe('getPageContent', () => {
    it('should throw an error when unexpected type passed', () => {
      expect(() => getPageContent('unexpected', InstitutionType.CHARITY)).toThrow(
        'Unknown type unexpected'
      );
    });
  });
});
