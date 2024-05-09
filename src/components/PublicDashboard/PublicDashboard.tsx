import styles from './PublicDashboard.module.scss';
import { FC, useEffect } from 'react';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import Hanger from '@/assets/school/Hanger';
import Heart from '@/assets/school/Heart';
import ExtraStock from '@/assets/school/ExtraStock';
import HorizontalLine from '@/assets/school/HorizontalLine';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import FormButton from '../FormButton/FormButton';
import { motion } from 'framer-motion';
import Card from '@/components/Card/Card';
import FindCharityTable from '@/pages/FindYourCommunity/YourLocalArea/FindCharity/FindCharityTable';
import { scrollToTheTop } from '@/utils/globals';
import { PublicDashboardProps } from '@/types/props';

const PublicDashboard: FC<PublicDashboardProps> = ({
  type,
  name,
  request,
  donate,
  excess,
  about,
  header,
  postcode,
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
        {about && (
          <>
            <div className={styles.titleContainer}>
              <h2>About us</h2>
              <div className={styles.svgContainer}>
                <HorizontalLine className={styles.horizontalLine} />
              </div>
            </div>
            <p className={styles.paragraph}>{about}</p>
          </>
        )}

        <div className={styles.productsTilesContainer}>
          {request && (
            <motion.div
              className={styles.requestProductsTile}
              onClick={() =>
                navigate(getNavigateLinkFromType(type), {
                  state: {
                    type: 'tick',
                    profile: request,
                    name: organisationName,
                    id: organisationId,
                    previewMode,
                  },
                })
              }
              whileHover={{ scale: 1.05 }}
            >
              <Hanger /> <h3>Request products</h3>
            </motion.div>
          )}
          {donate && (
            <motion.div
              className={styles.donateProductsTile}
              onClick={() =>
                navigate(getNavigateLinkFromType(type), {
                  state: {
                    type: 'heart',
                    profile: donate,
                    name: organisationName,
                    id: organisationId,
                    previewMode,
                  },
                })
              }
              whileHover={{ scale: 1.05 }}
            >
              <Heart /> <h3>Donate products</h3>
            </motion.div>
          )}
        </div>
        {excess && (
          <motion.div
            className={styles.extraStockTileContainer}
            onClick={() =>
              navigate(getNavigateLinkFromType(type), {
                state: {
                  type: 'plus',
                  profile: excess,
                  name: organisationName,
                  id: organisationId,
                  previewMode,
                },
              })
            }
            whileHover={{ scale: 1.05 }}
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
          </motion.div>
        )}
        {postcode && setPreview && (
          <div className={styles.actionButtons}>
            <FormButton
              theme="formButtonGreen"
              text="Continue"
              ariaLabel="Continue"
              onClick={() =>
                navigate(type === 'school' ? Paths.SCHOOL_VIEW : Paths.CHARITIES_VIEW, {
                  state: { name, postcode, previewMode },
                })
              }
            />
            <FormButton
              theme="formButtonGrey"
              text="Edit profile"
              ariaLabel="edit profile"
              onClick={() => setPreview(false)}
            />
          </div>
        )}
        {postcode && (
          <div className={styles.nearbyCharitiesTable}>
            <hr />
            <FindCharityTable postcode={postcode} />
          </div>
        )}
      </Card>
    </>
  );
};

const getNavigateLinkFromType = (type: string): string =>
  type === 'school' ? Paths.SCHOOLS_DASHBOARD_ITEMS : Paths.CHARITY_DASHBOARD_ITEMS;

export default PublicDashboard;
