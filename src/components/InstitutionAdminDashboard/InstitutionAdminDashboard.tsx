import BackButton from '@/components/BackButton/BackButton';
import type { Banner } from '@/types/data';
import type { InstitutionAdminDashboardProps } from '@/types/props';
import { returnObjectValueOrUndefined } from '@/utils/globals';
import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicDashboard from '../PublicDashboard/PublicDashboard';
import EditableDashboard from './EditableDashboard/EditableDashboard';
import styles from './InstitutionAdminDashboard.module.scss';

const InstitutionAdminDashboard: FC<InstitutionAdminDashboardProps> = ({ type, profile, name }) => {
  const { about: currentAbout, header } = profile;
  const placeholderAboutText = `${name} has pre-loved school products to help children thrive at school.\n\nRequest the things you need ${type === 'school' ? 'or donate products' : ''} to help the next child. ${type === 'school' ? 'Charities' : 'You'} can also take our extra stock to share with the communities that need it most.`;

  const [banner, setBanner] = useState<Banner>({
    phone: returnObjectValueOrUndefined('phone', header),
    email: returnObjectValueOrUndefined('email', header),
    website: returnObjectValueOrUndefined('website', header),
    uniformPolicy: returnObjectValueOrUndefined('uniformPolicy', header),
    address: returnObjectValueOrUndefined('address', header),
  });
  const navigate = useNavigate();
  const [about, setAbout] = useState(currentAbout ? currentAbout : placeholderAboutText);
  const [preview, setPreview] = useState(false);

  const onBackButtonClick = (): void => {
    if (preview) {
      setPreview(false);
    } else {
      navigate(-1);
    }
  };

  const dashboardProfile = {
    ...profile,
    header: header && { ...banner, __typename: header?.__typename },
    about,
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.actionButtons}>
          <BackButton onClick={onBackButtonClick} theme="blue" />
        </div>
        {!preview && (
          <EditableDashboard
            banner={banner}
            setBanner={setBanner}
            type={type}
            name={name}
            about={about}
            setAbout={setAbout}
            placeholderAboutText={placeholderAboutText}
            profile={profile}
            setPreview={setPreview}
          />
        )}
        {preview && (
          <>
            <PublicDashboard
              type={type}
              setPreview={setPreview}
              previewMode={preview}
              profile={dashboardProfile}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InstitutionAdminDashboard;
