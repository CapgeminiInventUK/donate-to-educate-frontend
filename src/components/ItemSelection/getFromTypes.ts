import Paths from '@/config/paths';

export const getPathFromType = (type: string): Paths =>
  type === 'school' ? Paths.REQUEST_SCHOOL_PRODUCTS : Paths.REQUEST_CHARITY_PRODUCTS;

export const getTitleFromType = (type: string): string => {
  switch (type) {
    case 'tick':
      return 'Request products';
    case 'heart':
      return 'Donate products';
    case 'plus':
      return 'Check extra stock';
    default:
      throw new Error(`Unknown type ${type}`);
  }
};

export const getButtonTextFromType = (type: string): string => {
  if (type === 'plus') {
    return 'Take extra stock';
  }
  return getTitleFromType(type);
};
