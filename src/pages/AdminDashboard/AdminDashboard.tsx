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
import LogoCapgeminiInvent from '@/assets/logo/LogoCapgeminiInvent';
import Crown from '@/assets/icons/crown';
import Requests from '@/assets/icons/requests';
import schoolIcon from '@/assets/icons/schoolIcon.svg';
import donateIcon from '@/assets/icons/donateIcon.svg';

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
              icon={<img src={schoolIcon} alt="schoolIcon" />}
              title="Schools"
              body="View, edit and remove registered schools and users."
              amount={registeredSchools}
              subBody="schools have joined Donate to Educate."
              onClick={(): void => navigate(Paths.ADMIN_DASHBOARD_MANAGE_SCHOOLS)}
              className="schools"
            />
            <AdminDashboardCard
              icon={<img src={donateIcon} alt="donateIcon" />}
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
