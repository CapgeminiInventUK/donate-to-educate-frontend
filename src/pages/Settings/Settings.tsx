import { FC, useEffect, useState } from 'react';
import styles from './Settings.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useStore } from '@/stores/useStore';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import {
  GetCharityUserQuery,
  GetCharityUsersQuery,
  GetLocalAuthorityUserQuery,
  GetLocalAuthorityUsersQuery,
  GetSchoolUserQuery,
  GetSchoolUsersQuery,
} from '@/types/api';
import { GraphQLQuery } from 'aws-amplify/api';
import { getCharityUser, getLocalAuthorityUser, getSchoolUser } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import { AccountType, AdminUserResultType, InstitutionType, UserDetails } from '@/types/data';
import {
  getGetUsersQueryFromType,
  getUserDetailsObjectFromQuery,
  removeUser,
} from '@/utils/account';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import ManageInstitutionSection from './ManageInstitutionSection';
import ManageDetailsSection from './ManageDetailsSection';
import DangerZone from './DangerZone';
import PostcodeEdit from './PostcodeEdit';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import ResultBanner from '@/components/AddUserForm/ResultBanner';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';

const Settings: FC = () => {
  const loginState = useStore((state) => state);
  const navigate = useNavigate();
  const { email, type, name, id } = useStore((state) => state.user) ?? {};
  const { state } = useLocationStateOrRedirect<{ postcode: string; localAuthority?: string }>();
  const [adminUserResultType, setAdminUserResultType] = useState<AdminUserResultType>();

  const query =
    type === 'localAuthority'
      ? getLocalAuthorityUser
      : type === 'school'
        ? getSchoolUser
        : getCharityUser;

  const { isLoading, data, isError } = useQuery({
    queryKey: [`get-${type}-user-${email}`],
    queryFn: async () => {
      const { data } = await client.graphql<
        GraphQLQuery<GetLocalAuthorityUserQuery | GetCharityUserQuery | GetSchoolUserQuery>
      >({
        query: query,
        variables: {
          email,
        },
      });

      return data;
    },
  });

  const {
    isLoading: usersIsLoading,
    data: usersData,
    isError: usersIsError,
    refetch,
  } = useQuery({
    queryKey: [`get-${type}-users-${id}`],
    queryFn: async () => {
      const { data } = await client.graphql<
        GraphQLQuery<GetLocalAuthorityUsersQuery | GetCharityUsersQuery | GetSchoolUsersQuery>
      >({
        query: getGetUsersQueryFromType(type as AccountType),
        variables: {
          id,
        },
      });
      return data;
    },
  });

  useEffect(() => {
    void refetch();
  }, []);

  if (isLoading || usersIsLoading) {
    return <Spinner />;
  }

  if (isError || usersIsError) {
    return <ErrorBanner />;
  }

  const userData =
    data &&
    getUserDetailsObjectFromQuery(
      Object.values(data).map((value) => value as UserDetails)[0],
      type
    );

  const allUsers: UserDetails[] = usersData
    ? Object.values(usersData).map((value) => value as UserDetails[])[0]
    : [];

  if (!userData?.name) {
    return <Spinner />;
  }

  const logoutCallback = (): void => {
    void removeUser();
    void loginState.logout();
    navigate(Paths.HOME);
  };

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <BackButton theme="blue" />
      </div>
      {adminUserResultType ? (
        <ResultBanner
          type={adminUserResultType}
          linkText="Return to Donate to Educate"
          onLinkClick={logoutCallback}
          name={userData?.institutionName}
        />
      ) : (
        <div className={styles.settingsCard}>
          <div className={styles.header}>
            <h1>Settings</h1>
          </div>
          <div className={styles.body}>
            {type === InstitutionType.CHARITY && (
              <PostcodeEdit
                postcode={state.postcode}
                name={checkForStringAndReturnEmptyIfFalsy(name)}
              />
            )}
            {type && <ManageDetailsSection userData={userData} type={type} />}
            <ManageInstitutionSection
              type={type}
              allUsers={allUsers}
              localAuthority={state?.localAuthority}
            />
            {type && (
              <DangerZone
                userData={userData}
                type={type}
                allUsers={allUsers}
                setAdminUserResultType={setAdminUserResultType}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
