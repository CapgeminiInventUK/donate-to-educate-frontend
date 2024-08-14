import Paths from '@/config/paths';
import { getButtonTextFromType, getPathFromType, getTitleFromType } from '../getFromTypes';
import { InstitutionType } from '@/types/data';

describe('getFromTypes', () => {
  describe('getPathFromType', () => {
    const inputVsExpected = [
      { type: InstitutionType.SCHOOL, path: Paths.REQUEST_SCHOOL_PRODUCTS },
      { type: InstitutionType.CHARITY, path: Paths.REQUEST_CHARITY_PRODUCTS },
    ];

    it.each(inputVsExpected)('should return the correct path from given type', ({ type, path }) => {
      expect(getPathFromType(type)).toBe(path);
    });
  });

  describe('getTitleFromType', () => {
    const inputVsExpected = [
      { type: 'tick', buttonText: 'Request products' },
      { type: 'heart', buttonText: 'Donate products' },
      { type: 'plus', buttonText: 'Check extra stock' },
    ];

    it.each(inputVsExpected)('should return correct button text', ({ type, buttonText }) => {
      expect(getTitleFromType(type)).toBe(buttonText);
    });

    it('should throw an error if type does not match an option', () => {
      expect(() => getTitleFromType('error')).toThrow('Unknown type error');
    });
  });

  describe('getButtonTextFromType', () => {
    const inputVsExpected = [
      { type: 'tick', buttonText: 'Request products' },
      { type: 'heart', buttonText: 'Donate products' },
      { type: 'plus', buttonText: 'Take extra stock' },
    ];

    it.each(inputVsExpected)('should return correct button text', ({ type, buttonText }) => {
      expect(getButtonTextFromType(type)).toBe(buttonText);
    });

    it('should throw an error if type does not match an option', () => {
      expect(() => getButtonTextFromType('error')).toThrow('Unknown type error');
    });
  });
});
