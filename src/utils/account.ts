import Paths from '@/config/paths';
import { AccountType } from '@/types/data';

export const getRedirectUrl = (type: AccountType, hasProfile: boolean): string => {
  switch (type) {
    case 'admin':
      return Paths.ADMIN_DASHBOARD;
    case 'localAuthority':
      return Paths.LOCAL_AUTHORITY_DASHBOARD;
    case 'school':
      return hasProfile ? Paths.SCHOOL_VIEW : Paths.SCHOOLS_CREATE_EDIT_PROFILE;
    case 'charity':
      return hasProfile ? Paths.CHARITIES_VIEW : Paths.CHARITIES_CREATE_EDIT_PROFILE;
    default:
      throw new Error(`Unknown account type ${type as string}`);
  }
};
