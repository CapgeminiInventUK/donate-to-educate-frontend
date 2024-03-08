import styles from './PublicDashboard.module.scss';
import { FC, useState } from 'react';
import BackButton from '@/components/BackButton/BackButton';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import Hanger from '@/assets/school/Hanger';
import Heart from '@/assets/school/Heart';
import ExtraStock from '@/assets/school/ExtraStock';
import HorizontalLine from '@/assets/school/HorizontalLine';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';

interface PublicDashboardProps {
  type: 'school' | 'charity';
}

const PublicDashboard: FC<PublicDashboardProps> = ({ type }) => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);

  const onBackButtonClick = (): void => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <BackButton onClick={onBackButtonClick} theme="blue" />
        <InstitutionBanner type={type} />

        <div className={styles.card}>
          <div className={styles.titleContainer}>
            <h2>About us</h2>
            <div className={styles.svgContainer}>
              <HorizontalLine className={styles.horizontalLine} />
            </div>
          </div>

          <p>
            Ormiston Six Villages Academy has pre-loved school products to help children thrive at
            school.
          </p>

          <p>
            Request the things you need or donate products to help the next child. Charities can
            also take our extra stock to share with the communities that need it most.
          </p>

          <div className={styles.productsTilesContainer}>
            <div
              className={styles.requestProductsTile}
              onClick={() => navigate(getNavigateLinkFromType(type), { state: { type: 'tick' } })}
            >
              <Hanger /> <h3>Request products</h3>
            </div>
            <div
              className={styles.donateProductsTile}
              onClick={() => navigate(getNavigateLinkFromType(type), { state: { type: 'heart' } })}
            >
              <Heart /> <h3>Donate products</h3>
            </div>
          </div>
          <div
            className={styles.extraStockTileContainer}
            onClick={() => navigate(getNavigateLinkFromType(type), { state: { type: 'plus' } })}
          >
            <div className={styles.extraStockTile}>
              <ExtraStock />
              <div className={styles.extraStockText}>
                <h3>Check extra stock to share with the community</h3>
                <h4>
                  Charities can take our extra products to share them with people who need it.
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getNavigateLinkFromType = (type: string): string =>
  type === 'school' ? Paths.SCHOOLS_DASHBOARD_ITEMS : Paths.CHARITY_DASHBOARD_ITEMS;

export default PublicDashboard;