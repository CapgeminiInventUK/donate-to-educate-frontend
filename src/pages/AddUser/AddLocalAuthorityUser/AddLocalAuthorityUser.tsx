import { FC, useEffect, useState } from 'react';
import styles from '../AddUser.module.scss';
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
import useAuthToken from '@/hooks/useAuthToken';
import { checkIfInTestEnvForAuthMode } from '@/utils/globals';
import { useStore } from '@/stores/useStore';

const AddLocalAuthorityUser: FC = () => {
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
  const { token: authToken } = useAuthToken();

  useEffect(() => {
    setName(getNameFromUserObject(formState as UserDetails));
  }, [formState]);

  const {
    state: { type, id, localAuthority },
  } = useLocationStateOrRedirect<{
    type: InstitutionType;
    name: string;
    id: string;
    localAuthority: string;
  }>(Paths.ADMIN_DASHBOARD_LA_VIEW_USERS);

  const { refetch, isError } = useQuery({
    queryKey: [`add-${type}-${localAuthority}-${name}`],
    enabled: false,
    queryFn: async () =>
      await client.graphql<GraphQLQuery<AddAdditionalUserMutation>>({
        authToken,
        authMode: checkIfInTestEnvForAuthMode(),
        query: addAdditionalUser,
        variables: { type, id, localAuthority, name, addedBy: user?.type, ...formState },
      }),
  });

  return (
    <div className={styles.container}>
      <div className={styles.backButton}>
        <BackButton theme="blue" />
      </div>
      <div className={styles.form}>
        <AddUserForm
          name={localAuthority}
          formState={formState}
          setFormState={setFormState}
          refetch={refetch}
          isError={isError}
          type="localAuthority"
        />
      </div>
    </div>
  );
};

export default AddLocalAuthorityUser;
