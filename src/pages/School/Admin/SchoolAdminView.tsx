import { FC } from 'react';
import styles from './SchoolAdminView.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import FormButton from '@/components/FormButton/FormButton';
import SchoolProfile from '@/assets/admin/SchoolProfile';
import { InstitutionBanner } from '@/components/InstitutionBanner/InstitutionBanner';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetSchoolProfileQuery } from '@/types/api';
import { getSchoolProfile } from '@/graphql/queries';
import { useStore } from '@/stores/useStore';
import Tile from '../../../components/Tile/Tile';
import Card from '@/components/Card/Card';
import Heart from '@/assets/school/Heart';
import Donate from '@/assets/icons/Donate';
import Stock from '@/assets/icons/Stock';

const School: FC = () => {
  const user = useStore((state) => state.user);
  const { name, id } = user ?? {};
  const navigate = useNavigate();

  const { isLoading, data, isError } = useQuery({
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
              onClick={() =>
                navigate(Paths.LOCAL_SCHOOLS, {
                  state: { postcode: data?.getSchoolProfile?.postcode },
                })
              }
              body={['See products schools can provide to you or what donations they need']}
              icon={<School />}
              size="medium"
            />
            <Tile
              title="Find nearby charities"
              onClick={() =>
                navigate(Paths.LOCAL_CHARITIES, {
                  state: { postcode: data?.getSchoolProfile?.postcode },
                })
              }
              body={['Find out what they stock, or donate products']}
              icon={<Heart />}
              size="medium"
            />
          </div>
          <div className={styles.tileRow}>
            <Tile
              title="Donate products"
              onClick={() =>
                navigate(Paths.LOCAL_DONATE, {
                  state: { postcode: data?.getSchoolProfile?.postcode },
                })
              }
              body={['Support schools and charities in your area']}
              icon={<Donate />}
              size="medium"
            />
            <Tile
              title="Help take extra stock"
              onClick={() =>
                navigate(Paths.LOCAL_EXCESS, {
                  state: { postcode: data?.getSchoolProfile?.postcode },
                })
              }
              body={[
                'Sometimes schools and charities might have too much stock that urgently needs to find a new home. Help take it off their hands.',
              ]}
              icon={<Stock />}
              size="medium"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default School;
