import styles from './PublicDashboard.module.scss';
import { FC } from 'react';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import Hanger from '@/assets/school/Hanger';
import Heart from '@/assets/school/Heart';
import ExtraStock from '@/assets/school/ExtraStock';
import HorizontalLine from '@/assets/school/HorizontalLine';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { CharityProfileHeader, ProfileItems, SchoolProfileHeader } from '@/types/api';
import FormButton from '../FormButton/FormButton';

interface PublicDashboardProps {
  type: 'school' | 'charity';
  name: string;
  excess?: ProfileItems | null;
  donate?: ProfileItems | null;
  request?: ProfileItems | null;
  about?: string | null;
  header?: SchoolProfileHeader | CharityProfileHeader | null;
  postcode?: string | null;
  setPreview?: (value: boolean) => void;
}

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
}) => {
  const navigate = useNavigate();
  return (
    <>
      <InstitutionBanner
        type={type}
        name={name}
        phone={header?.phone ?? undefined}
        email={header?.email ?? undefined}
        website={header?.website ?? undefined}
        uniformPolicy={
          header && 'uniformPolicy' in header ? header?.uniformPolicy ?? undefined : undefined
        }
        address={header && 'address' in header ? header?.address ?? undefined : undefined}
      />
      <div className={styles.card}>
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
            <p>{about}</p>
          </>
        )}

        <div className={styles.productsTilesContainer}>
          {request && (
            <div
              className={styles.requestProductsTile}
              onClick={() =>
                navigate(getNavigateLinkFromType(type), {
                  state: { type: 'tick', profile: request },
                })
              }
            >
              <Hanger /> <h3>Request products</h3>
            </div>
          )}
          {donate && (
            <div
              className={styles.donateProductsTile}
              onClick={() =>
                navigate(getNavigateLinkFromType(type), {
                  state: { type: 'heart', profile: donate },
                })
              }
            >
              <Heart /> <h3>Donate products</h3>
            </div>
          )}
        </div>
        {excess && (
          <div
            className={styles.extraStockTileContainer}
            onClick={() =>
              navigate(getNavigateLinkFromType(type), { state: { type: 'plus', profile: excess } })
            }
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
        )}
        {postcode && setPreview && (
          <div className={styles.actionButtons}>
            <FormButton
              theme="formButtonGreen"
              text="Save profile and continue"
              ariaLabel="save profile and continue"
              onClick={() => navigate(Paths.SCHOOL_VIEW, { state: { name, postcode } })}
            />
            <FormButton
              theme="formButtonGrey"
              text="Edit profile"
              ariaLabel="edit profile"
              onClick={() => setPreview(false)}
            />
          </div>
        )}
      </div>
    </>
  );
};

const getNavigateLinkFromType = (type: string): string =>
  type === 'school' ? Paths.SCHOOLS_DASHBOARD_ITEMS : Paths.CHARITY_DASHBOARD_ITEMS;

export default PublicDashboard;
