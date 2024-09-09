/* eslint-disable no-console */
import { FC, useEffect, useState } from 'react';
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
import {
  getDeleteProfileQueryFromType,
  getDeleteTableDataMultipleUsers,
  getNameFromUserObject,
} from '@/utils/account';
import { AdminManageInstitutionDangerZoneProps } from '@/types/props';
import { InstitutionType, UserDetails } from '@/types/data';

const DangerZone: FC<AdminManageInstitutionDangerZoneProps> = ({
  type,
  userData,
  institutionId,
  institutionName,
}) => {
  const [selectedUser, setSelectedUser] = useState<UserDetails>();
  const [deleteTableData, setDeleteTableData] = useState(
    getDeleteTableDataMultipleUsers(userData, type)
  );

  const { token: authToken } = useAuthToken();
  const { refetch: deleteUserRefetch } = useQuery({
    queryKey: [`delete-${type}-user-${replaceSpacesWithHyphens(selectedUser?.name)}`],
    enabled: false,
    queryFn: async () => {
      const result = await client.graphql<GraphQLQuery<DeleteUserProfileMutation>>({
        authMode: checkIfInTestEnvForAuthMode(),
        authToken,
        query: deleteUserProfile,
        variables: {
          userType: type,
          name: institutionName,
          id: institutionId,
          email: selectedUser?.email,
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
          id: institutionId,
        },
      });
      return result;
    },
  });

  useEffect(() => {
    if (!selectedUser) {
      return;
    }

    console.log(deleteUserRefetch);
    console.log(selectedUser);
    // void deleteUserRefetch().then(() => {
    setDeleteTableData((prevValue) => {
      const newData = prevValue;
      delete newData[selectedUser.name];
      return newData;
    });
    setSelectedUser(undefined);
    // });
  }, [selectedUser]);

  // TODO - Popup for type === 'localAuthority' scenario and for confirm delete in all scenarios
  // TODO - Log user out and redirect after deleting user/profile
  const onDelete = (key: string): Promise<void> => {
    if (Object.values(InstitutionType).includes(key.toLowerCase() as InstitutionType)) {
      //popup here first and then ->
      // await removeProfile();
      console.log(removeProfile);
      return new Promise(() => undefined);
    }
    if (userData.length === 1 && type !== 'localAuthority') {
      //confirm delete popup for deleting school/charity profile, then ->
      setSelectedUser(userData[0]);
      // await removeProfile();
      console.log(removeProfile);
      return new Promise(() => undefined);
    }
    // TODO - Popup for if more than 1 user and attempt to delete profile
    setSelectedUser(userData.find((user) => key === getNameFromUserObject(user)));
    return new Promise(() => undefined);
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
