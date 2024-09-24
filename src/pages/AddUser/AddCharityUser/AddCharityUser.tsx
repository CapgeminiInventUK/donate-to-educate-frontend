import { FC, useEffect, useState } from 'react';
import styles from './AddCharityUser.module.scss';
import { InstitutionType, UserDetails } from '@/types/data';
import BackButton from '@/components/BackButton/BackButton';
import AddUserForm from '@/components/AddUserForm/AddUserForm';
import useLocationStateOrRedirect from '@/hooks/useLocationStateOrRedirect';
import Paths from '@/config/paths';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { AddAdditionalUserMutation } from '@/types/api';
import { addAdditionalUser } from '@/graphql/mutations';
import { FormState } from '@/types/data';
import { useQuery } from '@tanstack/react-query';
import { getNameFromUserObject } from '@/utils/account';
import { checkIfInTestEnvForAuthMode } from '@/utils/globals';
import useAuthToken from '@/hooks/useAuthToken';
import { useStore } from '@/stores/useStore';

const AddCharityUser: FC = () => {
  const { user } = useStore((state) => state);

  const [formState, setFormState] = useState<FormState>({
    firstName: '',
    lastName: '',
    jobTitle: '',
    department: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [name, setName] = useState('');

  useEffect(() => {
    setName(getNameFromUserObject(formState as UserDetails));
  }, [formState]);

  const { token: authToken } = useAuthToken();

  const {
    state: { type, id, localAuthority, name: charityName },
  } = useLocationStateOrRedirect<{
    type: InstitutionType;
    name: string;
    id: string;
    localAuthority: string;
  }>(Paths.ADMIN_DASHBOARD_MANAGE_CHARITY);

  const { refetch, isError } = useQuery({
    queryKey: [`add-${type}-${charityName}-${name}`],
    enabled: false,
    queryFn: async () =>
      await client.graphql<GraphQLQuery<AddAdditionalUserMutation>>({
        authMode: checkIfInTestEnvForAuthMode(),
        authToken,
        query: addAdditionalUser,
        variables: {
          type,
          id,
          localAuthority,
          charityName,
          name,
          addedBy: user?.type,
          ...formState,
        },
      }),
  });

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <AddUserForm
        name={charityName}
        formState={formState}
        setFormState={setFormState}
        refetch={refetch}
        isError={isError}
        type="charity"
      />
    </div>
  );
};

export default AddCharityUser;
