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
import { getLaStats } from '@/graphql/queries';
import { Pill } from '@/components/Pill/Pill';
import { useStore } from '@/stores/useStore';
import Tile from '@/components/Tile/Tile';
import Card from '@/components/Card/Card';
import Donate from '@/assets/icons/Donate';
import School from '@/assets/icons/School';
import Settings from '@/assets/icons/Settings';
import { PillColours } from '@/types/data';
import Hanger from '@/assets/tiles/Hanger';
import Heart from '@/assets/LocalAuthorityDashboard/Heart';
import ExtraStock from '@/assets/LocalAuthorityDashboard/ExtraStock';
import { paramedRoute } from '@/utils/routeUtils';

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
      <div className={styles.adminCard}>
        <div className={styles.header}>
          <h1>{name}</h1>
          <Link className={styles.settingsButton} to={Paths.SETTINGS}>
            Settings <Settings />
          </Link>
        </div>

        <div className={styles.body}>
          <div className={styles.tileContainer}>
            <h2>Schools and charities in your area</h2>
            <div className={styles.tileRow}>
              <Tile
                title="Available products"
                onClick={() =>
                  navigate(paramedRoute(Paths.LOCAL_AUTHORITY_DASHBOARD_PRODUCTS, { laName: name }))
                }
                body={['Easily request school supplies for children in your community.']}
                icon={<Hanger />}
                tileColourScheme="light"
                tileAccentColour="lightBlueAccent"
                size="medium"
                noShadow
                hasBorder
              />
              <Tile
                title="Donations needed"
                onClick={() =>
                  navigate(paramedRoute(Paths.LOCAL_AUTHORITY_DASHBOARD_DONATE, { laName: name }))
                }
                body={['Donate school supplies to schools and charities who need them.']}
                icon={<Heart />}
                size="medium"
                tileColourScheme="light"
                tileAccentColour="midBlueAccent"
                noShadow
                hasBorder
              />
              <Tile
                title="Redistribute extra stock"
                onClick={() =>
                  navigate(paramedRoute(Paths.LOCAL_AUTHORITY_DASHBOARD_EXCESS, { laName: name }))
                }
                body={[
                  'Your community might have too many school products. Take it off their hands!',
                ]}
                icon={<ExtraStock />}
                size="medium"
                tileColourScheme="light"
                tileAccentColour="midGreenAccent"
                noShadow
                hasBorder
              />
            </div>
          </div>

          <div className={styles.tileContainer}>
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
                icon={<School />}
                size="medium"
                noShadow
                tileColourScheme="dark"
              >
                <Pill colour={PillColours.GREEN} text={`${schoolRequests} requests`} />
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
                icon={<Donate />}
                tileColourScheme="dark"
                size="medium"
                noShadow
              >
                <Pill colour={PillColours.GREEN} text={`${charityRequests} requests`} />
              </Tile>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalAuthorityDashboard;
