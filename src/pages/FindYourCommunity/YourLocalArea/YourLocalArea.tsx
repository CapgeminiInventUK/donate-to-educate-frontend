import { FC } from 'react';
import styles from './YourLocalArea.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import Tile from '../../../components/Tile/Tile';
import schoolIcon from '@/assets/icons/schoolIcon.svg';
import heartIcon from '@/assets/icons/heartIcon.svg';
import donateIcon from '@/assets/icons/donateIcon.svg';
import kidsRunning from '@/assets/icons/kidsRunning.webp';
import Card from '@/components/Card/Card';
import { GetSchoolsNearbyQuery } from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { getSchoolsNearby } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';

const YourLocalArea: FC = () => {
  const navigate = useNavigate();
  const { state, hasState } = useLocationStateOrRedirect<{ postcode: string }>(
    Paths.FIND_YOUR_COMMUNITY
  );

  const { isLoading, isError, error } = useQuery({
    queryKey: [`getSchoolsNearby-${state.postcode}-request`],
    enabled: hasState,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolsNearbyQuery>>({
        query: getSchoolsNearby,
        variables: {
          postcode: state.postcode,
          distance: 5000,
          type: 'request',
        },
      });

      return data;
    },
  });

  if (isLoading || !hasState) {
    return <Spinner />;
  }

  if (isError) {
    navigate(Paths.FIND_YOUR_COMMUNITY, { state: { error } });
  }

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <Card className={styles.subContainer}>
        <h1>Your local area in {state.postcode.toUpperCase()}</h1>
        <div className={styles.tileRow}>
          <Tile
            title="Find a nearby school"
            onClick={() => navigate(Paths.LOCAL_SCHOOLS, { state: { postcode: state.postcode } })}
            body={['See products schools can provide to you or what donations they need']}
            icon={<img src={schoolIcon} alt="School" />}
            size="small"
          />
          <Tile
            title="Find nearby charities"
            onClick={() => navigate(Paths.LOCAL_CHARITIES, { state: { postcode: state.postcode } })}
            body={['Find out what they stock, or donate products']}
            icon={<img src={heartIcon} alt="Charity" />}
            size="small"
          />
          <Tile
            title="Donate products"
            onClick={() => navigate(Paths.LOCAL_DONATE, { state: { postcode: state.postcode } })}
            body={['Support schools and charities in your area']}
            icon={<img src={donateIcon} alt="Donate" />}
            size="small"
          />
        </div>
        <div className={styles.imageContainer}>
          <img src={kidsRunning} alt="Kids running image" />
        </div>
      </Card>
    </div>
  );
};

export default YourLocalArea;
