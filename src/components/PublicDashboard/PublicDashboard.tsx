import HorizontalLine from '@/assets/school/HorizontalLine';
import Card from '@/components/Card/Card';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import FindCharityTable from '@/pages/FindYourCommunity/YourLocalArea/FindCharity/FindCharityTable';
import type { PublicDashboardProps } from '@/types/props';
import { returnObjectValueOrUndefined, scrollToTheTop } from '@/utils/globals';
import { type FC, useEffect } from 'react';
import FormButton from '../FormButton/FormButton';
import LocationMap from '../LocationMap/LocationMap';
import styles from './PublicDashboard.module.scss';
import ActionTiles from './PublicDashboardActionTiles';

const PublicDashboard: FC<PublicDashboardProps> = ({ type, profile, setPreview, previewMode }) => {
  const { header, name, about, excess, donate, request, location, id, postcode } = profile ?? {};
  const banner = {
    phone: returnObjectValueOrUndefined('phone', header),
    email: returnObjectValueOrUndefined('email', header),
    website: returnObjectValueOrUndefined('website', header),
    uniformPolicy: returnObjectValueOrUndefined('uniformPolicy', header),
    address: returnObjectValueOrUndefined('address', header),
  };

  useEffect(() => {
    scrollToTheTop();
  }, []);

  return (
    <>
      <InstitutionBanner type={type} name={name} banner={banner} />
      <Card className={styles.dashboardCard}>
        {!(about ?? excess ?? donate ?? request) && (
          <p>We are still populating our profile, please check back later</p>
        )}
        {location?.coordinates && location.coordinates.length === 2 && (
          <>
            <h2>Location map</h2>
            <LocationMap
              initialCoordinates={[location.coordinates[0], location.coordinates[1]]}
              markers={[
                {
                  coordinates: location.coordinates,
                  name: name ?? '',
                  colour: 'purple',
                },
              ]}
            />
          </>
        )}
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
            <FindCharityTable postcode={postcode} type={type} />
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
  );
};

export default PublicDashboard;
