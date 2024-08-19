import { FC } from 'react';
import styles from './InstitutionAdminView.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { Link, useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import FormButton from '@/components/FormButton/FormButton';
import SchoolProfile from '@/assets/admin/SchoolProfile';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import Tile from '../../../components/Tile/Tile';
import Card from '@/components/Card/Card';
import Crown from '@/assets/icons/Crown';
import { InstitutionAdminViewProps } from '@/types/props';
import { InstitutionType } from '@/types/data';

const InstitutionAdminView: FC<InstitutionAdminViewProps> = ({ postcode, name, type }) => {
  const navigate = useNavigate();
  const path =
    type === InstitutionType.SCHOOL
      ? Paths.SCHOOLS_CREATE_EDIT_PROFILE
      : Paths.CHARITIES_CREATE_EDIT_PROFILE;

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <BackButton theme="blue" onClick={() => navigate(Paths.HOME)} />
      </div>
      <InstitutionBanner type={type} name={name} banner={{}} postcode={postcode} />
      <Card className={styles.subContainer}>
        <Tile
          title={`Your ${type} profile is active`}
          body={['View, edit and update your public facing profile.']}
          icon={<SchoolProfile />}
          size="medium"
          noShadow={true}
          hoverScale={1}
          titleLarge={true}
        >
          <FormButton
            className={styles.button}
            theme="formButtonGreen"
            text="View and edit profile"
            onClick={() => navigate(path)}
            ariaLabel={`view and edit profile`}
          />
          <Link className={styles.deactivateLink} to={Paths.HOME}>
            Deactivate your public profile
          </Link>
        </Tile>
        <Tile
          title="Your local area"
          body={['Find nearby schools and charities in your local area.']}
          icon={<Crown />}
          size="medium"
          noShadow={true}
          hoverScale={1}
          titleLarge={true}
        >
          <ul>
            <li>
              <Link className={styles.linkListItem} to={Paths.LOCAL_SCHOOLS} state={{ postcode }}>
                Find a nearby school
              </Link>
            </li>
            <li>
              <Link className={styles.linkListItem} to={Paths.LOCAL_CHARITIES} state={{ postcode }}>
                Find nearby charities
              </Link>
            </li>
            <li>
              <Link className={styles.linkListItem} to={Paths.LOCAL_DONATE} state={{ postcode }}>
                Donate products
              </Link>
            </li>
            <li>
              <Link className={styles.linkListItem} to={Paths.LOCAL_EXCESS} state={{ postcode }}>
                Help take extra stock
              </Link>
            </li>
          </ul>
        </Tile>
      </Card>
    </div>
  );
};

export default InstitutionAdminView;
