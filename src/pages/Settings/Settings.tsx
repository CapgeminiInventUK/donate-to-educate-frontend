import { FC } from 'react';
import styles from './Settings.module.scss';
import InfoTable from '@/components/InfoTable/InfoTable';
import BackButton from '@/components/BackButton/BackButton';
import { useStore } from '@/stores/useStore';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GetCharityUserQuery, GetLocalAuthorityUserQuery, GetSchoolUserQuery } from '@/types/api';
import { GraphQLQuery } from 'aws-amplify/api';
import { getCharityUser, getLocalAuthorityUser, getSchoolUser } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import { UserDetails } from '@/types/data';
import { getUserDetailsObjectFromQuery } from '@/utils/account';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import ManageInstitutionSection from './ManageInstitutionSection';
import ManageDetailsSection from './ManageDetailsSection';
import DangerZone from './DangerZone';

const Settings: FC = () => {
  const { email, type } = useStore((state) => state.user) ?? {};
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
    <ErrorBanner />;
  }

  const userData =
    data &&
    getUserDetailsObjectFromQuery(
      Object.values(data).map((value) => value as UserDetails)[0],
      type
    );

  if (!userData) {
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
          {type === 'charity' && (
            <div className={styles.postcodeSection}>
              <h2>Postcode</h2>
              <InfoTable tableValues={{ Postcode: state.postcode }} editableKeys={['Postcode']} />
            </div>
          )}
          <ManageDetailsSection userData={userData} type={type} />
          <ManageInstitutionSection type={type} />
          <DangerZone userData={userData} type={type} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
