import { ManageInstitutionProps } from '@/types/props';
import { FC, useEffect, useState } from 'react';
import BackButton from '@/components/BackButton/BackButton';
import styles from './ManageInstitution.module.scss';
import { Address, AdminUserResultType, InstitutionType, UserDetails } from '@/types/data';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import {
  GetLocalAuthorityUsersQuery,
  GetCharityUsersQuery,
  GetSchoolUsersQuery,
} from '@/types/api';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import School from '@/assets/icons/School';
import Donate from '@/assets/icons/Donate';
import RegisteredUsersSection from '../RegisteredUsers/RegisteredUsersSection';
import { getGetUsersQueryFromType, getUserDetailsObjectFromQuery } from '@/utils/account';
import AddressInset from '@/components/AddressInset/AddressInset';
import InstitutionContactInset from '@/components/InstitutionContactInset/InstitutionContactInset';
import DangerZone from '../RegisteredUsers/DangerZone';
import ResultBanner from '@/components/AddUserForm/ResultBanner';
import { pluraliseString } from '@/utils/globals';

const ManageInstitution: FC<ManageInstitutionProps> = ({ type, institutionProfile, header }) => {
  const [users, setUsers] = useState<UserDetails[]>([]);
  const [showResultBanner, setShowResultBanner] = useState(false);
  const { id, name, registered } = institutionProfile;
  const icon =
    type === InstitutionType.SCHOOL ? (
      <School />
    ) : type === InstitutionType.CHARITY ? (
      <Donate />
    ) : (
      <></>
    );

  const {
    refetch,
    isLoading: usersIsLoading,
    data: usersData,
    isError: usersIsError,
  } = useQuery({
    queryKey: [`get-${type}-users-${id}`],
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

  useEffect(() => {
    void refetch();
  }, []);

  useEffect(() => {
    const newUsers = usersData
      ? Object.values(usersData).flatMap((value) =>
          (value as UserDetails[]).map((user) => getUserDetailsObjectFromQuery(user, type))
        )
      : [];
    setUsers(newUsers);
  }, [usersData]);

  if (usersIsLoading) {
    return <Spinner />;
  }

  if (usersIsError && type !== 'localAuthority') {
    return <ErrorBanner />;
  }

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      {!showResultBanner ? (
        <div className={styles.body}>
          <div>{icon}</div>
          <h1 className={styles.title}>{name}</h1>
          <InstitutionContactInset header={header} />
          {type !== 'localAuthority' && (
            <AddressInset formData={[]} addressDetails={institutionProfile as Address} />
          )}
          <RegisteredUsersSection
            institutionProfile={institutionProfile}
            userData={users}
            type={type}
            registered={registered}
          />
          {users?.length > 0 && (
            <DangerZone
              userData={users}
              type={type}
              institutionId={id}
              institutionName={name}
              getUsersRefetch={refetch}
              usersIsLoading={usersIsLoading}
              setShowResultBanner={setShowResultBanner}
            />
          )}
        </div>
      ) : (
        <ResultBanner
          type={AdminUserResultType.PROFILE_DELETED}
          name={name}
          linkText={`Return to ${pluraliseString(type)}`}
          logo="back"
        />
      )}
    </div>
  );
};
export default ManageInstitution;
