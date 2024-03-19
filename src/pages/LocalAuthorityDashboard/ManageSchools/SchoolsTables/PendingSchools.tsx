import { GetSchoolJoinRequestsByLaQuery } from '@/types/api';
import { FC } from 'react';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import { getSchoolJoinRequestsByLa } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import SchoolsTable from './SchoolsTable';

interface PendingSchoolsProps {
  localAuthority: string;
}

const PendingSchools: FC<PendingSchoolsProps> = ({ localAuthority }) => {
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

  const pendingSchoolsData = data?.getSchoolJoinRequestsByLa.map(({ school }) => {
    return {
      name: school ?? '',
      status: 'Pending',
      key: school,
    };
  });

  return <SchoolsTable data={pendingSchoolsData ?? []} />;
};
export default PendingSchools;
