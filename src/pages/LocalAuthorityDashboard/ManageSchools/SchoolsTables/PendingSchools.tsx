import { GetSchoolJoinRequestsByLaQuery } from '@/types/api';
import { FC } from 'react';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import { getSchoolJoinRequestsByLa } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import SchoolsTable from './SchoolsTable';
import { SchoolsTablesProps } from '@/types/props';
import ErrorBanner from '@/components/ErrorBanner/ErrorBanner';
import { checkForStringAndReturnEmptyIfFalsy } from '@/utils/globals';

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
        localAuthority,
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
