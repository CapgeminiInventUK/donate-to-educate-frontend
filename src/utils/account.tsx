import Paths from '@/config/paths';
import {
  AccountType,
  DeleteAccountType,
  InstitutionType,
  DeclineDeleteModalContent,
  UserDetails,
  DeniedModalContent,
} from '@/types/data';
import {
  capitaliseFirstLetter,
  checkForStringAndReturnEmptyIfFalsy,
  splitAtLastHyphen,
} from './globals';
import { deleteCharityProfile, deleteSchoolProfile } from '@/graphql/mutations';
import { getCharityUsers, getLocalAuthorityUsers, getSchoolUsers } from '@/graphql/queries';
import { deleteUser } from 'aws-amplify/auth';
import AlertCircleRed from '@/assets/warning/AlertCircleRed';

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

export const getSentenceCaseAccountType = (type?: AccountType): string =>
  String(type) === 'localAuthority' ? 'local authority' : String(type);

export const getDeleteTableData = (
  type?: AccountType,
  institutionName?: string,
  email?: string
): Record<string, string> => {
  const typename = capitaliseFirstLetter(getSentenceCaseAccountType(type));
  return {
    [typename]:
      type === InstitutionType.SCHOOL
        ? splitAtLastHyphen(String(institutionName))
        : String(institutionName),
    'Your account': checkForStringAndReturnEmptyIfFalsy(email),
  };
};

export const getDeleteTableDataMultipleUsers = (
  userData: UserDetails[],
  type: AccountType
): Record<string, string> => {
  const tableData = userData.reduce((acc, user) => {
    return { ...acc, [getNameFromUserObject(user)]: user.email };
  }, {});
  if (type === 'localAuthority') {
    return tableData;
  }
  return { [capitaliseFirstLetter(type)]: userData[0].institutionName, ...tableData };
};

export const getDeleteProfileQueryFromType = (type?: AccountType): string =>
  type === 'school' ? deleteSchoolProfile : type === 'charity' ? deleteCharityProfile : '';

export const getGetUsersQueryFromType = (type?: AccountType): string =>
  type === 'localAuthority'
    ? getLocalAuthorityUsers
    : type === 'school'
      ? getSchoolUsers
      : getCharityUsers;

export async function removeUser(): Promise<void> {
  try {
    await deleteUser();
  } catch (error) {
    throw new Error(String(error));
  }
}

export const getDeleteAccountModalText = (
  accountType: AccountType,
  deleteType: DeleteAccountType,
  userCount: number,
  institutionName: string,
  name?: string
): DeclineDeleteModalContent => {
  const icon = <AlertCircleRed />;
  const isLocalAuthority = accountType === 'localAuthority';
  switch (deleteType) {
    case DeleteAccountType.PROFILE:
      return {
        bodyText: `We will email the users associated with this profile to let them know that the ${accountType} has been deleted and they have been removed.`,
        confirmText: `Delete ${accountType}`,
        deleteButtonTheme: 'formButtonDanger',
        header: `Are you sure you want to delete ${institutionName}?`,
        subHeader: `This ${accountType} and its data will be deleted from Donate to Educate.`,
        icon,
      };
    case DeleteAccountType.ADMIN_USER:
      if (userCount === 1) {
        const bodyText = isLocalAuthority
          ? 'If you remove them Donate to Educate will need to manage this local authority until a replacement is found. \n\nWe will email the user to let them know that they have been removed.'
          : `If you remove them, this ${accountType} will also be deleted. We will email the user to let them know.`;
        const confirmText = isLocalAuthority ? 'Remove and self-manage' : `Delete account`;
        return {
          bodyText,
          confirmText,
          deleteButtonTheme: 'formButtonDanger',
          header: `Are you sure you want to delete this account?`,
          subHeader: `You do not have any additional users to manage this ${getSentenceCaseAccountType(accountType)}.`,
          icon,
        };
      }
      return {
        bodyText: `We will email the user to let them know that they have been deleted.`,
        confirmText: `Delete user`,
        deleteButtonTheme: 'formButtonDanger',
        header: `Are you sure you want to delete ${name}?`,
      };
    case DeleteAccountType.SELF_USER: {
      const header = 'Are you sure you want to delete your account?';
      const confirmText = 'Delete account';
      const deleteButtonTheme = 'formButtonDanger';
      if (userCount > 2) {
        return {
          header,
          confirmText,
          deleteButtonTheme,
          icon,
        };
      }
      const bodyText = isLocalAuthority
        ? 'If you remove your profile, Donate to Educate will temporarily manage your local authority.'
        : `If you delete your profile without finding a new user, the ${accountType} will also be deleted.`;
      return {
        bodyText,
        confirmText,
        deleteButtonTheme,
        header,
        subHeader: `You do not have an additional user to manage your ${getSentenceCaseAccountType(accountType)}`,
        icon,
      };
    }
  }
};

export const getDeniedModalContent = (
  users: UserDetails[],
  currentUser: UserDetails,
  type: AccountType
): DeniedModalContent => {
  const otherUsers = users.filter(({ email }) => email !== currentUser.email);
  const body = `You cannot delete your ${type} as there is more than one user associated with it. When there is only one user managing the ${type}, then the ${type} can be deleted.\n\nIt is recommended that you contact us if you need additional help.`;
  if (type === 'localAuthority') {
    return {
      header: 'Contact us',
      body: 'Deleting your local authority will have a knock-on affect with associated schools and charities that operate within your local authority.\n\nIt is recommended that you contact us to discuss next steps.',
    };
  }
  if (otherUsers.length === 1) {
    const name = getNameFromUserObject(otherUsers[0]);
    return {
      header: `${name} still has an account at this ${type}`,
      body,
    };
  }
  return {
    header: `There are still other accounts registered to this ${type}`,
    body,
  };
};
