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
import Crown from '@/assets/icons/Crown';
import School from '@/assets/icons/School';
import Donate from '@/assets/icons/Donate';
import Requests from '@/assets/icons/Requests';
import InventBanner from '@/components/InventBanner/InventBanner';
import { useZeroIfUndefined } from '@/utils/globals';

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
          <h2>Manage profiles and requests</h2>
          <div className={styles.cardContainer}>
            <AdminDashboardCard
              icon={<Crown />}
              title="Local authorities"
              body="View, add and edit your local authorities."
              amount={la?.joined}
              totalAmount={la?.notJoined}
              subBody="local authorities have joined Donate to Educate."
              onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_LA_MANAGE)}
              className="la"
            />
            <AdminDashboardCard
              icon={<Requests />}
              title="Requests"
              body="Approve or decline requests from schools and charities who want to join Donate to Educate."
              amount={joinRequests?.school}
              totalAmount={la?.joined}
              subBody="Hello"
              onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_REQUESTS)}
              stats={[
                useZeroIfUndefined(joinRequests?.school),
                useZeroIfUndefined(joinRequests?.charity),
              ]}
              className="requests"
            />
            <AdminDashboardCard
              icon={<School />}
              title="Schools"
              body="View, edit and remove registered schools and users."
              amount={registeredSchools}
              subBody="schools have joined Donate to Educate."
              onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_MANAGE_SCHOOLS)}
              className="schools"
            />
            <AdminDashboardCard
              icon={<Donate />}
              title="Charities and volunteer groups"
              body="View, edit and remove registered charities and users."
              amount={registeredCharities}
              subBody="charities and volunteer groups have joined Donate to Educate."
              onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_MANAGE_CHARITIES)}
              className="charities"
            />
          </div>
          <InventBanner />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
