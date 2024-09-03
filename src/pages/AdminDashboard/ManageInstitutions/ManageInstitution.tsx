import { ManageInstitutionProps } from '@/types/props';
import { FC } from 'react';
import BackButton from '@/components/BackButton/BackButton';
import styles from './ManageInstitution.module.scss';
import { Address, InstitutionType, UserDetails } from '@/types/data';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import {
  GetSchoolProfileQuery,
  GetCharityProfileQuery,
  GetLocalAuthorityUsersQuery,
  GetCharityUsersQuery,
  GetSchoolUsersQuery,
  CharityProfile,
  SchoolProfile,
} from '@/types/api';
import { getSchoolProfile, getCharityProfile } from '@/graphql/queries';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import School from '@/assets/icons/School';
import Donate from '@/assets/icons/Donate';
import RegisteredUsersSection from './RegisteredUsersSection';
import DangerZone from '@/pages/Settings/DangerZone';
import { getGetUsersQueryFromType, getUserDetailsObjectFromQuery } from '@/utils/account';
import AddressInset from '@/components/AddressInset/AddressInset';
import { getDataValuesFromQueryObject } from '@/utils/api';
import InstitutionContactInset from '@/components/InstitutionContactInset/InstitutionContactInset';

const ManageInstitution: FC<ManageInstitutionProps> = ({ type, institutionProfile }) => {
  const { id, name } = institutionProfile;
  const content = {
    [InstitutionType.SCHOOL]: {
      icon: <School />,
      text: type,
    },
    [InstitutionType.CHARITY]: {
      icon: <Donate />,
      text: type,
    },
  };

  const {
    isLoading: usersIsLoading,
    data: usersData,
    isError: usersIsError,
  } = useQuery({
    queryKey: [`get-${type}-user-${id}`],
    queryFn: async () => {
      const { data } = await client.graphql<
        GraphQLQuery<GetLocalAuthorityUsersQuery | GetCharityUsersQuery | GetSchoolUsersQuery>
      >({
        query: getGetUsersQueryFromType(type),
        variables: {
          id,
        },
      });
      return data;
    },
  });

  const {
    data: profileData,
    isLoading: profileIsLoading,
    isError: profileIsError,
  } = useQuery({
    queryKey: [`get-${type}-profile=${id}`],
    queryFn: async () => {
      const { data } = await client.graphql<
        GraphQLQuery<GetSchoolProfileQuery | GetCharityProfileQuery>
      >({
        query: type === InstitutionType.SCHOOL ? getSchoolProfile : getCharityProfile,
        variables: {
          name,
          id,
        },
      });

      return data;
    },
  });

  if (profileIsLoading || usersIsLoading) {
    return <Spinner />;
  }

  if (profileIsError || usersIsError) {
    return <ErrorBanner />;
  }

  const users = usersData
    ? Object.values(usersData).flatMap((value) =>
        (value as UserDetails[]).map((user) => getUserDetailsObjectFromQuery(user, type))
      )
    : [];

  const { header } =
    getDataValuesFromQueryObject<SchoolProfile | CharityProfile>(
      profileData as GraphQLQuery<SchoolProfile | CharityProfile>
    ) ?? {};

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <div className={styles.body}>
        <div className={styles.log}>{content.school.icon}</div>
        <h1 className={styles.title}>{name}</h1>
        <InstitutionContactInset header={header} />
        <AddressInset formData={[]} addressDetails={institutionProfile as Address} />
        <RegisteredUsersSection userData={users} type={type} />
        <DangerZone userData={users[0]} type={type} numberOfUsers={users?.length ?? 0} />
      </div>
    </div>
  );
};
export default ManageInstitution;
