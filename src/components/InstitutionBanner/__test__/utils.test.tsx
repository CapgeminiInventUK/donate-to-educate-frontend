import { getIcon, hasContactInfo } from '../utils';

describe('Institution banner utils', () => {
  describe('getIcon', () => {
    it('should return empty fragment when a non-banner key passed', () => {
      expect(getIcon('')).toEqual(<></>);
    });
  });

  describe('hasContactInfo', () => {
    const banner = {
      phone: undefined,
      email: undefined,
      website: undefined,
      uniformPolicy: undefined,
      address: undefined,
    };
    it('should return true if all banner properties are undefined but admin view is true', () => {
      expect(hasContactInfo(banner, true)).toBe(true);
    });

    it('should return false if all banner properties are undefined but admin view is not true', () => {
      expect(hasContactInfo(banner)).toBe(false);
    });
  });
});
