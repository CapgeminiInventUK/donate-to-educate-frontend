import { GetSchoolJoinRequestsByLaQuery } from '@/types/api';
import { FC } from 'react';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import { getSchoolJoinRequestsByLa } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import SchoolsTable from './SchoolsTable';
import { SchoolsTablesProps } from '@/types/props';

const PendingSchools: FC<SchoolsTablesProps> = ({
  localAuthority,
  setSchoolsNumber,
  setStage,
  setSchoolProperties,
}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['school-pending'],
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

  setSchoolsNumber(data?.getSchoolJoinRequestsByLa?.length ?? 0);

  const pendingSchoolsData = data?.getSchoolJoinRequestsByLa.map(
    ({ school, email, jobTitle, name, phone }) => {
      return {
        name: school ?? '',
        status: 'Pending',
        key: school,
        joinRequestName: name,
        jobTitle,
        email,
        phone,
      };
    }
  );

  return (
    <SchoolsTable
      data={pendingSchoolsData ?? []}
      setStage={setStage}
      setSchoolProperties={setSchoolProperties}
    />
  );
};
export default PendingSchools;
