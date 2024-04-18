import { FC, Fragment, useState } from 'react';
import styles from './FindSchool.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { Link, useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { Table, Popover } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Spinner from '@/components/Spinner/Spinner';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import { GraphQLQuery } from 'aws-amplify/api';
import { GetSchoolsNearbyWithProfileQuery, InstituteSearchResult } from '@/types/api';
import { convertMetersToMiles, convertMilesToMeters } from '@/utils/distance';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import Button from '@/components/Button/Button';
import { getSchoolsNearbyWithProfile } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Chevron from '@/assets/yourLocalArea/Chevron';
import minusIcon from '@/assets/icons/minusIcon.svg';
import tickIcon from '@/assets/icons/tickIcon.svg';
import ProductTypeIcon from '@/components/ProductTypeIcon/ProductTypeIcon';

const maxDistance = convertMilesToMeters(10);

const FindSchool: FC = () => {
  const [showDescription, toggleDescription] = useState(false);
  const { state, hasState } = useLocationStateOrRedirect<{ postcode: string }>(
    Paths.FIND_YOUR_COMMUNITY
  );
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`getSchoolsNearby-${state.postcode}-${maxDistance}-request`],
    enabled: hasState,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolsNearbyWithProfileQuery>>({
        query: getSchoolsNearbyWithProfile,
        variables: {
          postcode: state.postcode,
          distance: maxDistance,
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
    return <ErrorBanner />;
  }

  const columns: ColumnsType<InstituteSearchResult> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, { name, id, registered }: InstituteSearchResult) =>
        registered ? (
          <Button
            key={id}
            className={styles.nameBtn}
            theme="link-blue"
            text={text}
            ariaLabel={`name-${text}`}
            onClick={() => navigate(Paths.SCHOOLS_DASHBOARD, { state: { urn: id, name } })}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Status',
      dataIndex: 'registered',
      render: (registered: boolean, { id }) => (
        <div key={id} className={styles.statusDiv}>
          <Popover
            content={registered ? 'Registered' : 'Not yet registered'}
            trigger="hover"
            className={`${styles.status} ${registered ? styles.joined : ''}`}
          >
            <span>
              {registered ? (
                <img src={tickIcon} alt="mySvgImage" />
              ) : (
                <img src={minusIcon} alt="mySvgImage" />
              )}
            </span>
          </Popover>
        </div>
      ),
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      render: (text: string) => `${convertMetersToMiles(text)} miles`,
    },
    {
      title: 'Product types available',
      dataIndex: 'productTypes',
      render: (text: number[], { registered, id }: InstituteSearchResult): JSX.Element[] => {
        if (!registered) {
          return [<Fragment key={id}>N/A</Fragment>];
        }
        return text.map((productType) => (
          <ProductTypeIcon key={productType} productType={productType} />
        ));
      },
    },
  ];

  const schoolData = (data?.getSchoolsNearbyWithProfile ?? []).map((school, index) => ({
    ...school,
    key: index,
  }));

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={styles.subContainer}>
        <h2>Find your child&apos;s school near {state.postcode.toUpperCase()}</h2>

        <Table
          dataSource={schoolData}
          columns={columns}
          scroll={{ x: 'max-content' }}
          rowKey="id"
        />

        <span
          className={styles.expander}
          onClick={() => toggleDescription((previous) => !previous)}
        >
          <Chevron direction={showDescription ? 'down' : 'up'} />
          My child&apos;s school has not joined.
        </span>
        {showDescription && (
          <div className={styles.missingSchoolDescription}>
            If your child&apos;s school has not joined Donate to Educate,{' '}
            <Link to={Paths.LOCAL_CHARITIES} state={{ postcode: state.postcode }}>
              find nearby charities who may have the products you need.
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindSchool;
