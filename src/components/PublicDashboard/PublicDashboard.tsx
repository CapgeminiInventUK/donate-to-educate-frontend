import styles from './PublicDashboard.module.scss';
import { FC, useEffect } from 'react';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import HorizontalLine from '@/assets/school/HorizontalLine';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import FormButton from '../FormButton/FormButton';
import Card from '@/components/Card/Card';
import FindCharityTable from '@/pages/FindYourCommunity/YourLocalArea/FindCharity/FindCharityTable';
import { scrollToTheTop } from '@/utils/globals';
import { PublicDashboardProps } from '@/types/props';
import ActionTile from '../ActionTile/ActionTile';
import Hanger from '@/assets/school/Hanger';
import Heart from '@/assets/school/Heart';
import ExtraStock from '@/assets/school/ExtraStock';
import Map from '../Map/Map';

const PublicDashboard: FC<PublicDashboardProps> = ({
  type,
  name,
  request,
  donate,
  excess,
  about,
  header,
  postcode,
  location,
  setPreview,
  organisationId,
  organisationName,
  previewMode,
}) => {
  const navigate = useNavigate();
  const banner = {
    phone: header?.phone ?? undefined,
    email: header?.email ?? undefined,
    website: header?.website ?? undefined,
    uniformPolicy:
      header && 'uniformPolicy' in header ? header?.uniformPolicy ?? undefined : undefined,
    address: header && 'address' in header ? header?.address ?? undefined : undefined,
  };

  useEffect(() => {
    scrollToTheTop();
  }, [name]);

  return (
    <>
      <InstitutionBanner type={type} name={name} banner={banner} />
      <Card className={styles.dashboardCard}>
        {!(about ?? excess ?? donate ?? request) && (
          <p>We are still populating our profile, please check back later</p>
        )}
        {location?.coordinates && location.coordinates.length === 2 && (
          <Map
            initialCoordinates={[location.coordinates[0], location.coordinates[1]]}
            markers={[{ coordinates: location.coordinates, name, colour: 'purple' }]}
          />
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
        <div className={styles.tilesWrapper}>
          <div className={styles.productsTilesContainer}>
            {request && (
              <ActionTile
                heading="Request products"
                subheading="Easily request school supplies for your children."
                icon={<Hanger colour="white" />}
                theme={'lightBlue'}
                buttonText="Request"
                onClick={() =>
                  navigate(getNavigateLinkFromType(type), {
                    state: {
                      type: 'tick',
                      profile: request,
                      name: organisationName,
                      id: organisationId,
                      previewMode,
                      postcode,
                    },
                  })
                }
              ></ActionTile>
            )}

            {donate && (
              <ActionTile
                heading="Donate products"
                subheading="Help us by donating school supplies."
                icon={<Heart colour="white" />}
                theme={'midBlue'}
                buttonText="Donate"
                onClick={() =>
                  navigate(getNavigateLinkFromType(type), {
                    state: {
                      type: 'heart',
                      profile: donate,
                      name: organisationName,
                      id: organisationId,
                      previewMode,
                      postcode,
                    },
                  })
                }
              ></ActionTile>
            )}

            {excess && (
              <ActionTile
                heading="Check extra stock"
                subheading="Share our extra products with the community."
                icon={<ExtraStock colour="#050E33" />}
                theme={'darkBlue'}
                buttonText="Check extra stock"
                onClick={() =>
                  navigate(getNavigateLinkFromType(type), {
                    state: {
                      type: 'plus',
                      profile: excess,
                      name: organisationName,
                      id: organisationId,
                      previewMode,
                      postcode,
                    },
                  })
                }
              ></ActionTile>
            )}
          </div>
        </div>
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

const getNavigateLinkFromType = (type: string): string =>
  type === 'school' ? Paths.SCHOOLS_DASHBOARD_ITEMS : Paths.CHARITY_DASHBOARD_ITEMS;

export default PublicDashboard;
