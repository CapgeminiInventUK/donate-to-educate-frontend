import styles from './PublicDashboard.module.scss';
import { FC, useEffect } from 'react';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import HorizontalLine from '@/assets/school/HorizontalLine';
import FormButton from '../FormButton/FormButton';
import Card from '@/components/Card/Card';
import FindCharityTable from '@/pages/FindYourCommunity/YourLocalArea/FindCharity/FindCharityTable';
import { returnObjectValueOrUndefined, scrollToTheTop } from '@/utils/globals';
import { PublicDashboardProps } from '@/types/props';
import ActionTiles from './PublicDashboardActionTiles';
import IncompleteProfile from '../IncompleteProfile/IncompleteProfile';

const PublicDashboard: FC<PublicDashboardProps> = ({ type, profile, setPreview, previewMode }) => {
  const { header, name, about, excess, donate, request, id, postcode } = profile ?? {};
  const banner = {
    phone: returnObjectValueOrUndefined('phone', header),
    email: returnObjectValueOrUndefined('email', header),
    website: returnObjectValueOrUndefined('website', header),
    uniformPolicy: returnObjectValueOrUndefined('uniformPolicy', header),
    address: returnObjectValueOrUndefined('address', header),
  };

  useEffect(() => {
    scrollToTheTop();
  }, [name]);

  const isProfileIncomplete = (): boolean => {
    return !(about ?? excess ?? donate ?? request);
  };

  return (
    <>
      {!previewMode && isProfileIncomplete() ? (
        <IncompleteProfile />
      ) : (
        <>
          <InstitutionBanner type={type} name={name} banner={banner} isPublic={true} />
          <Card className={styles.dashboardCard}>
            {about && (
              <div className={styles.aboutContainer}>
                <div className={styles.titleContainer}>
                  <h2>About us</h2>
                  <div className={styles.svgContainer}>
                    <HorizontalLine className={styles.horizontalLine} />
                  </div>
                </div>
                <p className={styles.paragraph}>{about}</p>
              </div>
            )}
            <ActionTiles
              request={request}
              donate={donate}
              excess={excess}
              type={type}
              name={name ?? ''}
              id={id ?? ''}
              previewMode={previewMode}
              postcode={postcode}
            />
            {postcode && (
              <div className={styles.nearbyCharitiesTable}>
                <hr />
                <FindCharityTable postcode={postcode} type={type} currentCharityId={id} />
              </div>
            )}
            {setPreview && (
              <div className={styles.actionButtons}>
                <FormButton
                  theme="formButtonGrey"
                  text="Edit profile"
                  ariaLabel="edit profile"
                  fullWidth={true}
                  onClick={() => setPreview(false)}
                />
              </div>
            )}
          </Card>
        </>
      )}
    </>
  );
};

export default PublicDashboard;
