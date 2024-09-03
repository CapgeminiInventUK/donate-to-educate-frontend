import { FC } from 'react';
import styles from './Settings.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useStore } from '@/stores/useStore';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GetCharityUserQuery, GetLocalAuthorityUserQuery, GetSchoolUserQuery } from '@/types/api';
import { GraphQLQuery } from 'aws-amplify/api';
import { getCharityUser, getLocalAuthorityUser, getSchoolUser } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import { InstitutionType, UserDetails } from '@/types/data';
import { getUserDetailsObjectFromQuery } from '@/utils/account';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
// import ManageInstitutionSection from './ManageInstitutionSection';
import ManageDetailsSection from './ManageDetailsSection';
import DangerZone from './DangerZone';
import PostcodeEdit from './PostcodeEdit';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';

const Settings: FC = () => {
  const { email, type, name } = useStore((state) => state.user) ?? {};
  const { state } = useLocationStateOrRedirect<{ postcode: string }>();

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

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorBanner />;
  }

  const userData =
    data &&
    getUserDetailsObjectFromQuery(
      Object.values(data).map((value) => value as UserDetails)[0],
      type
    );

  if (!userData?.name) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <BackButton theme="blue" />
      </div>
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
          {/* // TODO Add the below component when enabling multi accounts */}
          {/* <ManageInstitutionSection type={type} /> */}
          {type && <DangerZone userData={userData} type={type} />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
