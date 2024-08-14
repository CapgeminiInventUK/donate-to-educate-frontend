import Paths from '@/config/paths';
import { getRedirectUrl } from '../account';
import { AccountType, InstitutionType } from '@/types/data';

describe('getRedirectUrl', () => {
  const inputVsExpectedWithProfile = [
    { type: 'admin', path: Paths.ADMIN_DASHBOARD },
    { type: 'localAuthority', path: Paths.LOCAL_AUTHORITY_DASHBOARD },
    { type: InstitutionType.SCHOOL, path: Paths.SCHOOL_VIEW },
    { type: InstitutionType.CHARITY, path: Paths.CHARITIES_VIEW },
  ];

  it.each(inputVsExpectedWithProfile)(
    'should return the correct path based on the input type when user has profile',
    ({ type, path }) => {
      expect(getRedirectUrl(type as AccountType, true)).toBe(path);
    }
  );

  const inputVsExpectedWithoutProfile = [
    { type: InstitutionType.SCHOOL, path: Paths.SCHOOLS_CREATE_EDIT_PROFILE },
    { type: InstitutionType.CHARITY, path: Paths.CHARITIES_CREATE_EDIT_PROFILE },
  ];

  it.each(inputVsExpectedWithoutProfile)(
    'should return the correct path based on the input type when user does not have profile',
    ({ type, path }) => {
      expect(getRedirectUrl(type as AccountType, false)).toBe(path);
    }
  );

  it('should throw an error when type is not an account type', () => {
    expect(() => getRedirectUrl('error type' as AccountType, false)).toThrow(
      'Unknown account type error type'
    );
  });
});
