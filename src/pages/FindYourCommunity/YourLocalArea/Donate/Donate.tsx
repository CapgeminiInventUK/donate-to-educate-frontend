import { FC, Fragment } from 'react';
import styles from './Donate.module.scss';
import BackButton from '@/components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import Paths from '@/config/paths';
import { Table, Popover } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { convertMetersToMiles, convertMilesToMeters } from '@/utils/distance';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import {
  GetCharitiesNearbyWithProfileQuery,
  GetSchoolsNearbyWithProfileQuery,
  InstituteSearchResult,
} from '@/types/api';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/Spinner/Spinner';
import Button from '@/components/Button/Button';
import { getCharitiesNearbyWithProfile, getSchoolsNearbyWithProfile } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import minusIcon from '@/assets/icons/minusIcon.svg';
import tickIcon from '@/assets/icons/tickIcon.svg';
import ProductTypeIcon from '@/components/ProductTypeIcon/ProductTypeIcon';
import Card from '@/components/Card/Card';
import NoLocalOrganisations from '@/components/NoLocalOrganisations/NoLocalOrganisations';
import { convertNumberToCategory } from '@/components/ItemList/getFullItemList';

const maxDistance = convertMilesToMeters(10);

const Donate: FC = () => {
  const { state, hasState } = useLocationStateOrRedirect<{ postcode: string }>(
    Paths.FIND_YOUR_COMMUNITY
  );
  const navigate = useNavigate();

  const {
    data: charityData,
    isLoading: charityLoading,
    isError: isErrorCharity,
  } = useQuery({
    queryKey: [`getCharitiesNearby-${state.postcode}-${maxDistance}-donate`],
    enabled: hasState,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetCharitiesNearbyWithProfileQuery>>({
        query: getCharitiesNearbyWithProfile,
        variables: {
          postcode: state.postcode,
          distance: maxDistance,
          type: 'donate',
        },
      });

      return data;
    },
  });

  const {
    data: schoolData,
    isLoading: schoolLoading,
    isError: isErrorSchool,
  } = useQuery({
    queryKey: [`getSchoolsNearby-${state.postcode}-${maxDistance}-donate`],
    enabled: hasState,
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolsNearbyWithProfileQuery>>({
        query: getSchoolsNearbyWithProfile,
        variables: {
          postcode: state.postcode,
          distance: maxDistance,
          type: 'donate',
        },
      });

      return data;
    },
  });

  if (charityLoading || schoolLoading || !hasState) {
    return <Spinner />;
  }

  if (isErrorCharity || isErrorSchool) {
    return <ErrorBanner />;
  }

  const charityColumns: ColumnsType<InstituteSearchResult> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, { id, name }: InstituteSearchResult) => (
        <Button
          key={id}
          className={styles.nameBtn}
          theme="link-blue-bold"
          text={text}
          ariaLabel={`name-${text}`}
          onClick={() => navigate(Paths.CHARITY_DASHBOARD, { state: { id, name } })}
        />
      ),
    },
    {
      title: 'Distance',
      dataIndex: 'distance',
      render: (text: string) => `${convertMetersToMiles(text)} miles`,
    },
    {
      title: 'Product types needed',
      dataIndex: 'productTypes',
      render: (text: number[]) =>
        text.map((productType) => <ProductTypeIcon key={productType} productType={productType} />),
    },
  ];

  const schoolColumns: ColumnsType<InstituteSearchResult> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text: string, { id, name, registered }: InstituteSearchResult) =>
        registered ? (
          <Button
            key={id}
            className={styles.nameBtn}
            theme="link-blue-bold"
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
      render: (registered: boolean) => (
        <div className={styles.statusDiv}>
          <Popover
            content={registered ? 'Registered' : 'Not yet registered'}
            trigger="hover"
            className={`${styles.status} ${registered ? styles.joined : ''}`}
          >
            <span>
              {registered ? (
                <img src={tickIcon} alt="Joined" />
              ) : (
                <img src={minusIcon} alt="Not joined" />
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
      title: 'Product types needed',
      dataIndex: 'productTypes',
      render: (text: number[], school: InstituteSearchResult, index): JSX.Element[] => {
        if (!school.registered) {
          return [<Fragment key={index}>N/A</Fragment>];
        }
        return text.map((productType, index) => (
          <ProductTypeIcon key={index} productType={productType} />
        ));
      },
      filters: Array.from(Array(5)).map((_, index) => ({
        text: convertNumberToCategory(index),
        value: index,
      })),
      onFilter: (value, record): boolean => record.productTypes.includes(Number(value)),
    },
  ];

  const schoolRows = (schoolData?.getSchoolsNearbyWithProfile ?? []).map((school, key) => {
    return {
      ...school,
      key,
    };
  });

  const charityRows = (charityData?.getCharitiesNearbyWithProfile ?? []).map((charity, key) => {
    return {
      ...charity,
      key,
    };
  });

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <Card>
        <h2>Donate to schools and charities near {state.postcode.toUpperCase()}</h2>

        <h3>Schools</h3>
        <Table
          dataSource={schoolRows}
          columns={schoolColumns}
          scroll={{ x: 'max-content' }}
          rowKey="id"
        />

        <h3>Charities</h3>
        <Table
          dataSource={charityRows}
          columns={charityColumns}
          scroll={{ x: 'max-content' }}
          rowKey="id"
          locale={{
            emptyText: <NoLocalOrganisations />,
          }}
        />
      </Card>
    </div>
  );
};

export default Donate;
