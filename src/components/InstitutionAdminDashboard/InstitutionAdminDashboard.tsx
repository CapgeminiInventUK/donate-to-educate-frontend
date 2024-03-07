import styles from './InstitutionAdminDashboard.module.scss';
import { FC, useState } from 'react';
import BackButton from '@/components/BackButton/BackButton';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import Hanger from '@/assets/school/Hanger';
import Heart from '@/assets/school/Heart';
import ExtraStock from '@/assets/school/ExtraStock';
import InformationTile from '@/components/InformationTile/InformationTile';
import EditableInformationTile from '@/components/EditableInformationTile/EditableInformationTile';
import AdminActionTile from '@/components/AdminActionTile/AdminActionTile';
import FormButton from '@/components/FormButton/FormButton';

interface InstitutionAdminDashboardProps {
  type: 'school' | 'charity';
}

const InstitutionAdminDashboard: FC<InstitutionAdminDashboardProps> = ({ type }) => {
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
        <InstitutionBanner isAdminView type={type} />
        <div className={styles.card}>
          <InformationTile
            heading={type === 'school' ? "Build your school's profile" : 'Build your profile'}
            subtext={
              type === 'school'
                ? 'Add, edit and save details about how your school can help children and the community.'
                : 'Use your profile to tell visitors how your organisation can help children, schools, and the community get the needed products.'
            }
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
          <div className={styles.actionButtons}>
            <FormButton
              theme="formButtonGreen"
              text="Save profile and continue"
              ariaLabel="save profile and continue"
            />
            <FormButton
              theme="formButtonMidBlue"
              text="Preview profile"
              ariaLabel="preview profile"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionAdminDashboard;
