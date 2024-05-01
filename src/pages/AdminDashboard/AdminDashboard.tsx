import { FC } from 'react';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { GraphQLQuery } from '@aws-amplify/api';
import { client } from '@/graphqlClient';
import Paths from '@/config/paths';
import { GetAdminTileStatsQuery } from '@/types/api';
import AdminDashboardCard from './AdminDashboardCard/AdminDashboardCard';
import styles from './AdminDashboard.module.scss';
import { getAdminTileStats } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';

const AdminDashboard: FC = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetAdminTileStatsQuery>>({
        query: getAdminTileStats,
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

  const { la, joinRequests, registeredSchools, registeredCharities } =
    data?.getAdminTileStats ?? {};

  return (
    <div className={styles.container}>
      <div className={styles.adminCard}>
        <div className={styles.header}>
          <h1>Admin Dashboard</h1>
        </div>
        <div className={styles.body}>
          <div className={styles.cardContainer}>
            <AdminDashboardCard
              isLoading={isLoading}
              title="Manage local authorities"
              body="View, add and edit your local authorities."
              onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_LA_MANAGE)}
              stats={
                <>
                  <div>{la?.joined} joined</div>
                  <div>{la?.notJoined} to join</div>
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
                  <div>
                    {joinRequests?.school ?? 0}
                    {joinRequests?.school === 1 ? ' school request' : ' school requests'}
                  </div>
                  <div>
                    {joinRequests?.charity ?? 0}
                    {joinRequests?.charity === 1
                      ? ' charity and volunteer group request'
                      : ' charity and volunteer group requests'}
                  </div>
                </>
              }
              className="requests"
            />
            <AdminDashboardCard
              isLoading={isLoading}
              title="Manage registered schools"
              body="View, add and edit registered schools."
              onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_MANAGE_SCHOOLS)}
              stats={<>{registeredSchools} joined</>}
              className="schools"
            />
            <AdminDashboardCard
              isLoading={isLoading}
              title="Manage registered charities and volunteers"
              body="View, add and edit registered charities and volunteers."
              onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_MANAGE_CHARITIES)}
              stats={<>{registeredCharities} joined</>}
              className="charities"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
