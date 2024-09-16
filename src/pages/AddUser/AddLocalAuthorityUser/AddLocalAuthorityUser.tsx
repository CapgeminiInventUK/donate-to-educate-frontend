import { FC, useState } from 'react';
import styles from './AddLocalAuthorityUser.module.scss';
import { InstitutionType } from '@/types/data';
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

const AddLocalAuthorityUser: FC = () => {
  const [formState, setFormState] = useState<FormState>({
    firstName: '',
    lastName: '',
    jobTitle: '',
    department: '',
    email: '',
    phone: '',
    notes: '',
  });

  const { state } = useLocationStateOrRedirect<{ type: InstitutionType; name: string }>(
    Paths.ADMIN_DASHBOARD_LA_VIEW_USERS
  );

  const { refetch, isError } = useQuery({
    queryKey: [`add-${state.type}-${state.name}-${JSON.stringify(formState)}`],
    enabled: false,
    queryFn: async () =>
      await client.graphql<GraphQLQuery<AddAdditionalUserMutation>>({
        query: addAdditionalUser,
        variables: {},
      }),
  });

  return (
    <div className={styles.container}>
      <BackButton theme="blue" />
      <AddUserForm
        name={state.name}
        formState={formState}
        setFormState={setFormState}
        refetch={refetch}
        isError={isError}
      />
    </div>
  );
};

export default AddLocalAuthorityUser;
