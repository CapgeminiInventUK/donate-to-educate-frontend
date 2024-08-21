import Paths from '@/config/paths';
import { AccountType, UserDetails } from '@/types/data';

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

export const getNameFromUserObject = ({ firstName, lastName, name }: UserDetails): string => {
  return firstName && lastName ? `${firstName} ${lastName}` : name;
};

export const getUserDetailsObjectFromQuery = (data: UserDetails, type?: string): UserDetails => {
  const name = getNameFromUserObject(data);
  return Object.entries(data).reduce(
    (acc, [key, value]) => {
      if (
        key === 'schoolName' ||
        key === 'charityName' ||
        (type === 'localAuthority' && key === 'name')
      ) {
        acc.institutionName = String(value);
        return acc;
      }
      if (key.toLowerCase().includes('id')) {
        acc.id = String(value);
      }
      if (key.toLowerCase().includes('name')) {
        return acc;
      }

      return { ...acc, [key]: String(value) };
    },
    { name, jobTitle: '', email: '', phone: '', institutionName: '', id: '' }
  );
};

export const getUserDataKey = (key: string): string => {
  if (key === 'Job title or role') {
    return 'jobTitle';
  }
  return key.toLowerCase();
};
