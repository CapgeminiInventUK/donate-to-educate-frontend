import Paths from '@/config/paths';
import { AccountType } from '@/hooks/useCheckCurrentUser';

export const getRedirectUrl = (type: AccountType): string => {
  switch (type) {
    case 'admin':
      return Paths.ADMIN_DASHBOARD;
    case 'localAuthority':
      return Paths.LOCAL_AUTHORITY_DASHBOARD;
    // TODO need to link to the relevant dashboard when built
    case 'school':
    case 'charity':
    default:
      throw new Error(`Unknown account type ${type}`);
  }
};
