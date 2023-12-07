import { FC, useEffect, useState } from 'react';
import styles from './AdminDashboard.module.scss';
import Button from '@/components/Button/Button';
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { GetJoinRequestsQuery, GetLocalAuthoritiesQuery } from '@/types/api';
import { GraphQLQuery } from '@aws-amplify/api';
import { client } from '@/graphqlClient';
import BackButton from '@/components/BackButton/BackButton';
import LocalAuthoritySignUp from './LocalAuthoritySignUp';
import ConfirmationPage from '@/components/ConfirmationPage/ConfirmationPage';
import Email from '@/assets/admin/Email';
import Paths from '@/config/paths';
import Spinner from '@/components/Spinner/Spinner';
import { getAdminPageRequests } from '@/graphql/composite';
import FormButton from '@/components/FormButton/FormButton';
import { Pill } from '@/components/Pill/Pill';

// Need to make this a protected route only for logged in users of type admin.
const AdminDashboard: FC = () => {
  const [stage, setStage] = useState('overview');
  const [selectedLa, setSelectedLa] = useState('');
  const navigate = useNavigate();
  const [shouldSignOut, setShouldSignOut] = useState(false);

  const {
    data,
    isLoading,
    // isSuccess,
    error,
  } = useQuery({
    queryKey: ['la'],
    // enabled,
    queryFn: async () => {
      const { data } = await client.graphql<
        GraphQLQuery<GetLocalAuthoritiesQuery & GetJoinRequestsQuery>
      >({
        query: getAdminPageRequests,
      });

      return data;
    },
  });

  const { registered, notRegistered } =
    data?.getLocalAuthorities.reduce(
      (acc, la) => {
        if (la.registered) {
          acc.registered++;
        } else {
          acc.notRegistered++;
        }
        return acc;
      },
      {
        registered: 0,
        notRegistered: 0,
      }
    ) ?? {};

  // eslint-disable-next-line no-console
  console.log(data, error, registered, notRegistered);
  useEffect(() => {
    if (shouldSignOut) {
      void signOut()
        .then(() => navigate(Paths.LOGIN))
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  }, [shouldSignOut, navigate]);

  if (shouldSignOut) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      {['overview', 'manage_las', 'view_requests'].includes(stage) && (
        <div className={styles.adminCard}>
          <div className={styles.header}>
            <h1>{getHeader(stage)}</h1>
            <div>
              <Button
                theme="link"
                text="Settings"
                className={styles.actionButtons}
                onClick={(): void => undefined}
              />
              <Button
                theme="link"
                text="Sign out"
                className={styles.actionButtons}
                onClick={(): void => setShouldSignOut(true)}
              />
            </div>
          </div>
          <div className={styles.body}>
            {stage === 'overview' && (
              <>
                <h2>Hello, team</h2>
                <hr />
                <div className={styles.cardContainer}>
                  <div className={`${styles.card} ${styles.la}`}>
                    {isLoading && <Spinner />}
                    {!isLoading && (
                      <>
                        <h3>Manage local authorities</h3>
                        <div className={styles.laBorder}>{registered} joined</div>
                        <div className={styles.laBorder}>{notRegistered} to join</div>
                        <br />
                        <div>View, add and edit your local authorities.</div>
                        <br />
                        <FormButton
                          text={'Start'}
                          theme={'formButtonMidBlue'}
                          onClick={(): void => setStage('manage_las')}
                          fullWidth
                        />
                      </>
                    )}
                  </div>
                  <div className={`${styles.card} ${styles.requests}`}>
                    {isLoading && <Spinner />}
                    {!isLoading && (
                      <>
                        <h3>Manage schools, charities and volunteers</h3>
                        <div className={styles.requestsBorder}>
                          {data?.getJoinRequests?.length ?? 4} requests
                        </div>
                        <br />
                        <div>View who&apos;s asked to join Donate to Educate.</div>
                        <br />
                        <FormButton
                          text={'Start'}
                          theme="formButtonGrey"
                          onClick={(): void => setStage('view_requests')}
                          fullWidth
                        />
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
            {stage === 'manage_las' && (
              <>
                <BackButton onClick={(): void => setStage('overview')} theme="white" />
                <div className={styles.laBorder}>{registered} joined</div>
                <div className={styles.laBorder}>{notRegistered} to join</div>
                <ul>
                  {data?.getLocalAuthorities.map((la) => {
                    return (
                      <li key={la.name}>
                        {la.name} -{' '}
                        {la.registered ? (
                          <Pill color="blue" text="Joined" />
                        ) : (
                          <Pill color="red" text="Not Joined" />
                        )}{' '}
                        - Action:
                        {
                          <Button
                            theme="link"
                            text="Add user"
                            onClick={(): void => {
                              setSelectedLa(la.name);
                              setStage('la_sign_up');
                            }}
                          />
                        }
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
            {stage === 'view_requests' && (
              <>
                <BackButton onClick={(): void => setStage('overview')} theme="white" />
              </>
            )}
          </div>
        </div>
      )}
      {stage === 'la_sign_up' && (
        <>
          <BackButton onClick={(): void => setStage('manage_las')} theme="blue" />
          <LocalAuthoritySignUp name={selectedLa} setStage={setStage} />
        </>
      )}
      {stage === 'la_confirmation' && (
        <ConfirmationPage
          setStage={setStage}
          icon={<Email />}
          title={`You have created an account for ${selectedLa} County Council`}
          message={<p>The main user has been emailed with instructions to set up their profile</p>}
        />
      )}
    </div>
  );
};

const getHeader = (stage: string): string => {
  switch (stage) {
    case 'overview':
      return 'Admin Dashboard';
    case 'manage_las':
      return 'Manage local authorities';
    case 'view_requests':
      return 'Requests to join';
    default:
      throw new Error(`Unexpected stage`);
  }
};

export default AdminDashboard;
