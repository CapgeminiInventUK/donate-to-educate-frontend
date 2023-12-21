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
import ApprovalRequest from './ApprovalRequest';
import LocalAuthorityManage from './LocalAuthorityManage';
import JoinRequests from './JoinRequests';
import { FormButtonThemes } from '@/types/props';

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
      {['overview', 'manage_las', 'view_requests', 'view_la_profile'].includes(stage) && (
        <div className={styles.adminCard}>
          <div className={styles.header}>
            <h1>{getHeader(stage)}</h1>
            <div>
              {/*
              ###
              Hidden for now might be added back in the future
              ###
              <Button
                theme="link"
                text="Settings"
                className={styles.actionButtons}
                onClick={(): void => undefined}
              /> */}
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
                  <AdminDashboardCard
                    isLoading={isLoading}
                    title="Manage local authorities"
                    body="View, add and edit your local authorities."
                    onClick={(): void => setStage('manage_las')}
                    stats={
                      <>
                        <div>{registered} joined</div>
                        <div>{notRegistered} to join</div>
                      </>
                    }
                    className={styles.la}
                    buttonTheme="formButtonMidBlue"
                  />
                  <AdminDashboardCard
                    isLoading={isLoading}
                    title="Manage schools, charities and volunteers"
                    body="View who's asked to join Donate to Educate."
                    onClick={(): void => setStage('view_requests')}
                    stats={
                      <>
                        {data?.getJoinRequests?.length ?? 0}
                        {data?.getJoinRequests?.length === 1 ? ' request' : ' requests'}
                      </>
                    }
                    className={styles.requests}
                  />
                  <AdminDashboardCard
                    isLoading={isLoading}
                    title="Manage registered schools"
                    body="View, add and edit registered schools."
                    onClick={(): void => setStage('manage_schools')}
                    stats={<>0 joined</>}
                    className={styles.schools}
                  />
                  <AdminDashboardCard
                    isLoading={isLoading}
                    title="Manage registered charities and volunteers"
                    body="View, add and edit registered charities and volunteers."
                    onClick={(): void => setStage('manage_charities')}
                    stats={<>0 joined</>}
                    className={styles.charities}
                  />
                </div>
              </>
            )}
            {stage === 'manage_las' && (
              <>
                <BackButton onClick={(): void => setStage('overview')} theme="white" />
                <LocalAuthorityManage
                  name={selectedLa}
                  setStage={setStage}
                  data={data}
                  registered={registered}
                  notRegistered={notRegistered}
                  setSelectedLa={setSelectedLa}
                />
              </>
            )}
            {stage === 'view_la_profile' && (
              <>
                <BackButton onClick={(): void => setStage('manage_las')} theme="white" />
              </>
            )}
            {stage === 'view_requests' && (
              <>
                <BackButton onClick={(): void => setStage('overview')} theme="white" />

                <Button
                  theme="midBlue"
                  text="Approve request school"
                  onClick={(): void => {
                    setStage('request_approval_school');
                  }}
                />

                <Button
                  theme="midBlue"
                  text="Approve request charity"
                  onClick={(): void => {
                    setStage('request_approval_charity');
                  }}
                />

                <JoinRequests
                  setStage={setStage}
                  data={data}
                  name={selectedLa}
                  setSelectedLa={setSelectedLa}
                />
              </>
            )}
          </div>
        </div>
      )}
      {stage === 'request_approval_school' && <ApprovalRequest setStage={setStage} type="school" />}
      {stage === 'request_approval_charity' && (
        <ApprovalRequest setStage={setStage} type="charity" />
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

interface AdminDashboardCardProps {
  isLoading: boolean;
  title: string;
  body: string;
  onClick: () => void;
  stats: JSX.Element;
  className: string;
  buttonTheme?: FormButtonThemes;
}

const AdminDashboardCard: FC<AdminDashboardCardProps> = ({
  isLoading,
  title,
  body,
  onClick,
  stats,
  className,
  buttonTheme = 'formButtonGrey',
}): JSX.Element => {
  return (
    <div className={`${styles.card} ${className}`}>
      {isLoading && <Spinner />}
      {!isLoading && (
        <>
          <h3>{title}</h3>
          <div className={styles.border}>{stats}</div>
          <br />
          <div>{body}</div>
          <br />
          <FormButton text={'Start'} theme={buttonTheme} onClick={onClick} fullWidth />
        </>
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
    case 'view_la_profile':
      return 'Local Authority Profile';
    default:
      throw new Error(`Unexpected stage`);
  }
};

export default AdminDashboard;
