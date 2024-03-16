import { GetRegisteredSchoolsByLaQuery } from '@/types/api';
import { FC } from 'react';
import { GraphQLQuery } from 'aws-amplify/api';
import { client } from '@/graphqlClient';
import { useQuery } from '@tanstack/react-query';
import { getRegisteredSchoolsByLa } from '@/graphql/queries';
import Spinner from '@/components/Spinner/Spinner';
import SchoolsTable from './SchoolsTable';

interface RegisteredSchoolsProps {
  localAuthority: string;
}

const RegisteredSchools: FC<RegisteredSchoolsProps> = ({ localAuthority }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['school-registered'],
    queryFn: async () => {
      const { data } = await client.graphql<GraphQLQuery<GetRegisteredSchoolsByLaQuery>>({
        query: getRegisteredSchoolsByLa,
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

  const registeredSchoolData = data?.getRegisteredSchoolsByLa.map(({ name, urn }) => {
    return {
      name,
      urn,
      status: 'Joined',
      key: name,
    };
  });

  return <SchoolsTable data={registeredSchoolData ?? []} />;
};
export default RegisteredSchools;