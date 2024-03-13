import { FC, useState } from 'react';
import styles from './FindSchool.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { Link, useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Spinner from '@/components/Spinner/Spinner';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetSchoolsNearbyQuery, School } from '@/types/api';
import { convertMetersToMiles, convertMilesToMeters } from '@/utils/distance';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import Button from '@/components/Button/Button';

const maxDistance = convertMilesToMeters(10);

const FindSchool: FC = () => {
  const [showDescription, toggleDescription] = useState(false);
  const { state, hasState } = useLocationStateOrRedirect<{ postcode: string }>(
    Paths.FIND_YOUR_COMMUNITY
  );
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [`getSchoolsNearby-${state.postcode}-${maxDistance}`],
    enabled: hasState,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolsNearbyQuery>>({
        query: `query GetSchoolsNearby($postcode: String!, $distance: Float!) {
          getSchoolsNearby(postcode: $postcode, distance: $distance) {
            name
            distance
            urn
          }
        }
        `,
        variables: {
          postcode: state.postcode,
          distance: maxDistance,
        },
      });

      return data;
    },
  });

  if (isLoading || !hasState) {
    return <Spinner />;
  }

  const columns: ColumnsType<School> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, { urn, name }: School) => (
        <Button
          theme="link-blue"
          text={text}
          ariaLabel={`name-${text}`}
          onClick={() => navigate(Paths.SCHOOLS_DASHBOARD, { state: { urn, name } })}
        />
      ),
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      render: (text: string) => `${convertMetersToMiles(text)} miles`,
    },
  ];

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={styles.subContainer}>
        <h2>Find your child&apos;s school near {state.postcode.toUpperCase()}</h2>

        <Table
          dataSource={data?.getSchoolsNearby ?? []}
          columns={columns}
          scroll={{ x: 'max-content' }}
        />

        <span
          className={styles.expander}
          onClick={() => toggleDescription((previous) => !previous)}
        >
          I cannot find my child&apos;s school
        </span>
        {showDescription && (
          <div className={styles.missingSchoolDescription}>
            If your child&apos;s school is not on the list they have not joined Donate to Educate
            yet. Find nearby charities who may have the products you need.{' '}
            <Link to={Paths.LOCAL_CHARITIES} state={{ postcode: state.postcode }}>
              Find nearby charities.
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindSchool;
