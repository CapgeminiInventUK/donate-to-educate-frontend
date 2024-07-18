import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import Spinner from '@/components/Spinner/Spinner';
import { getSchoolJoinRequestsByLa } from '@/graphql/queries';
import { client } from '@/graphqlClient';
import type { GetSchoolJoinRequestsByLaQuery } from '@/types/api';
import type { SchoolsTablesProps } from '@/types/props';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';
import { useQuery } from '@tanstack/react-query';
import type { GraphQLQuery } from 'aws-amplify/api';
import type { FC } from 'react';
import SchoolsTable from './SchoolsTable';

const PendingSchools: FC<SchoolsTablesProps> = ({
  localAuthority,
  setSchoolsNumber,
  setStage,
  setSchoolProperties,
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: [`school-pending-${localAuthority}`],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetSchoolJoinRequestsByLaQuery>>({
        query: getSchoolJoinRequestsByLa,
        variables: {
          localAuthority,
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

  setSchoolsNumber(data?.getSchoolJoinRequestsByLa?.length ?? 0);

  const pendingSchoolsData = data?.getSchoolJoinRequestsByLa.map(
    ({ school, email, jobTitle, name, phone, id, urn }) => {
      return {
        name: checkForStringAndReturnEmptyIfFalsy(school),
        status: 'Pending',
        key: school,
        joinRequestName: name,
        jobTitle,
        email,
        phone,
        id,
        urn: checkForStringAndReturnEmptyIfFalsy(urn),
      };
    }
  );

  return (
    <SchoolsTable
      data={pendingSchoolsData ?? []}
      setStage={setStage}
      setProperties={setSchoolProperties}
    />
  );
};
export default PendingSchools;
