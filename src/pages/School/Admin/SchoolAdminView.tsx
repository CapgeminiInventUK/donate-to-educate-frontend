import { FC } from 'react';
import styles from './SchoolAdminView.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import FormButton from '@/components/FormButton/FormButton';
import SchoolProfile from '@/assets/admin/SchoolProfile';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import LogoutButton from '@/components/LogoutButton/LogoutButton';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetSchoolProfileQuery } from '@/types/api';
import { getSchoolProfile } from '@/graphql/queries';
import { useStore } from '@/stores/useStore';
import Tile from '../../../components/Tile/Tile';
import schoolIcon from '@/assets/icons/schoolIcon.svg';
import heartIcon from '@/assets/icons/heartIcon.svg';
import donateIcon from '@/assets/icons/donateIcon.svg';
import stockIcon from '@/assets/icons/stockIcon.svg';
import Card from '@/components/Card/Card';

const School: FC = () => {
  const user = useStore((state) => state.user);
  const { name, id } = user ?? {};
  const navigate = useNavigate();

  const { isLoading, isError } = useQuery({
    queryKey: [`getProfile-${name}-${id}`],
    enabled: user !== undefined,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolProfileQuery>>({
        query: getSchoolProfile,
        variables: {
          name,
          id,
        },
      });

      return data;
    },
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <BackButton theme="blue" />
        <LogoutButton />
      </div>
      <InstitutionBanner type={'school'} name={name} banner={{}} />
      <Card className={styles.subContainer}>
        <div className={styles.schoolProfileBanner}>
          <SchoolProfile />
          <h2>Your school&apos;s profile is active</h2>
          <p>View, edit and update your public facing profile.</p>
          <FormButton
            theme="formButtonGreen"
            text={'View and edit profile'}
            ariaLabel="view and edit profile"
            onClick={() => navigate(Paths.SCHOOLS_CREATE_EDIT_PROFILE)}
          />
        </div>
        <div className={styles.localAreaContainer}>
          <h2>Your local area</h2>
          <div className={styles.tileRow}>
            <Tile
              title="Find a nearby school"
              onClick={() => navigate(Paths.SIGN_UP_CHARITY)}
              body={['Request or donate products']}
              icon={<img src={schoolIcon} alt="mySvgImage" />}
              size="medium"
            />
            <Tile
              title="Find nearby charities"
              onClick={() => navigate(Paths.SIGN_UP_CHARITY)}
              body={['Find out what they stock, or donate products']}
              icon={<img src={heartIcon} alt="mySvgImage" />}
              size="medium"
            />
          </div>
          <div className={styles.tileRow}>
            <Tile
              title="Donate products"
              onClick={() => navigate(Paths.SIGN_UP_CHARITY)}
              body={['Support schools and charities in your area']}
              icon={<img src={donateIcon} alt="mySvgImage" />}
              size="medium"
            />
            <Tile
              title="Help take extra stock"
              onClick={() => navigate(Paths.SIGN_UP_CHARITY)}
              body={[
                'Sometimes schools and charities might have too much stock that urgently needs to find a new home. Help take it off their hands.',
              ]}
              icon={<img src={stockIcon} alt="mySvgImage" />}
              size="medium"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default School;
