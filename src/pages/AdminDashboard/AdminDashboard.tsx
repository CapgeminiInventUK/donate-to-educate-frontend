import { FC, useEffect, useState } from 'react';
import styles from './AdminDashboard.module.scss';
import Button from '@/components/Button/Button';
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { getLocalAuthorities } from '@/graphql/queries';
import { GetLocalAuthoritiesQuery } from '@/types/api';
import { GraphQLQuery } from '@aws-amplify/api';
import { client } from '@/graphqlClient';

// Need to make this a protected route only for logged in users of type admin.
const AdminDashboard: FC = () => {
  const [stage, setStage] = useState('overview');
  const navigate = useNavigate();
  const [shouldSignOut, setShouldSignOut] = useState(false);

  const {
    data,
    // isLoading,
    // isSuccess,
    error,
  } = useQuery({
    queryKey: ['la'],
    // enabled,
    queryFn: async () => {
      const response = await client.graphql<GraphQLQuery<GetLocalAuthoritiesQuery>>({
        query: getLocalAuthorities,
      });

      return response.data;
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
        .then(() => {
          setShouldSignOut(false);
          navigate('/login');
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  }, [shouldSignOut, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.adminCard}>
        <div className={styles.header}>
          <h1>{getHeader(stage)}</h1>
          <div>
            <Button theme="darkBlue" text="Settings" onClick={(): void => undefined} />
            <Button theme="darkBlue" text="Sign out" onClick={(): void => setShouldSignOut(true)} />
          </div>
        </div>
        <div className={styles.body}>
          {stage === 'overview' && (
            <>
              <h2>Hello, team</h2>
              <hr />
              <div className={styles.cardContainer}>
                <div className={styles.card}>
                  <h3>Manage local authorities</h3>
                  <div>{registered} joined</div>
                  <div>{notRegistered} to join</div>
                  <div>View, add and edit your local authorities.</div>
                  <Button
                    theme="midBlue"
                    text="Start"
                    onClick={(): void => setStage('manage_las')}
                  />
                </div>
                <div className={styles.card}>
                  <h3>Manage schools, charities and volunteers</h3>
                  <div>4 requests</div>
                  <div>View who&apos;s asked to join Donate to Educate.</div>
                  <Button
                    theme="midBlue"
                    text="Start"
                    onClick={(): void => setStage('view_requests')}
                  />
                </div>
              </div>
            </>
          )}
          {stage === 'manage_las' && (
            <>
              <div>{registered} joined</div>
              <div>{notRegistered} to join</div>
              <ul>
                {data?.getLocalAuthorities.map((la) => {
                  return (
                    <li key={la.name}>
                      {la.name} - {la.registered ? 'Joined' : 'Not Joined'}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
          {stage === 'view_requests' && <></>}
        </div>
      </div>
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
