import { convertMetresToMiles, convertMilesToMetres } from '../distance';

describe('convertMetresToMiles', () => {
  it('should correctly convert metres to miles', () => {
    expect(convertMetresToMiles(1000)).toBe('0.6');
  });
});

describe('convertMilesToMetres', () => {
  it('should correctly convert metres to miles', () => {
    expect(convertMilesToMetres(0.6216)).toBe('1000');
  });
});
