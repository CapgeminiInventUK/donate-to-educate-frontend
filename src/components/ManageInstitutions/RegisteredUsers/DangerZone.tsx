/* eslint-disable no-console */
import { FC } from 'react';
import styles from './RegisteredUsersSection.module.scss';
import Caution from '@/assets/icons/Caution';
import InfoTable from '@/components/InfoTable/InfoTable';
import { checkIfInTestEnvForAuthMode, replaceSpacesWithHyphens } from '@/utils/globals';
import useAuthToken from '@/hooks/useAuthToken';
import { useQuery } from '@tanstack/react-query';
import { client } from '@/graphqlClient';
import { GraphQLQuery } from 'aws-amplify/api';
import { deleteUserProfile } from '@/graphql/mutations';
import {
  DeleteCharityProfileMutation,
  DeleteSchoolProfileMutation,
  DeleteUserProfileMutation,
} from '@/types/api';
import { getDeleteProfileQueryFromType, getDeleteTableData, removeUser } from '@/utils/account';
import { AdminManageInstitutionDangerZoneProps } from '@/types/props';

const DangerZone: FC<AdminManageInstitutionDangerZoneProps> = ({ type, userData }) => {
  const { institutionName, id, email, name } = userData[0];

  const deleteTableData = getDeleteTableData(type, institutionName, email);

  const { token: authToken } = useAuthToken();
  const { refetch: deleteUserRefetch } = useQuery({
    queryKey: [`delete-user-${type}-${replaceSpacesWithHyphens(name)}`],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<DeleteUserProfileMutation>>({
        authMode: checkIfInTestEnvForAuthMode(),
        authToken,
        query: deleteUserProfile,
        variables: {
          userType: type,
          name: institutionName,
          id,
          email,
        },
      });
      return result;
    },
  });

  const { refetch: removeProfile } = useQuery({
    queryKey: ['removeSchool'],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<
        GraphQLQuery<DeleteSchoolProfileMutation | DeleteCharityProfileMutation>
      >({
        query: getDeleteProfileQueryFromType(type),
        variables: {
          name: institutionName,
          id,
        },
      });
      return result;
    },
  });

  // TODO - Popup for type === 'localAuthority' scenario and for confirm delete in all scenarios
  // TODO - Log user out and redirect after deleting user/profile
  const onDelete = async (key: string): Promise<void> => {
    if (key === 'Your account') {
      //popup here first and then ->
      console.log(deleteUserRefetch);
      console.log(removeUser);
      return;
    }
    if (type === 'localAuthority') {
      //popup instead of this alert
      alert('cannae do this rn');
      return;
    }
    if (userData.length < 2) {
      //confirm delete popup for deleting school/charity profile, then ->
      console.log(deleteUserRefetch);
      console.log(removeUser);
      await removeProfile();
    }
    if (userData.length > 1) {
      // TODO - Popup for if more than 1 user and attempt to delete profile
    }
  };

  return (
    <div className={styles.deleteSection}>
      <h2>Delete</h2>
      <InfoTable
        originalTableValues={deleteTableData}
        editableKeys={[]}
        isDelete={true}
        onDelete={onDelete}
        title="Danger zone"
        icon={<Caution />}
        className={styles.deleteTable}
        rowClassName={styles.deleteTableRow}
      />
    </div>
  );
};

export default DangerZone;
