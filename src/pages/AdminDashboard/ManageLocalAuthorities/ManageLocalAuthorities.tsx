import { useState, useRef, FC, Key } from 'react';
import { InputRef, Popover, Table } from 'antd';
import { FilterFilled } from '@ant-design/icons';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import BackButton from '@/components/BackButton/BackButton';
import Spinner from '@/components/Spinner/Spinner';
import minusIcon from '@/assets/icons/minusIcon.svg';
import tickIcon from '@/assets/icons/tickIcon.svg';
import { GetLocalAuthoritiesQuery, LocalAuthority } from '@/types/api';
import dashboardStyles from '../AdminDashboard.module.scss';
import styles from './ManageLocalAuthorities.module.scss';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Card from '@/components/Card/Card';
import getColumnSearch from '@/utils/tableUtils';
import Crown from '@/assets/icons/Crown';
import Paths from '@/config/paths';
import { getLocalAuthorities } from '@/graphql/queries';
import { School, Charity } from '@/types/api';

const ManageLocalAuthorities: FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const dashboardLink = Paths.LOCAL_AUTHORITY_DASHBOARD;

  const columnSearchProps = {
    dataIndex: 'name' as keyof LocalAuthority,
    searchText,
    setSearchText,
    searchedColumn,
    setSearchedColumn,
    searchInput,
    filterClassName: styles.filterIcon,
    dashboardLink,
    buttonClassName: styles.nameBtn,
  };

  const fetchLocalAuthorities = async (): Promise<GetLocalAuthoritiesQuery> => {
    const { data } = await client.graphql<GraphQLQuery<GetLocalAuthoritiesQuery>>({
      query: getLocalAuthorities,
    });
    return data;
  };

  const {
    data: schoolsData,
    isLoading: schoolsLoading,
    isError: schoolsError,
  } = useQuery({
    queryKey: ['schools'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<{ getSchools: School[] }>>({
        query: `query GetSchools {
          getSchools {
            name
            localAuthority
            registered
          }
        }`,
      });
      return data;
    },
  });

  const {
    data: charitiesData,
    isLoading: charitiesLoading,
    isError: charitiesError,
  } = useQuery({
    queryKey: ['charities'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<{ getCharities: Charity[] }>>({
        query: `query GetCharities {
          getCharities {
            name
            localAuthority
          }
        }`,
      });
      return data;
    },
  });

  const {
    data: localAuthoritiesData,
    isLoading: laLoading,
    isError: laError,
  } = useQuery({
    queryKey: ['las'],
    queryFn: fetchLocalAuthorities,
  });

  const schools = schoolsData?.getSchools ?? [];
  const charities = charitiesData?.getCharities ?? [];

  const filterSchoolsByLocalAuthority = (
    localAuthority: string
  ): { urn: string; name: string; localAuthority: string; registered: boolean }[] => {
    return schools.filter(
      (school) => school.localAuthority === localAuthority && school.registered === true
    );
  };

  const filterCharitiesByLocalAuthority = (
    localAuthority: string
  ): { id: string; localAuthority: string; name: string }[] => {
    return charities.filter((charity) => charity.localAuthority === localAuthority);
  };

  const isLoading = laLoading || schoolsLoading || charitiesLoading;
  const isError = laError || schoolsError || charitiesError;

  const { registered, notRegistered } =
    localAuthoritiesData?.getLocalAuthorities?.reduce(
      (acc, { registered }) => {
        registered ? acc.registered++ : acc.notRegistered++;
        return acc;
      },
      {
        registered: 0,
        notRegistered: 0,
      }
    ) ?? {};

  const columns = [
    {
      title: 'Local authority',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearch(columnSearchProps),
    },
    {
      title: 'Status',
      dataIndex: 'registered',
      filters: [
        {
          text: 'Joined',
          value: true,
        },
        {
          text: 'Not Joined',
          value: false,
        },
      ],
      onFilter: (value: boolean | Key, { registered }: LocalAuthority): boolean =>
        registered === value,
      filterIcon: (): JSX.Element => <FilterFilled className={styles.filterIcon} />,
      render: (registered: boolean): JSX.Element =>
        registered ? (
          <Popover
            content={'Joined'}
            trigger="hover"
            className={`${styles.status} ${styles.joined}`}
          >
            <span>
              <img src={tickIcon} alt="Joined" />
            </span>
          </Popover>
        ) : (
          <Popover content={'Not joined'} trigger="hover" className={styles.status}>
            <span>
              <img src={minusIcon} alt="Not joined" />
            </span>
          </Popover>
        ),
    },
    {
      title: 'Schools',
      align: 'center' as const,
      render: (la: LocalAuthority): JSX.Element | null => {
        const filteredSchools = schools.length ? filterSchoolsByLocalAuthority(la.name) : [];
        return la.registered ? (
          <div className={styles.actionsContainer}>{filteredSchools.length}</div>
        ) : null;
      },
    },
    {
      title: 'Charities',
      align: 'center' as const,
      render: (la: LocalAuthority): JSX.Element | null => {
        const filteredCharities = charities.length ? filterCharitiesByLocalAuthority(la.name) : [];
        return la.registered ? (
          <div className={styles.actionsContainer}>{filteredCharities.length}</div>
        ) : null;
      },
    },
  ];

  if (isError) {
    return <ErrorBanner />;
  }

  return (
    <div className={dashboardStyles.subContainer}>
      <BackButton theme="blue" />
      <div className={dashboardStyles.adminCard}>
        <div className={dashboardStyles.header}>
          <h1>Manage local authorities</h1>
        </div>
        <div className={dashboardStyles.subBody}>
          {isLoading && <Spinner />}
          {!isLoading && (
            <div className={styles.cardContainer}>
              <Card className={styles.lasCard}>
                <Crown />
                <h2>View, add and edit your local authorities</h2>
                <div className={styles.numberJoinedArea}>
                  <h4>
                    <span className={styles.amount}>{registered}</span>{' '}
                    {notRegistered && `out of ${notRegistered}`}
                  </h4>
                  <div className={styles.subBody}>
                    local authorities have joined Donate to Educate.
                  </div>
                </div>
                <br />
                <Table
                  className={styles.lasTable}
                  dataSource={localAuthoritiesData?.getLocalAuthorities}
                  columns={columns}
                  scroll={{ x: 'max-content' }}
                  rowKey="code"
                />
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageLocalAuthorities;
