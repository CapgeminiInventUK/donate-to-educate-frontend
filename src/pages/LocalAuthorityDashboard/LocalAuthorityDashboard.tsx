import { FC, useEffect, useState } from 'react';
import styles from './LocalAuthorityDashboard.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import BackButton from '@/components/BackButton/BackButton';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import { Attributes, getUserType } from '@/hooks/useCheckCurrentUser';
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
import { getLaStats } from '@/graphql/queries';
import { Pill } from '@/components/Pill/Pill';

const LocalAuthorityDashboard: FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [hidePrivacyPolicy, setHidePrivacyPolicy] = useState(false);
  const navigate = useNavigate();
  const [attributes, setAttributes] = useState<Attributes>();

  useEffect(() => {
    if (!attributes) {
      void getUserType().then((attributes) => {
        setAttributes(attributes);
      });
    }
  });
  const { email, 'custom:institution': name, 'custom:institutionId': nameId } = attributes ?? {};

  const {
    data,
    isLoading,
    isError: isErrorQuery,
  } = useQuery({
    queryKey: [`getLaStats-${name}-${nameId}-${email}}`],
    enabled: attributes !== undefined,
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

  if (!attributes || isLoading) {
    return <Spinner />;
  }

  if (isError || isErrorQuery) {
    return <ErrorBanner />;
  }

  const localAuthority = attributes['custom:institution'];

  if (!hidePrivacyPolicy) {
    return (
      <div className={styles.container}>
        <div className={styles.actionButtons}>
          <BackButton theme="blue" />
          <LogoutButton />
        </div>
        <div className={styles.card}>
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
        </div>
      </div>
    );
  }

  const { schoolRequests, charityRequests } = data?.getLaStats ?? {};

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <BackButton theme="blue" />
        <LogoutButton />
      </div>
      <div className={styles.adminCard}>
        <h1>{localAuthority}</h1>
        <div className={styles.body}>
          <h2>Manage your community</h2>
          <hr />
          <div
            className={`${styles.tileDarkBlue} ${styles.tile}`}
            onClick={() =>
              navigate(Paths.LOCAL_AUTHORITY_DASHBOARD_SCHOOLS, {
                state: { localAuthority },
              })
            }
          >
            <Pill color="green" text={`${schoolRequests} requests`} />
            <h2>Manage your schools</h2>
            <p>View, edit and remove schools from Donate to Educate in your area.</p>
          </div>
          <div
            className={`${styles.tileLightBlue}  ${styles.tile}`}
            onClick={() =>
              navigate(Paths.LOCAL_AUTHORITY_DASHBOARD_CHARITIES, {
                state: { localAuthority },
              })
            }
          >
            <Pill color="green" text={`${charityRequests} requests`} />
            <h2>Manage your charity and volunteer groups</h2>
            <p>
              View, edit and remove charities and volunteer groups from Donate to Educate in your
              area.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalAuthorityDashboard;
