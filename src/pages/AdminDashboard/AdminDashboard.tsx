import { FC } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { signOut } from 'aws-amplify/auth';
import { GraphQLQuery } from '@aws-amplify/api';
import { getAdminPageRequests } from '@/graphql/composite';
import { client } from '@/graphqlClient';
import Button from '@/components/Button/Button';
import Paths from '@/config/paths';
import { GetJoinRequestsQuery, GetLocalAuthoritiesQuery } from '@/types/api';
import AdminDashboardCard from './AdminDashboardCard/AdminDashboardCard';
import styles from './AdminDashboard.module.scss';

export interface SchoolOrCharityProperties {
  name: string;
  la: string;
  user: RequestUser;
}

export interface RequestUser {
  name: string;
  title: string;
  email: string;
  phone: string;
}

// Need to make this a protected route only for logged in users of type admin.
const AdminDashboard: FC = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['la'],
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

  return (
    <div className={styles.container}>
      <div className={styles.adminCard}>
        <div className={styles.header}>
          <h1>Admin Dashboard</h1>
          <div>
            <Button
              theme="link"
              text="Sign out"
              className={styles.actionButtons}
              onClick={(): void => {
                void signOut()
                  .then(() => navigate(Paths.LOGIN))
                  // eslint-disable-next-line no-console
                  .catch(console.error);
              }}
            />
          </div>
        </div>
        <div className={styles.body}>
          <h2>Hello, team</h2>
          <hr />
          <div className={styles.cardContainer}>
            <AdminDashboardCard
              isLoading={isLoading}
              title="Manage local authorities"
              body="View, add and edit your local authorities."
              onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_LA_MANAGE)}
              stats={
                <>
                  <div>{registered} joined</div>
                  <div>{notRegistered} to join</div>
                </>
              }
              className="la"
              buttonTheme="formButtonMidBlue"
            />
            <AdminDashboardCard
              isLoading={isLoading}
              title="Manage schools, charities and volunteers"
              body="View who's asked to join Donate to Educate."
              onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_REQUESTS)}
              stats={
                <>
                  {data?.getJoinRequests?.length ?? 0}
                  {data?.getJoinRequests?.length === 1 ? ' request' : ' requests'}
                </>
              }
              className="requests"
            />
            <AdminDashboardCard
              isLoading={isLoading}
              title="Manage registered schools"
              body="View, add and edit registered schools."
              onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_MANAGE_SCHOOLS)}
              stats={<>0 joined</>}
              className="schools"
            />
            <AdminDashboardCard
              isLoading={isLoading}
              title="Manage registered charities and volunteers"
              body="View, add and edit registered charities and volunteers."
              onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_MANAGE_CHARITIES)}
              stats={<>0 joined</>}
              className="charities"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
