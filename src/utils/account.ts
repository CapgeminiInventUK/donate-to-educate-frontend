import Paths from '@/config/paths';
import { AccountType } from '@/types/data';

export const getRedirectUrl = (type: AccountType): string => {
  switch (type) {
    case 'admin':
      return Paths.ADMIN_DASHBOARD;
    case 'localAuthority':
      return Paths.LOCAL_AUTHORITY_DASHBOARD;
    case 'school':
      return Paths.SCHOOLS_CREATE_EDIT_PROFILE;
    case 'charity':
      return Paths.CHARITIES_CREATE_EDIT_PROFILE;
    default:
      throw new Error(`Unknown account type ${type as string}`);
  }
};
