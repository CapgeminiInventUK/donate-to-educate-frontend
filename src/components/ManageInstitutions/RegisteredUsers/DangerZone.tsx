import { FC, useState } from 'react';
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
  getDeleteAccountModalText,
  getDeleteProfileQueryFromType,
  getDeleteTableDataMultipleUsers,
  getNameFromUserObject,
} from '@/utils/account';
import { AdminManageInstitutionDangerZoneProps, DeclineDeleteModalProps } from '@/types/props';
import { DeleteAccountType, InstitutionType, UserDetails } from '@/types/data';
import { useNavigate } from 'react-router-dom';
import DeclineDeleteModal from '@/components/DeclineDeleteModal/DeclineDeleteModal';
import Spinner from '@/components/Spinner/Spinner';

const DangerZone: FC<AdminManageInstitutionDangerZoneProps> = ({
  type,
  userData,
  institutionId,
  institutionName,
  getUsersRefetch,
}) => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<UserDetails>();
  const [deleteTableData, setDeleteTableData] = useState(
    getDeleteTableDataMultipleUsers(userData, type)
  );
  const [modalProps, setModalProps] = useState<DeclineDeleteModalProps>();
  const [showModal, setShowModal] = useState(false);

  const { token: authToken } = useAuthToken();
  const { refetch: deleteUserRefetch, isLoading } = useQuery({
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

  const { refetch: removeProfile, isLoading: removeProfileLoading } = useQuery({
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

  if (removeProfileLoading || isLoading) {
    return <Spinner />;
  }

  const removeRow = (user?: UserDetails): void => {
    void getUsersRefetch();
    if (!user) {
      return;
    }
    setModalProps(undefined);
    setDeleteTableData((prevValue) => {
      const newData = prevValue;
      delete newData[user.name];
      return newData;
    });
    setSelectedUser(undefined);
  };

  const onDelete = (key: string): void => {
    if (Object.values(InstitutionType).includes(key.toLowerCase() as InstitutionType)) {
      setModalProps({
        showModal,
        setShowModal,
        onConfirm: () => void removeProfile().then(() => navigate(-1)),
        ...getDeleteAccountModalText(
          type,
          DeleteAccountType.PROFILE,
          userData.length,
          institutionName
        ),
      });
      setShowModal(true);
      return;
    }
    const user = userData.find((user) => key === getNameFromUserObject(user));
    setSelectedUser(user);
    setModalProps({
      ...getDeleteAccountModalText(
        type,
        DeleteAccountType.ADMIN_USER,
        userData.length,
        institutionName
      ),
      showModal,
      setShowModal,
      onConfirm: () => {
        userData.length === 1 && type !== 'localAuthority' && void removeProfile();
        void deleteUserRefetch().then(() => {
          userData.length === 1 ? navigate(-1) : removeRow(user);
        });
      },
    });
    setShowModal(true);
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
      {modalProps && (
        <DeclineDeleteModal {...modalProps} setShowModal={setShowModal} showModal={showModal} />
      )}
    </div>
  );
};

export default DangerZone;
