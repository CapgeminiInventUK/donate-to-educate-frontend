import Paths from '@/config/paths';
import { paramedRoute } from '../routeUtils';

describe('route utils', () => {
  describe('paramedRoute', () => {
    it('replaces keys with values', () => {
      const result = paramedRoute(Paths.LOCAL_AUTHORITY_DASHBOARD_PRODUCTS, {
        laName: 'West Midlands',
      });

      expect(result).toBe('/local-authority/West%20Midlands/products');
    });
  });
});
