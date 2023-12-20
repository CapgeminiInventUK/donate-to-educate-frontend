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

// Need to make this a protected route only for logged in users of type admin.
const AdminDashboard: FC = () => {
  const [stage, setStage] = useState('overview');
  const [selectedLa, setSelectedLa] = useState('');
  const [schoolOrCharityName, setSchoolOrCharityName] = useState('');

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

  //data?.getJoinRequests[0].

  return (
    <div className={styles.container}>
      {['overview', 'manage_las', 'view_requests', 'view_la_profile'].includes(stage) && (
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
                          {data?.getJoinRequests?.length ?? 0}
                          {data?.getJoinRequests?.length === 1 ? ' request' : ' requests'}
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

                {/* <Button
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
                /> */}

                <JoinRequests
                  setStage={setStage}
                  setSchoolOrCharityName={setSchoolOrCharityName}
                  data={data}
                  name={selectedLa}
                  setSelectedLa={setSelectedLa}
                />
              </>
            )}
          </div>
        </div>
      )}
      {stage === 'request_approval_school' && (
        <ApprovalRequest setStage={setStage} type="school" name={schoolOrCharityName} />
      )}
      {stage === 'request_approval_charity' && (
        <ApprovalRequest setStage={setStage} type="charity" name={schoolOrCharityName} />
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
    case 'view_la_profile':
      return 'Local Authority Profile';
    default:
      throw new Error(`Unexpected stage`);
  }
};

export default AdminDashboard;
