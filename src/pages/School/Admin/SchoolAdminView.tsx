import { FC, useState, useEffect } from 'react';
import styles from './SchoolAdminView.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { Link, useNavigate } from 'react-router-dom';
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
import Crown from '@/assets/icons/Crown';

const School: FC = () => {
  const user = useStore((state) => state.user);
  const { name, id } = user ?? {};

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

  const [postcode, setPostcode] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.getSchoolProfile?.postcode) {
      setPostcode(data?.getSchoolProfile.postcode);
    }
  }, [setPostcode, data?.getSchoolProfile?.postcode]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.actionButtons}>
        <BackButton theme="blue" onClick={() => navigate(Paths.HOME)} />
      </div>
      <InstitutionBanner type={'school'} name={name} banner={{}} />
      <Card className={styles.subContainer}>
        <Tile
          title="Your school profile is active"
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
            onClick={() => navigate(Paths.SCHOOLS_CREATE_EDIT_PROFILE)}
            ariaLabel={`view and edit profile`}
          />
          <Link className={styles.deactivateLink} to={Paths.HOME}>
            Deactivate your public profile
          </Link>
        </Tile>
        <Tile
          title="Your local area"
          body={['Find nearby schools and charities in your local area. ']}
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

export default School;
