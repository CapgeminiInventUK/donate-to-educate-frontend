import styles from './SchoolAdminDashboard.module.scss';
import { FC, useState } from 'react';
import BackButton from '@/components/BackButton/BackButton';
import { SchoolBanner } from '@/components/SchoolBanner/SchoolBanner';
import Hanger from '@/assets/school/Hanger';
import Heart from '@/assets/school/Heart';
import ExtraStock from '@/assets/school/ExtraStock';
import InformationTile from '@/components/InformationTile/InformationTile';
import EditableInformationTile from '@/components/EditableInformationTile/EditableInformationTile';
import AdminActionTile from '@/components/AdminActionTile/AdminActionTile';

const SchoolAdminDashboard: FC = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [isEditingAboutUs, setIsEditingAboutUs] = useState(false);

  const toggleIsEditingAboutUs = (): void => {
    setIsEditingAboutUs((isEditingAboutUs) => !isEditingAboutUs);
  };

  // TODO - Make POST request to API to save new "About us" when user clicks Save button
  const saveAboutUs = (): void => {
    toggleIsEditingAboutUs();
  };

  const onBackButtonClick = (): void => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1);
    }
  };

  // TODO - Use useEffect to fetch information from API (about us, request/donate/extra stock data)

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <BackButton onClick={onBackButtonClick} theme="blue" />
        <SchoolBanner isAdminView />
        <div className={styles.card}>
          <InformationTile
            heading="Build your school's profile"
            subtext="Add, edit and save details about how your school can help children and the community."
          />

          <EditableInformationTile
            onClick={toggleIsEditingAboutUs}
            saveOnClick={saveAboutUs}
            heading="About us"
            subtext={''}
            isEditing={isEditingAboutUs}
          />

          <div className={styles.productsTilesContainer}>
            <AdminActionTile
              heading="Let visitors request products from you"
              icon={<Hanger height="2.875rem" width="2.875rem" />}
              onClick={() => null}
            />
            <AdminActionTile
              heading="Let visitors donate products to you"
              icon={<Heart height="2.875rem" width="2.875rem" colour="#11356f" />}
              onClick={() => null}
            />
          </div>
          <div className={styles.extraStockTileContainer}>
            <AdminActionTile
              heading="Let charities take your extra stock to share with the community"
              icon={<ExtraStock height="2.875rem" width="2.875rem" colour="#11356f" />}
              onClick={() => null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolAdminDashboard;
