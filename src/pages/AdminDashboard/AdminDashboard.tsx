import Crown from '@/assets/icons/Crown';
import Donate from '@/assets/icons/Donate';
import Requests from '@/assets/icons/Requests';
import School from '@/assets/icons/School';
import LogoCapgeminiInvent from '@/assets/logo/LogoCapgeminiInvent';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import Paths from '@/config/paths';
import { getAdminTileStats } from '@/graphql/queries';
import { client } from '@/graphqlClient';
import type { GetAdminTileStatsQuery } from '@/types/api';
import type { GraphQLQuery } from '@aws-amplify/api';
import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { useNavigate } from 'react-router';
import styles from './AdminDashboard.module.scss';
import AdminDashboardCard from './AdminDashboardCard/AdminDashboardCard';

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
              isLoading={isLoading}
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
              isLoading={isLoading}
              icon={<Requests />}
              title="Requests"
              body="Approve or decline requests from schools and charities who want to join Donate to Educate."
              amount={joinRequests?.school}
              totalAmount={la?.joined}
              subBody="Hello"
              onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_REQUESTS)}
              stats={[joinRequests?.school, joinRequests?.charity]}
              className="requests"
            />
            <AdminDashboardCard
              isLoading={isLoading}
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
              isLoading={isLoading}
              title="Charities and volunteer groups"
              body="View, edit and remove registered charities and users."
              amount={registeredCharities}
              subBody="charities and volunteer groups have joined Donate to Educate."
              onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_MANAGE_CHARITIES)}
              className="charities"
            />
          </div>
          <div className={styles.inventBanner}>
            <p>Powered by</p>
            <LogoCapgeminiInvent
              className={styles.inventLogo}
              onClick={(): Window | null =>
                window.open(Paths.INVENT, '_blank', 'rel=noopener noreferrer')
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
