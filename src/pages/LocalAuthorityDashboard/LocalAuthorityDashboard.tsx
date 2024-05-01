import { FC, useEffect, useState } from 'react';
import styles from './LocalAuthorityDashboard.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import BackButton from '@/components/BackButton/BackButton';
import Spinner from '@/components/Spinner/Spinner';
import LogoBlue from '@/assets/logo/LogoBlue';
import Checkbox from '@/components/Checkbox/Checkbox';
import FormButton from '@/components/FormButton/FormButton';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { AcceptPrivacyPolicyMutation, GetLaStatsQuery } from '@/types/api';
import { acceptPrivacyPolicy } from '@/graphql/mutations';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import schoolIcon from '@/assets/icons/schoolIcon.svg';
import donateIcon from '@/assets/icons/donateIcon.svg';
import { getLaStats } from '@/graphql/queries';
import { Pill } from '@/components/Pill/Pill';
import { useStore } from '@/stores/useStore';
import Tile from '@/components/Tile/Tile';
import Card from '@/components/Card/Card';

const LocalAuthorityDashboard: FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [hidePrivacyPolicy, setHidePrivacyPolicy] = useState(false);
  const navigate = useNavigate();
  const user = useStore((state) => state.user);

  const { email, name, id: nameId } = user ?? {};

  const {
    data,
    isLoading,
    isError: isErrorQuery,
  } = useQuery({
    queryKey: [`getLaStats-${name}-${nameId}-${email}}`],
    enabled: user !== undefined,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetLaStatsQuery>>({
        query: getLaStats,
        variables: {
          name,
          email,
          nameId,
        },
      });
      return data;
    },
  });

  const { refetch, isError } = useQuery({
    queryKey: [`acceptPrivacyPolicy-${name}-${nameId}-${email}`],
    enabled: false,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<AcceptPrivacyPolicyMutation>>({
        query: acceptPrivacyPolicy,
        variables: {
          name,
          email,
          nameId,
        },
      });
      return data;
    },
  });

  useEffect(() => {
    setHidePrivacyPolicy(data?.getLaStats?.privacyPolicyAccepted ?? false);
  }, [data?.getLaStats?.privacyPolicyAccepted]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || isErrorQuery) {
    return <ErrorBanner />;
  }

  if (!hidePrivacyPolicy) {
    return (
      <div className={styles.container}>
        <div className={styles.actionButtons}>
          <BackButton theme="blue" />
        </div>
        <Card className={styles.laDashboardCard}>
          <LogoBlue className={styles.logo} />
          <h2>Read our privacy policy</h2>
          <p>
            Before you join Donate to Education, you must read our{' '}
            <Link target="__blank" to={Paths.PRIVACY_POLICY}>
              privacy policy (opens in new tab)
            </Link>
            .
          </p>

          <Checkbox
            className={styles.checkbox}
            ariaLabel="accept privacy policy checkbox"
            label="I have read the Donate to Educate privacy policy"
            value={accepted}
            onChange={(value) => setAccepted(value)}
          />
          <FormButton
            theme={accepted ? 'formButtonGreen' : 'formButtonGreenDisabled'}
            text="Confirm"
            ariaLabel="accept privacy policy"
            disabled={!accepted}
            onClick={() => {
              void refetch().then(() => setHidePrivacyPolicy(true));
            }}
          />
        </Card>
      </div>
    );
  }

  const { schoolRequests, charityRequests } = data?.getLaStats ?? {};

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <BackButton theme="blue" />
      </div>
      <div className={styles.adminCard}>
        <div className={styles.header}>
          <h1>{name}</h1>
        </div>
        <div className={styles.body}>
          <h2>Manage your community</h2>
          <div className={styles.tileRow}>
            <Tile
              title="Manage your schools"
              onClick={() =>
                navigate(Paths.LOCAL_AUTHORITY_DASHBOARD_SCHOOLS, {
                  state: { localAuthority: name },
                })
              }
              body={['View, edit and remove schools from Donate to Educate in your area.']}
              icon={<img src={schoolIcon} alt="School" />}
              size="medium"
              noShadow
            >
              <Pill color="green" text={`${schoolRequests} requests`} />
            </Tile>
            <Tile
              title="Manage your charity and volunteer groups"
              onClick={() =>
                navigate(Paths.LOCAL_AUTHORITY_DASHBOARD_CHARITIES, {
                  state: { localAuthority: name },
                })
              }
              body={[
                'View, edit, and remove charities and volunteer groups from Donate to Educate in your area.',
              ]}
              icon={<img src={donateIcon} alt="School" />}
              size="medium"
              noShadow
            >
              <Pill color="green" text={`${charityRequests} requests`} />
            </Tile>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalAuthorityDashboard;
