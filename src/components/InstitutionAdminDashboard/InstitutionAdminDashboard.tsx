import styles from './InstitutionAdminDashboard.module.scss';
import { FC, useState } from 'react';
import BackButton from '@/components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import PublicDashboard from '../PublicDashboard/PublicDashboard';
import { Banner } from '@/types/data';
import { InstitutionAdminDashboardProps } from '@/types/props';
import { returnObjectValueOrUndefined } from '@/utils/globals';
import EditableDashboard from './EditableDashboard/EditableDashboard';

const InstitutionAdminDashboard: FC<InstitutionAdminDashboardProps> = ({ type, profile, name }) => {
  const {
    donate,
    excess,
    request,
    about: currentAbout,
    postcode,
    header,
    name: organisationName,
    id,
  } = profile;
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
              name={name}
              excess={excess}
              donate={donate}
              request={request}
              about={about}
              header={header && { ...banner, __typename: header?.__typename }}
              setPreview={setPreview}
              postcode={postcode}
              organisationId={id}
              organisationName={organisationName}
              previewMode={preview}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default InstitutionAdminDashboard;
